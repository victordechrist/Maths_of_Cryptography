import { NextResponse } from 'next/server';
import { getEvalProvider } from '@/lib/consensus/evalProviders';

// POST /api/consensus/assess — path-level outcome assessment (ORM-style).
// Advisory only: the verdict never affects gold matching or scoring. All
// provider/parse failures return 204 so the client silently skips.

export const runtime = 'nodejs';

const RATE_LIMIT = 10; // assessments per IP per hour (path-level = expensive)
const WINDOW_MS = 60 * 60 * 1000;
const MAX_STEPS = 40;
const MAX_STEP_CHARS = 2000;
const MAX_FIELD = 4000;

const hits = new Map<string, number[]>();

function clientIp(request: Request): string {
  const fwd = request.headers.get('x-forwarded-for');
  return fwd?.split(',')[0]?.trim() || 'unknown';
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function asOptionalString(value: unknown, max: number): string | null {
  if (value === undefined || value === null) return '';
  if (typeof value !== 'string') return null;
  return value.slice(0, max);
}

interface AssessStep {
  kind: string;
  content: string;
}

function parseSteps(value: unknown): AssessStep[] | null {
  if (!Array.isArray(value)) return null;
  const steps: AssessStep[] = [];
  for (const raw of value.slice(0, MAX_STEPS)) {
    if (!raw || typeof raw !== 'object') return null;
    const record = raw as Record<string, unknown>;
    const kind = asOptionalString(record.kind, 40);
    const content = asOptionalString(record.content, MAX_STEP_CHARS);
    if (kind === null || content === null || !content.trim()) return null;
    steps.push({ kind: kind || 'thought', content });
  }
  return steps;
}

const VERDICTS = new Set(['on-track', 'partial', 'off-track']);

function parseVerdict(text: string): { verdict: string; summary: string } | null {
  let cleaned = text.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '');
  }
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start === -1 || end <= start) return null;
  let data: unknown;
  try {
    data = JSON.parse(cleaned.slice(start, end + 1));
  } catch {
    return null;
  }
  if (!data || typeof data !== 'object') return null;
  const record = data as Record<string, unknown>;
  const verdict = record.verdict;
  if (typeof verdict !== 'string' || !VERDICTS.has(verdict)) return null;
  const summary =
    typeof record.summary === 'string' ? record.summary.replace(/\s+/g, ' ').trim().slice(0, 800) : '';
  return { verdict, summary };
}

function buildPrompt(input: {
  labTitle: string;
  sceneGoal: string;
  steps: AssessStep[];
}): string {
  const path = input.steps
    .map((s, i) => `${i + 1}. [${s.kind}] ${s.content}`)
    .join('\n');
  return [
    'You are assessing the OUTCOME of a student\'s reasoning path through an AI-literacy lab exercise.',
    '',
    `Lab: ${input.labTitle || 'unknown'}`,
    `Scene goal: ${input.sceneGoal || 'not specified'}`,
    '',
    'The student\'s reasoning path (their committed thoughts, in order):',
    path || '(empty)',
    '',
    'Judge whether the path as a whole is on track toward the scene goal. Be lenient: partial credit for plausible reasoning that misses the goal; off-track only when the reasoning contradicts or ignores the goal.',
    '',
    'Respond with ONLY a JSON object:',
    '{"verdict":"on-track"|"partial"|"off-track","summary":"one or two sentences for the student"}',
  ].join('\n');
}

export async function POST(request: Request) {
  const ip = clientIp(request);
  if (rateLimited(ip)) {
    return new NextResponse(null, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid-json' }, { status: 400 });
  }
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'invalid-body' }, { status: 400 });
  }
  const record = body as Record<string, unknown>;
  const labTitle = asOptionalString(record.labTitle, MAX_FIELD);
  const sceneGoal = asOptionalString(record.sceneGoal, MAX_FIELD);
  if (labTitle === null || sceneGoal === null) {
    return NextResponse.json({ error: 'invalid-body' }, { status: 400 });
  }
  const steps = parseSteps(record.steps);
  if (!steps || steps.length === 0) {
    return NextResponse.json({ error: 'invalid-body' }, { status: 400 });
  }

  const provider = getEvalProvider();
  if (!provider) return new NextResponse(null, { status: 204 });

  const text = await provider.call(buildPrompt({ labTitle: labTitle ?? '', sceneGoal: sceneGoal ?? '', steps }));
  if (!text) return new NextResponse(null, { status: 204 });

  const parsed = parseVerdict(text);
  if (!parsed) return new NextResponse(null, { status: 204 });

  return NextResponse.json({ verdict: parsed.verdict, summary: parsed.summary });
}

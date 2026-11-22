import { NextResponse } from 'next/server';
import { getEvalProvider } from '@/lib/consensus/evalProviders';

// Live process evaluator endpoint. Advisory only: the client treats every
// non-200 as "no rating" and the gold-tree score remains the official metric.
//
// Serverless caveat: the rate limiter below is in-memory, so on Vercel it is
// per-instance, not global. It damps bursts from one client; it is not a
// hard global quota — the provider's own caps are the backstop.

const RATE_LIMIT = 60; // requests per IP per hour
const RATE_WINDOW_MS = 60 * 60 * 1000;

const MAX_FIELD = 12000;

const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.resetAt <= now) {
    hits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    if (hits.size > 10000) {
      for (const [key, value] of hits) {
        if (value.resetAt <= now) hits.delete(key);
      }
    }
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || 'unknown';
}

function asOptionalString(value: unknown, max: number): string | undefined | null {
  if (value === undefined || value === null) return undefined;
  if (typeof value !== 'string') return null;
  return value.slice(0, max);
}

interface EvalBody {
  labTitle?: string;
  sceneTitle?: string;
  sceneGoal: string;
  nodeKind?: string;
  thoughtContent: string;
  parentContent?: string;
}

function parseBody(raw: unknown): EvalBody | null {
  if (!raw || typeof raw !== 'object') return null;
  const body = raw as Record<string, unknown>;
  const sceneGoal = body.sceneGoal;
  const thoughtContent = body.thoughtContent;
  if (typeof sceneGoal !== 'string' || typeof thoughtContent !== 'string') return null;
  if (!sceneGoal.trim() || !thoughtContent.trim()) return null;

  const labTitle = asOptionalString(body.labTitle, MAX_FIELD);
  const sceneTitle = asOptionalString(body.sceneTitle, MAX_FIELD);
  const nodeKind = asOptionalString(body.nodeKind, 100);
  const parentContent = asOptionalString(body.parentContent, MAX_FIELD);
  if (labTitle === null || sceneTitle === null || nodeKind === null || parentContent === null) {
    return null;
  }

  return {
    labTitle,
    sceneTitle,
    sceneGoal: sceneGoal.slice(0, MAX_FIELD),
    nodeKind,
    thoughtContent: thoughtContent.slice(0, MAX_FIELD),
    parentContent,
  };
}

function buildPrompt(body: EvalBody): string {
  return [
    'You are evaluating a single intermediate reasoning step for a student lab.',
    body.labTitle ? `Lab: ${body.labTitle}` : '',
    body.sceneTitle ? `Scene: ${body.sceneTitle}` : '',
    `Scene goal: ${body.sceneGoal}`,
    body.nodeKind ? `Thought type: ${body.nodeKind}` : '',
    body.parentContent ? `Previous step (if any): ${body.parentContent}` : '',
    `Student's new thought: ${body.thoughtContent}`,
    '',
    'Rate how promising this step is for eventually satisfying the scene goal.',
    'Reply with exactly this JSON, nothing else:',
    '{"rating":"sure"|"maybe"|"impossible","explanation":"<one or two sentences>"}',
  ]
    .filter((line) => line.length > 0)
    .join('\n');
}

const RATINGS = new Set(['sure', 'maybe', 'impossible']);

/** Extract and validate {"rating","explanation"} from raw model text. */
function parseRating(text: string): { rating: 'sure' | 'maybe' | 'impossible'; explanation: string } | null {
  const cleaned = text.replace(/```(?:json)?/gi, '').trim();
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start === -1 || end <= start) return null;
  let parsed: unknown;
  try {
    parsed = JSON.parse(cleaned.slice(start, end + 1));
  } catch {
    return null;
  }
  if (!parsed || typeof parsed !== 'object') return null;
  const record = parsed as Record<string, unknown>;
  const rating = record.rating;
  if (typeof rating !== 'string' || !RATINGS.has(rating)) return null;
  const explanationRaw = typeof record.explanation === 'string' ? record.explanation : '';
  const explanation = explanationRaw.replace(/\s+/g, ' ').trim().slice(0, 500);
  return { rating: rating as 'sure' | 'maybe' | 'impossible', explanation };
}

export async function POST(request: Request) {
  if (rateLimited(clientIp(request))) {
    return NextResponse.json({ error: 'rate-limited' }, { status: 429 });
  }

  const provider = getEvalProvider();
  if (!provider) {
    return new NextResponse(null, { status: 204 });
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid-json' }, { status: 400 });
  }
  const body = parseBody(rawBody);
  if (!body) {
    return NextResponse.json({ error: 'invalid-body' }, { status: 400 });
  }

  const text = await provider.call(buildPrompt(body));
  if (text === null) {
    return new NextResponse(null, { status: 204 });
  }
  const rating = parseRating(text);
  if (!rating) {
    return new NextResponse(null, { status: 204 });
  }
  return NextResponse.json(rating, { status: 200 });
}

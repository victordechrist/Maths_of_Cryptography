// Client wrapper for the live process evaluator API. Client-safe: no
// window/localStorage access, no provider keys — the actual LLM call happens
// server-side in src/app/api/consensus/evaluate/route.ts. Every failure mode
// resolves to null; callers treat null as "no rating" and move on.

export type ProcessRating = 'sure' | 'maybe' | 'impossible';

export interface ProcessEvalInput {
  labTitle?: string;
  sceneTitle?: string;
  sceneGoal: string;
  nodeKind?: string;
  thoughtContent: string;
  parentContent?: string;
}

export interface ProcessEvalResult {
  rating: ProcessRating;
  explanation: string;
}

const CLIENT_TIMEOUT_MS = 10000; // slightly above the server's 8s

const RATINGS = new Set<ProcessRating>(['sure', 'maybe', 'impossible']);

/** True only when the build opted into live process evaluation. */
export function isProcessEvalEnabled(): boolean {
  return process.env.NEXT_PUBLIC_MOC_PROCESS_EVAL === '1';
}

/**
 * Request a process rating for one committed thought. Returns null when the
 * feature is disabled, the server is unconfigured, rate-limited, timing out,
 * or the response is malformed — never throws.
 */
export async function evaluateThoughtProcess(
  input: ProcessEvalInput,
): Promise<ProcessEvalResult | null> {
  if (!isProcessEvalEnabled() || typeof window === 'undefined') return null;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CLIENT_TIMEOUT_MS);
  try {
    const res = await fetch('/api/consensus/evaluate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
      signal: controller.signal,
    });
    if (res.status === 204 || !res.ok) return null;
    const data: unknown = await res.json();
    if (!data || typeof data !== 'object') return null;
    const record = data as Record<string, unknown>;
    const rating = record.rating;
    if (typeof rating !== 'string' || !RATINGS.has(rating as ProcessRating)) return null;
    const explanation =
      typeof record.explanation === 'string' ? record.explanation.slice(0, 500) : '';
    return { rating: rating as ProcessRating, explanation };
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

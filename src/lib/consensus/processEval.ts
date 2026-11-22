// Client wrapper for the live process evaluator API. Client-safe: no
// window/localStorage access, no provider keys — the actual LLM call happens
// server-side in src/app/api/consensus/evaluate/route.ts. Every failure mode
// resolves to an { ok: false } outcome; callers treat it as "no rating".

export type ProcessRating = 'sure' | 'maybe' | 'impossible';

export interface ProcessEvalInput {
  labTitle?: string;
  sceneTitle?: string;
  sceneGoal: string;
  nodeKind?: string;
  thoughtContent: string;
  parentContent?: string;
}

export type ProcessEvalFailureReason =
  | 'disabled'
  | 'timeout'
  | 'rate-limited'
  | 'http'
  | 'invalid'
  | 'unavailable';

export type ProcessEvalOutcome =
  | { ok: true; rating: ProcessRating; explanation: string }
  | { ok: false; reason: ProcessEvalFailureReason };

const CLIENT_TIMEOUT_MS = 10000; // slightly above the server's 8s

const RATINGS = new Set<ProcessRating>(['sure', 'maybe', 'impossible']);

/** True only when the build opted into live process evaluation. */
export function isProcessEvalEnabled(): boolean {
  return process.env.NEXT_PUBLIC_MOC_PROCESS_EVAL === '1';
}

/**
 * Request a process rating for one committed thought. Never throws; failures
 * come back as { ok: false, reason } so callers can log and move on.
 */
export async function evaluateThoughtProcess(
  input: ProcessEvalInput,
): Promise<ProcessEvalOutcome> {
  if (!isProcessEvalEnabled() || typeof window === 'undefined') {
    return { ok: false, reason: 'disabled' };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CLIENT_TIMEOUT_MS);
  try {
    const res = await fetch('/api/consensus/evaluate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
      signal: controller.signal,
    });
    if (res.status === 204) return { ok: false, reason: 'unavailable' };
    if (res.status === 429) return { ok: false, reason: 'rate-limited' };
    if (!res.ok) return { ok: false, reason: 'http' };
    const data: unknown = await res.json();
    if (!data || typeof data !== 'object') return { ok: false, reason: 'invalid' };
    const record = data as Record<string, unknown>;
    const rating = record.rating;
    if (typeof rating !== 'string' || !RATINGS.has(rating as ProcessRating)) {
      return { ok: false, reason: 'invalid' };
    }
    const explanation =
      typeof record.explanation === 'string' ? record.explanation.slice(0, 500) : '';
    return { ok: true, rating: rating as ProcessRating, explanation };
  } catch (err) {
    const reason: ProcessEvalFailureReason =
      err instanceof DOMException && err.name === 'AbortError' ? 'timeout' : 'unavailable';
    return { ok: false, reason };
  } finally {
    clearTimeout(timer);
  }
}

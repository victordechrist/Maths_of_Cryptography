'use client';

// Path-level outcome assessment (ORM-style): one advisory verdict per lab,
// requested manually by the student. Persists the latest assessment under
// moc:v1:outcome:{labSlug} and emits tree.outcome.assessment. Never throws;
// every failure resolves to null.

import { outcomeAssessmentKey } from '@/lib/storage';
import { emitActivity } from '@/lib/activity';
import { isProcessEvalEnabled } from './processEval';
import { readStoredTree } from './treeLifecycle';
import { getLabTask } from './index';
import type { OutcomeAssessment, OutcomeVerdict } from './types';

const STORAGE_EVENT = 'moc:localstorage';
const CLIENT_TIMEOUT_MS = 10000;
const MAX_STEPS = 40;
const VERDICTS = new Set<OutcomeVerdict>(['on-track', 'partial', 'off-track']);

export interface OutcomeStep {
  kind: string;
  content: string;
}

/** Read the persisted latest assessment for a lab, if any. */
export function readOutcomeAssessment(labSlug: string): OutcomeAssessment | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(outcomeAssessmentKey(labSlug));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<OutcomeAssessment>;
    if (
      typeof parsed.verdict === 'string' &&
      VERDICTS.has(parsed.verdict as OutcomeVerdict) &&
      typeof parsed.summary === 'string' &&
      typeof parsed.assessedAt === 'string'
    ) {
      return {
        verdict: parsed.verdict as OutcomeVerdict,
        summary: parsed.summary.slice(0, 800),
        assessedAt: parsed.assessedAt,
      };
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Request an outcome assessment for the lab's current reasoning path and
 * persist it. Returns the assessment, or null when disabled/unavailable.
 */
export async function assessOutcome(labSlug: string): Promise<OutcomeAssessment | null> {
  if (typeof window === 'undefined' || !isProcessEvalEnabled()) return null;
  const task = getLabTask(labSlug);
  if (!task) return null;
  const graph = readStoredTree(labSlug);
  if (!graph || graph.nodes.length <= 1) return null; // only the root — nothing to assess

  const byId = new Map(graph.nodes.map((n) => [n.id, n]));
  const pathIds = graph.activePath.length > 0 ? graph.activePath : graph.nodes.map((n) => n.id);
  const steps: OutcomeStep[] = pathIds
    .map((id) => byId.get(id))
    .filter((n): n is NonNullable<typeof n> => Boolean(n) && n!.id !== graph.rootId)
    .slice(-MAX_STEPS)
    .map((n) => ({ kind: n.kind, content: n.content.slice(0, 2000) }));
  if (steps.length === 0) return null;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CLIENT_TIMEOUT_MS);
  try {
    const res = await fetch('/api/consensus/assess', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        labTitle: task.title,
        sceneGoal: task.scenes[0]?.goal ?? task.brief,
        steps,
      }),
      signal: controller.signal,
    });
    if (!res.ok) return null; // 204/400/429/5xx — silent skip
    const data: unknown = await res.json();
    if (!data || typeof data !== 'object') return null;
    const record = data as Record<string, unknown>;
    if (
      typeof record.verdict !== 'string' ||
      !VERDICTS.has(record.verdict as OutcomeVerdict) ||
      typeof record.summary !== 'string'
    ) {
      return null;
    }
    const assessment: OutcomeAssessment = {
      verdict: record.verdict as OutcomeVerdict,
      summary: record.summary.slice(0, 800),
      assessedAt: new Date().toISOString(),
    };
    try {
      const key = outcomeAssessmentKey(labSlug);
      window.localStorage.setItem(key, JSON.stringify(assessment));
      window.dispatchEvent(new CustomEvent<string>(STORAGE_EVENT, { detail: key }));
    } catch {
      // Persistence failure must not break the flow.
    }
    emitActivity('tree.outcome.assessment', {
      labSlug,
      data: { verdict: assessment.verdict, stepCount: steps.length },
    });
    return assessment;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

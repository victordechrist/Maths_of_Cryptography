'use client';

// Orchestrates live process ratings for committed thoughts: resolves the
// node's context, calls the evaluation API (async, never blocks commits),
// and patches the rating onto the LATEST stored graph using the same
// localStorage key + custom event every other writer uses, so all mounted
// views update live.

import { consensusTreeKey } from '@/lib/storage';
import { emitActivity } from '@/lib/activity';
import { readStoredTree } from './treeLifecycle';
import { applyProcessRating } from './tree';
import { evaluateThoughtProcess, isProcessEvalEnabled } from './processEval';
import { getLabTask } from './index';

const STORAGE_EVENT = 'moc:localstorage';

const MIN_INTERVAL_MS = 3000; // debounce per lab
const MAX_PER_LAB_SESSION = 20; // cost cap per lab per browser session
const MAX_IN_FLIGHT = 2; // concurrent rating requests per tab

const lastRequestAt = new Map<string, number>();
const sessionCounts = new Map<string, number>();
let inFlight = 0;

function persistRating(labSlug: string, nodeId: string, rating: { rating: 'sure' | 'maybe' | 'impossible'; explanation: string }): void {
  const stored = readStoredTree(labSlug);
  if (!stored) return;
  const next = applyProcessRating(stored, nodeId, rating);
  if (next === stored) return; // node gone (e.g. tree reset mid-flight)
  try {
    const key = consensusTreeKey(labSlug);
    window.localStorage.setItem(key, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent<string>(STORAGE_EVENT, { detail: key }));
  } catch {
    // Storage unavailable — the rating is simply not persisted.
  }
}

/**
 * Fire-and-forget: request a process rating for a freshly committed node and
 * patch it into the stored tree when the LLM answers. Every guard failure or
 * API failure is silent — the commit flow is never affected.
 */
export function requestProcessRating(labSlug: string, nodeId: string): void {
  if (typeof window === 'undefined' || !isProcessEvalEnabled()) return;
  if (inFlight >= MAX_IN_FLIGHT) return;

  const task = getLabTask(labSlug);
  if (!task) return;
  const graph = readStoredTree(labSlug);
  const node = graph?.nodes.find((n) => n.id === nodeId);
  if (!node || node.llmRatedAt) return; // already rated — idempotent

  const now = Date.now();
  const last = lastRequestAt.get(labSlug) ?? 0;
  if (now - last < MIN_INTERVAL_MS) return;
  const count = sessionCounts.get(labSlug) ?? 0;
  if (count >= MAX_PER_LAB_SESSION) return;
  lastRequestAt.set(labSlug, now);
  sessionCounts.set(labSlug, count + 1);
  inFlight += 1;

  const scene = task.scenes.find((s) => s.id === node.sceneId);
  const parent = node.parentId ? graph?.nodes.find((n) => n.id === node.parentId) : undefined;

  const startedAt = Date.now();
  void evaluateThoughtProcess({
    labTitle: task.title,
    sceneTitle: scene?.title,
    sceneGoal: scene?.goal ?? task.brief,
    nodeKind: node.kind,
    thoughtContent: node.content,
    parentContent: parent?.content,
  })
    .then((outcome) => {
      const latencyMs = Date.now() - startedAt;
      if (outcome.ok) {
        persistRating(labSlug, nodeId, {
          rating: outcome.rating,
          explanation: outcome.explanation,
        });
        emitActivity('tree.process.rating', {
          labSlug,
          data: {
            nodeId,
            sceneId: node.sceneId ?? null,
            source: node.source ?? 'manual',
            rating: outcome.rating,
            latencyMs,
          },
        });
      } else {
        emitActivity('tree.process.rating.failed', {
          labSlug,
          data: { nodeId, sceneId: node.sceneId ?? null, reason: outcome.reason },
        });
      }
    })
    .finally(() => {
      inFlight -= 1;
    });
}

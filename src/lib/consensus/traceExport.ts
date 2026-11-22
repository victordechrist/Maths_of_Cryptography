'use client';

// PRM-style reasoning trace export: one JSON per lab with the problem
// statement and the student's committed steps, each labeled by the strongest
// available signal — official gold match first, then the advisory LLM process
// rating, else unlabeled. Research/analysis artifact only; never affects
// scoring, gating, or grading.

import { emitActivity } from '@/lib/activity';
import type { ConsensusGraph, ConsensusNode, LabTask } from './types';

export type TraceStepLabel =
  | 'gold-match'
  | 'process-sure'
  | 'process-maybe'
  | 'process-impossible'
  | 'unlabeled';

export interface TraceStep {
  step: number;
  label: TraceStepLabel;
  kind: string;
  content: string;
  sceneId?: string;
  goldMatchId?: string;
  llmRating?: 'sure' | 'maybe' | 'impossible';
  source?: string;
}

export interface TraceExport {
  format: 'iai-prm-trace';
  version: 1;
  exportedAt: string;
  labSlug: string;
  labTitle: string;
  problem: string;
  steps: TraceStep[];
  counts: {
    goldMatch: number;
    processSure: number;
    processMaybe: number;
    processImpossible: number;
    unlabeled: number;
  };
}

function stepLabel(node: ConsensusNode): TraceStepLabel {
  if (node.goldMatchId) return 'gold-match';
  switch (node.llmRating) {
    case 'sure':
      return 'process-sure';
    case 'maybe':
      return 'process-maybe';
    case 'impossible':
      return 'process-impossible';
    default:
      return 'unlabeled';
  }
}

/** Pure builder — no storage, no download. */
export function buildTraceExport(graph: ConsensusGraph, task: LabTask): TraceExport {
  const nodes = graph.nodes.filter((n) => n.id !== graph.rootId);
  const steps: TraceStep[] = nodes.map((n, i) => ({
    step: i + 1,
    label: stepLabel(n),
    kind: n.kind,
    content: n.content,
    ...(n.sceneId ? { sceneId: n.sceneId } : {}),
    ...(n.goldMatchId ? { goldMatchId: n.goldMatchId } : {}),
    ...(n.llmRating ? { llmRating: n.llmRating } : {}),
    ...(n.source ? { source: n.source } : {}),
  }));

  const counts = { goldMatch: 0, processSure: 0, processMaybe: 0, processImpossible: 0, unlabeled: 0 };
  for (const s of steps) {
    if (s.label === 'gold-match') counts.goldMatch += 1;
    else if (s.label === 'process-sure') counts.processSure += 1;
    else if (s.label === 'process-maybe') counts.processMaybe += 1;
    else if (s.label === 'process-impossible') counts.processImpossible += 1;
    else counts.unlabeled += 1;
  }

  const problem = [
    task.title,
    '',
    task.brief,
    '',
    'Scene goals:',
    ...task.scenes.map((s) => `- ${s.title}: ${s.goal}`),
  ].join('\n');

  return {
    format: 'iai-prm-trace',
    version: 1,
    exportedAt: new Date().toISOString(),
    labSlug: task.labSlug,
    labTitle: task.title,
    problem,
    steps,
    counts,
  };
}

/** Download the trace as `iai-trace-<labSlug>-<ts>.json`. */
export function exportTraceJSON(graph: ConsensusGraph, task: LabTask): void {
  emitActivity('activity.export', { labSlug: task.labSlug, data: { format: 'trace-json' } });
  const payload = buildTraceExport(graph, task);
  const stamp = payload.exportedAt.replace(/[:.]/g, '-');
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `iai-trace-${task.labSlug}-${stamp}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// Consensus-task registry — one typed definition file per lesson lands under
// `src/lib/consensus/tasks/l<module>-<order>.ts` and is merged here, keyed by
// lesson slug (e.g. 'divisibility-euclidean-algorithm' = lesson 1.1).

import type { LabTask } from './types';

export const LAB_TASKS: Readonly<Record<string, LabTask>> = {};

/** The consensus task for a lesson, or undefined when the lesson has none. */
export function getLabTask(labSlug: string): LabTask | undefined {
  return LAB_TASKS[labSlug];
}

export { STRUCTURAL_RELATIONS } from './types';
export type { LabTask } from './types';

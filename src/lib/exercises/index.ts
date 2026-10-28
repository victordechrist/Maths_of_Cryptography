// Guided-exercise registry — one typed definition file per lesson lands under
// `src/lib/exercises/lessons/l<module>-<order>.ts` and is merged here, keyed by
// lesson slug (e.g. 'divisibility-euclidean-algorithm' = lesson 1.1).

import type { LabExercise } from './types';

export const LAB_EXERCISES: Readonly<Record<string, LabExercise>> = {};

/** The exercise for a lesson, or undefined when the lesson has none. */
export function getExercise(labSlug: string): LabExercise | undefined {
  return LAB_EXERCISES[labSlug];
}

export type { LabExercise } from './types';

// Guided-exercise registry — one typed definition file per lesson lands under
// `src/lib/exercises/lessons/l<module>-<order>.ts` and is merged here, keyed by
// lesson slug (e.g. 'divisibility-euclidean-algorithm' = lesson 1.1).

import type { LabExercise } from './types';
import { l1_1Exercise } from './lessons/l1-1';
import { l1_2Exercise } from './lessons/l1-2';

export const LAB_EXERCISES: Readonly<Record<string, LabExercise>> = {
  [l1_1Exercise.labSlug]: l1_1Exercise,
  [l1_2Exercise.labSlug]: l1_2Exercise,
};

/** The exercise for a lesson, or undefined when the lesson has none. */
export function getExercise(labSlug: string): LabExercise | undefined {
  return LAB_EXERCISES[labSlug];
}

export type { LabExercise } from './types';

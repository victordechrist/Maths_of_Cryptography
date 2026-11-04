// Guided-exercise registry — one typed definition file per lesson lands under
// `src/lib/exercises/lessons/l<module>-<order>.ts` and is merged here, keyed by
// lesson slug.

import type { LabExercise } from './types';
import { l1_1Exercise } from './lessons/l1-1';
import { l1_2Exercise } from './lessons/l1-2';
import { l1_3Exercise } from './lessons/l1-3';
import { l1_4Exercise } from './lessons/l1-4';
import { l2_1Exercise } from './lessons/l2-1';
import { l2_2Exercise } from './lessons/l2-2';
import { l2_3Exercise } from './lessons/l2-3';
import { l3_1Exercise } from './lessons/l3-1';
import { l3_2Exercise } from './lessons/l3-2';
import { l3_3Exercise } from './lessons/l3-3';
import { l3_4Exercise } from './lessons/l3-4';
import { l4_1Exercise } from './lessons/l4-1';
import { l4_2Exercise } from './lessons/l4-2';
import { l4_3Exercise } from './lessons/l4-3';
import { l5_1Exercise } from './lessons/l5-1';
import { l5_2Exercise } from './lessons/l5-2';
import { l5_3Exercise } from './lessons/l5-3';
import { l6_1Exercise } from './lessons/l6-1';
import { l6_2Exercise } from './lessons/l6-2';
import { l6_3Exercise } from './lessons/l6-3';

export const LAB_EXERCISES: Readonly<Record<string, LabExercise>> = {
  [l1_1Exercise.labSlug]: l1_1Exercise,
  [l1_2Exercise.labSlug]: l1_2Exercise,
  [l1_3Exercise.labSlug]: l1_3Exercise,
  [l1_4Exercise.labSlug]: l1_4Exercise,
  [l2_1Exercise.labSlug]: l2_1Exercise,
  [l2_2Exercise.labSlug]: l2_2Exercise,
  [l2_3Exercise.labSlug]: l2_3Exercise,
  [l3_1Exercise.labSlug]: l3_1Exercise,
  [l3_2Exercise.labSlug]: l3_2Exercise,
  [l3_3Exercise.labSlug]: l3_3Exercise,
  [l3_4Exercise.labSlug]: l3_4Exercise,
  [l4_1Exercise.labSlug]: l4_1Exercise,
  [l4_2Exercise.labSlug]: l4_2Exercise,
  [l4_3Exercise.labSlug]: l4_3Exercise,
  [l5_1Exercise.labSlug]: l5_1Exercise,
  [l5_2Exercise.labSlug]: l5_2Exercise,
  [l5_3Exercise.labSlug]: l5_3Exercise,
  [l6_1Exercise.labSlug]: l6_1Exercise,
  [l6_2Exercise.labSlug]: l6_2Exercise,
  [l6_3Exercise.labSlug]: l6_3Exercise,
};

/** The exercise for a lesson, or undefined when the lesson has none. */
export function getExercise(labSlug: string): LabExercise | undefined {
  return LAB_EXERCISES[labSlug];
}

export type { LabExercise } from './types';

// Consensus-task registry — one typed definition file per lesson lands under
// `src/lib/consensus/tasks/l<module>-<order>.ts` and is merged here, keyed by
// lesson slug.

import type { LabTask } from './types';
import { l1_1Task } from './tasks/l1-1';
import { l1_2Task } from './tasks/l1-2';
import { l1_3Task } from './tasks/l1-3';
import { l1_4Task } from './tasks/l1-4';
import { l2_1Task } from './tasks/l2-1';
import { l2_2Task } from './tasks/l2-2';
import { l2_3Task } from './tasks/l2-3';
import { l3_1Task } from './tasks/l3-1';
import { l3_2Task } from './tasks/l3-2';
import { l3_3Task } from './tasks/l3-3';
import { l3_4Task } from './tasks/l3-4';
import { l4_1Task } from './tasks/l4-1';
import { l4_2Task } from './tasks/l4-2';
import { l4_3Task } from './tasks/l4-3';
import { l5_1Task } from './tasks/l5-1';
import { l5_2Task } from './tasks/l5-2';
import { l5_3Task } from './tasks/l5-3';
import { l6_1Task } from './tasks/l6-1';
import { l6_2Task } from './tasks/l6-2';
import { l6_3Task } from './tasks/l6-3';

export const LAB_TASKS: Readonly<Record<string, LabTask>> = {
  [l1_1Task.labSlug]: l1_1Task,
  [l1_2Task.labSlug]: l1_2Task,
  [l1_3Task.labSlug]: l1_3Task,
  [l1_4Task.labSlug]: l1_4Task,
  [l2_1Task.labSlug]: l2_1Task,
  [l2_2Task.labSlug]: l2_2Task,
  [l2_3Task.labSlug]: l2_3Task,
  [l3_1Task.labSlug]: l3_1Task,
  [l3_2Task.labSlug]: l3_2Task,
  [l3_3Task.labSlug]: l3_3Task,
  [l3_4Task.labSlug]: l3_4Task,
  [l4_1Task.labSlug]: l4_1Task,
  [l4_2Task.labSlug]: l4_2Task,
  [l4_3Task.labSlug]: l4_3Task,
  [l5_1Task.labSlug]: l5_1Task,
  [l5_2Task.labSlug]: l5_2Task,
  [l5_3Task.labSlug]: l5_3Task,
  [l6_1Task.labSlug]: l6_1Task,
  [l6_2Task.labSlug]: l6_2Task,
  [l6_3Task.labSlug]: l6_3Task,
};

/** The consensus task for a lesson, or undefined when the lesson has none. */
export function getLabTask(labSlug: string): LabTask | undefined {
  return LAB_TASKS[labSlug];
}

export { STRUCTURAL_RELATIONS } from './types';
export type { LabTask, Scene, ConsensusGraph, ConsensusNode, ConsensusEdge, NodeKind, NodeStatus, EdgeRelation } from './types';

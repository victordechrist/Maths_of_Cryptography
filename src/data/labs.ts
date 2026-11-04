import { syllabusModules } from './syllabus';

/** Minimal lab-shape the shared gating/progress components consume. `week`
 * is the lesson's ordinal position in the flattened syllabus (1-based). */
export interface Lab {
  slug: string;
  title: string;
  week: number;
}

export const labs: Lab[] = syllabusModules.flatMap((m) =>
  m.lessons.map((l) => ({ slug: l.slug, title: l.title, week: 0 })),
);
labs.forEach((l, i) => { l.week = i + 1; });

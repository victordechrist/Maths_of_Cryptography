import { labs, type Lab } from '@/data/labs';

/**
 * Sequential lab gating, pure helpers only — safe to import from server
 * components. The reactive hook lives in `useLabGate.ts`.
 *
 * Lab i in the week-ordered registry is unlocked when lab i−1's exercise is
 * fully complete. Labs without an exercise never gate the next one. This is
 * an honest-client nudge — the data lives in localStorage and is not a
 * security boundary.
 */
export function visibleLabs(): Lab[] {
  return [...labs].sort((a, b) => a.week - b.week);
}

export function previousVisibleLab(labSlug: string): Lab | undefined {
  const visible = visibleLabs();
  const index = visible.findIndex((l) => l.slug === labSlug);
  return index > 0 ? visible[index - 1] : undefined;
}

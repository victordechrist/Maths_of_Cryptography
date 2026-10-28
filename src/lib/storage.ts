// Versioned localStorage namespace shared by all client-side persistence.
// Bump the version segment when a persisted shape changes incompatibly.
export const MOC_STORAGE_PREFIX = "moc:v1" as const;

/** localStorage key for one exercise step's progress record. */
export function exerciseProgressKey(labSlug: string, stepId: string): string {
  return `${MOC_STORAGE_PREFIX}:exercise:${labSlug}:${stepId}`;
}

/** localStorage key for a lab's consensus tree. */
export function consensusTreeKey(labSlug: string): string {
  return `${MOC_STORAGE_PREFIX}:tree:${labSlug}`;
}

import type { LabTask } from '../types';

// Lesson 3.4 — Hash Functions & Message Authentication.
export const l3_4Task: LabTask = {
  labSlug: 'hash-functions-mac',
  title: "Why Hashes Need Structure to Authenticate",
  brief:
    "Argue from hash properties to MACs: collision resistance has a birthday bound, Merkle\u2013Damg\u00e5rd hashes allow length extension, and HMAC's nested construction is the fix that makes a hash a secure MAC.",
  scenes: [
    {
      id: 'scene-l3-4-1',
      order: 1,
      title: "Hash properties & birthday bound",
      narration:
        "A cryptographic hash must resist preimages, second preimages, and collisions. Collisions are found generically in ~2^(n/2) work by the birthday paradox, so a 256-bit hash gives 128-bit collision security.",
      goal: "Commit the three properties and why output length must be double the target security.",
      goldNodeIds: ['s1', 'x1', 'x2'],
      elicitation: 'code-cell',
      hints: [
        "Birthday: \u221a(2^n) samples for a 50% collision chance.",
        "SHA-1 (160-bit) fell to practical collisions."
      ],
    },
    {
      id: 'scene-l3-4-2',
      order: 2,
      title: "Length extension",
      narration:
        "Merkle\u2013Damg\u00e5rd hashes output their internal state. Given H(K\u2016m), an attacker can compute H(K\u2016m\u2016pad\u2016m') without knowing K. So the naive MAC H(K\u2016m) is forgeable.",
      goal: "Commit why H(K\u2016m) fails as a MAC: the digest is resumable state.",
      goldNodeIds: ['s2', 'x3', 'x4'],
      elicitation: 'code-cell',
      hints: [
        "The digest is the chaining value \u2014 resume from it.",
        "SHA-3 (sponge) is immune; SHA-2 is not."
      ],
    },
    {
      id: 'scene-l3-4-3',
      order: 3,
      title: "HMAC fixes it",
      narration:
        "HMAC = H((K\u2295opad) \u2016 H((K\u2295ipad) \u2016 m)). The outer hash re-keys the inner digest, so extending the inner state is useless without K. Its security reduces to the compression function being a PRF.",
      goal: "Commit why nesting defeats length extension, and what HMAC's proof assumes.",
      goldNodeIds: ['s3', 'x5', 'x6'],
      elicitation: 'code-cell',
      hints: [
        "The attacker never sees the inner state as output.",
        "Proof: compression function as a PRF."
      ],
    },
  ],
  goldTree: {
    labSlug: 'hash-functions-mac',
    rootId: 'g1',
    version: 1,
    prunedNodeIds: [],
    activePath: ['g1', 's1', 's2', 's3', 'x1', 'x2', 'x3', 'x4', 'x5', 'x6'],
    nodes: [
      { id: 'g1', label: "Turn a hash into a secure MAC",
        content: "Know hash properties, see why H(K\u2016m) breaks, build HMAC.",
        kind: 'goal', status: 'confirmed', parentId: null },
      { id: 's1', label: "Properties & birthday bound",
        content: "Collision security is n/2 bits for an n-bit hash.",
        kind: 'subgoal', status: 'confirmed' },
      { id: 's2', label: "Naive MAC is extensible",
        content: "Merkle\u2013Damg\u00e5rd exposes state \u2192 H(K\u2016m) forgeable.",
        kind: 'subgoal', status: 'confirmed' },
      { id: 's3', label: "HMAC nests to fix it",
        content: "Outer keyed hash hides the inner state.",
        kind: 'subgoal', status: 'confirmed' },
      { id: 'x1', label: "Three resistance properties",
        content: "Preimage, second-preimage, collision resistance.",
        kind: 'operator', status: 'confirmed' },
      { id: 'x2', label: "2^(n/2) birthday attack",
        content: "Generic collisions \u2014 SHA-256 \u2192 128-bit security.",
        kind: 'evidence', status: 'confirmed' },
      { id: 'x3', label: "Digest = chaining state",
        content: "Attacker resumes hashing from H(K\u2016m).",
        kind: 'operator', status: 'confirmed' },
      { id: 'x4', label: "Forgery without K",
        content: "Valid tag for m\u2016pad\u2016m' computed from public data.",
        kind: 'evidence', status: 'confirmed' },
      { id: 'x5', label: "Nested construction",
        content: "Outer hash under opad re-keys the inner result.",
        kind: 'operator', status: 'confirmed' },
      { id: 'x6', label: "PRF-based proof",
        content: "HMAC is secure if the compression function is a PRF.",
        kind: 'evidence', status: 'confirmed' },
    ],
    edges: [
      { from: 'g1', to: 's1', relation: 'elaborates' },
      { from: 's1', to: 's2', relation: 'depends-on' },
      { from: 's2', to: 's3', relation: 'depends-on' },
      { from: 's1', to: 'x1', relation: 'elaborates' },
      { from: 's1', to: 'x2', relation: 'elaborates' },
      { from: 's2', to: 'x3', relation: 'elaborates' },
      { from: 's2', to: 'x4', relation: 'elaborates' },
      { from: 's3', to: 'x5', relation: 'elaborates' },
      { from: 's3', to: 'x6', relation: 'elaborates' },
    ],
  },
};

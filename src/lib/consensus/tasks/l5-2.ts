import type { LabTask } from '../types';

// Lesson 5.2 — ECDH & ECDSA Protocols.
export const l5_2Task: LabTask = {
  labSlug: 'ecdh-ecdsa-protocols',
  title: "Why ECDSA Verifies \u2014 and How It Breaks",
  brief:
    "Argue ECDSA's verification equation, the nonce's role as a one-time secret, and why validating peer points is mandatory in ECDH.",
  scenes: [
    {
      id: 'scene-l5-2-1',
      order: 1,
      title: "Verification algebra",
      narration:
        "u1G + u2Q = s\u207b\u00b9(z + r\u00b7d)G = kG, because s = k\u207b\u00b9(z + rd). So the verifier reconstructs the signer's ephemeral point using only public data and checks its x matches r.",
      goal: "Commit the substitution chain that makes verification succeed.",
      goldNodeIds: ['s1', 'x1', 'x2'],
      elicitation: 'code-cell',
      hints: [
        "Q = dG.",
        "s\u207b\u00b9 = k(z + rd)\u207b\u00b9."
      ],
    },
    {
      id: 'scene-l5-2-2',
      order: 2,
      title: "Nonce discipline",
      narration:
        "Reusing k across two messages gives two linear equations in k and d \u2014 the private key falls out. Even biased k leaks d via lattice attacks. RFC 6979 derives k deterministically from (d, z).",
      goal: "Commit why k must be unique AND unbiased, and the deterministic fix.",
      goldNodeIds: ['s2', 'x3', 'x4'],
      elicitation: 'code-cell',
      hints: [
        "s1 \u2212 s2 = k\u207b\u00b9(z1 \u2212 z2).",
        "A few biased bits per signature suffice for lattice recovery."
      ],
    },
    {
      id: 'scene-l5-2-3',
      order: 3,
      title: "Validate peer points",
      narration:
        "In ECDH, a malicious peer can send a point on a weaker curve (invalid-curve attack) or in a small subgroup; the victim's scalar mult leaks d mod small orders. Validating on_curve (and cofactor handling) closes it.",
      goal: "Commit the invalid-curve attack and the check that stops it.",
      goldNodeIds: ['s3', 'x5', 'x6'],
      elicitation: 'code-cell',
      hints: [
        "Scalar mult formulas don't use b \u2014 wrong-curve points compute fine.",
        "CRT on leaked residues rebuilds d."
      ],
    },
  ],
  goldTree: {
    labSlug: 'ecdh-ecdsa-protocols',
    rootId: 'g1',
    version: 1,
    prunedNodeIds: [],
    activePath: ['g1', 's1', 's2', 's3', 'x1', 'x2', 'x3', 'x4', 'x5', 'x6'],
    nodes: [
      { id: 'g1', label: "Explain ECDSA/ECDH correctness and pitfalls",
        content: "Verification algebra, nonce discipline, point validation.",
        kind: 'goal', status: 'confirmed', parentId: null },
      { id: 's1', label: "Verification reconstructs kG",
        content: "u1G + u2Q equals the signer's ephemeral point.",
        kind: 'subgoal', status: 'confirmed' },
      { id: 's2', label: "Nonce must be unique and unbiased",
        content: "Reuse or bias leaks the private key.",
        kind: 'subgoal', status: 'confirmed' },
      { id: 's3', label: "Peer points must be validated",
        content: "Invalid-curve points leak scalar residues.",
        kind: 'subgoal', status: 'confirmed' },
      { id: 'x1', label: "Substitute Q = dG",
        content: "u1G + u2Q = s\u207b\u00b9(z + rd)G.",
        kind: 'operator', status: 'confirmed' },
      { id: 'x2', label: "= kG",
        content: "Because s = k\u207b\u00b9(z + rd).",
        kind: 'evidence', status: 'confirmed' },
      { id: 'x3', label: "Two equations \u21d2 d",
        content: "Same k on two messages solves for d.",
        kind: 'evidence', status: 'confirmed' },
      { id: 'x4', label: "RFC 6979",
        content: "Deterministic k from (d, z) removes RNG risk.",
        kind: 'operator', status: 'confirmed' },
      { id: 'x5', label: "Invalid-curve attack",
        content: "Formulas ignore b \u2014 weak-curve points leak d mod small n.",
        kind: 'evidence', status: 'confirmed' },
      { id: 'x6', label: "on_curve check",
        content: "Reject points not satisfying the curve equation.",
        kind: 'operator', status: 'confirmed' },
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

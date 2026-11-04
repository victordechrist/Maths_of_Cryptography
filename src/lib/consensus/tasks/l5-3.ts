import type { LabTask } from '../types';

// Lesson 5.3 — Pairing-Based Cryptography & Advanced Curves.
export const l5_3Task: LabTask = {
  labSlug: 'pairing-based-cryptography',
  title: "Why Pairings Unlock New Protocols",
  brief:
    "Argue what bilinearity gives that plain EC groups can't, why it enables short aggregate signatures, and the security cost (MOV reduction) that forces careful curve choice.",
  scenes: [
    {
      id: 'scene-l5-3-1',
      order: 1,
      title: "Bilinearity",
      narration:
        "A pairing e: G1 \u00d7 G2 \u2192 GT satisfies e(aP, bQ) = e(P, Q)^(ab). It lets a verifier check a multiplicative relation between hidden scalars \u2014 something no ordinary group operation allows.",
      goal: "Commit the bilinearity property and what it lets a verifier check.",
      goldNodeIds: ['s1', 'x1', 'x2'],
      elicitation: 'code-cell',
      hints: [
        "Scalars move freely between arguments.",
        "Decision-DH becomes easy in G1 \u2014 a feature for verification."
      ],
    },
    {
      id: 'scene-l5-3-2',
      order: 2,
      title: "BLS & aggregation",
      narration:
        "BLS signatures are one group element, deterministic, and aggregate by addition: n signatures compress into one, verified with n+1 pairings. Ethereum's consensus layer relies on this to validate thousands of signatures per block.",
      goal: "Commit why BLS signatures verify and why aggregation matters at scale.",
      goldNodeIds: ['s2', 'x3', 'x4'],
      elicitation: 'code-cell',
      hints: [
        "e(\u03c3, G) = e(xH, G) = e(H, xG).",
        "Aggregate size is constant in n."
      ],
    },
    {
      id: 'scene-l5-3-3',
      order: 3,
      title: "MOV and curve choice",
      narration:
        "Pairings map the ECDLP into a finite-field DLP in GT, where index calculus applies. Pairing-friendly curves (BN, BLS12-381) set embedding degree so both sides stay hard; recent NFS advances pushed parameters upward.",
      goal: "Commit the MOV reduction and how curve parameters counter it.",
      goldNodeIds: ['s3', 'x5', 'x6'],
      elicitation: 'code-cell',
      hints: [
        "Embedding degree k: GT \u2282 GF(p^k)*.",
        "BLS12-381 targets ~128-bit security."
      ],
    },
  ],
  goldTree: {
    labSlug: 'pairing-based-cryptography',
    rootId: 'g1',
    version: 1,
    prunedNodeIds: [],
    activePath: ['g1', 's1', 's2', 's3', 'x1', 'x2', 'x3', 'x4', 'x5', 'x6'],
    nodes: [
      { id: 'g1', label: "Explain what pairings enable and cost",
        content: "Bilinearity, BLS aggregation, MOV-driven parameter choice.",
        kind: 'goal', status: 'confirmed', parentId: null },
      { id: 's1', label: "Bilinearity checks hidden products",
        content: "e(aP, bQ) = e(P, Q)^(ab).",
        kind: 'subgoal', status: 'confirmed' },
      { id: 's2', label: "BLS: short, aggregatable signatures",
        content: "One element; sums verify together.",
        kind: 'subgoal', status: 'confirmed' },
      { id: 's3', label: "MOV forces careful curves",
        content: "ECDLP maps to finite-field DLP in GT.",
        kind: 'subgoal', status: 'confirmed' },
      { id: 'x1', label: "Scalar mobility",
        content: "Scalars move between pairing arguments.",
        kind: 'operator', status: 'confirmed' },
      { id: 'x2', label: "DDH easy in G1",
        content: "Pairings decide DH tuples \u2014 powering verification.",
        kind: 'evidence', status: 'confirmed' },
      { id: 'x3', label: "e(\u03c3,G)=e(H(m),X)",
        content: "Both equal e(H(m), G)^x.",
        kind: 'operator', status: 'confirmed' },
      { id: 'x4', label: "Constant-size aggregate",
        content: "Ethereum validates many signatures as one.",
        kind: 'evidence', status: 'confirmed' },
      { id: 'x5', label: "MOV reduction",
        content: "Pairing transfers ECDLP to GF(p^k)*.",
        kind: 'evidence', status: 'confirmed' },
      { id: 'x6', label: "Embedding degree tuning",
        content: "BN/BLS12 curves balance both problems' hardness.",
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

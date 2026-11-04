import type { LabTask } from '../types';

// Lesson 6.2 — Zero-Knowledge Proofs & Interactive Proof Systems.
export const l6_2Task: LabTask = {
  labSlug: 'zero-knowledge-proofs',
  title: "What Makes a Proof Zero-Knowledge",
  brief:
    "Argue the three defining properties \u2014 completeness, soundness, zero-knowledge \u2014 why the challenge must be unpredictable, and how Fiat\u2013Shamir removes interaction.",
  scenes: [
    {
      id: 'scene-l6-2-1',
      order: 1,
      title: "Three properties",
      narration:
        "Completeness: an honest prover always convinces an honest verifier. Soundness: a cheater without the secret fails except with negligible probability. Zero-knowledge: a simulator can generate transcripts indistinguishable from real ones, proving nothing leaked.",
      goal: "Commit all three definitions and the role each plays.",
      goldNodeIds: ['s1', 'x1', 'x2'],
      elicitation: 'code-cell',
      hints: [
        "Soundness stops impersonation; ZK protects the prover.",
        "The simulator argument is what 'zero-knowledge' formally means."
      ],
    },
    {
      id: 'scene-l6-2-2',
      order: 2,
      title: "Challenge unpredictability",
      narration:
        "If the prover knew c in advance, it could pick s freely and back-solve t \u2014 the challenge MUST arrive after the commitment. Predictable challenges destroy soundness; this is also why nonce reuse in Schnorr signatures leaks x (two transcripts, same r).",
      goal: "Commit why ordering (commit \u2192 challenge \u2192 response) is load-bearing.",
      goldNodeIds: ['s2', 'x3', 'x4'],
      elicitation: 'code-cell',
      hints: [
        "s \u2212 s' = (c \u2212 c')\u00b7x \u21d2 x = (s \u2212 s')/(c \u2212 c').",
        "Unpredictability is what forces real knowledge of x."
      ],
    },
    {
      id: 'scene-l6-2-3',
      order: 3,
      title: "Fiat\u2013Shamir transform",
      narration:
        "Replace the verifier's random c with c = H(t, h, context). Since H is a random oracle, the prover can't predict it \u2014 the interaction collapses into one message: a signature. This is exactly how Schnorr signatures work.",
      goal: "Commit how hashing the transcript preserves unpredictability without a verifier.",
      goldNodeIds: ['s3', 'x5', 'x6'],
      elicitation: 'code-cell',
      hints: [
        "The hash commits the challenge to the prover's own t.",
        "Every Schnorr/EdDSA signature is a Fiat\u2013Shamir proof."
      ],
    },
  ],
  goldTree: {
    labSlug: 'zero-knowledge-proofs',
    rootId: 'g1',
    version: 1,
    prunedNodeIds: [],
    activePath: ['g1', 's1', 's2', 's3', 'x1', 'x2', 'x3', 'x4', 'x5', 'x6'],
    nodes: [
      { id: 'g1', label: "Explain ZK proof structure",
        content: "Three properties, challenge ordering, Fiat\u2013Shamir.",
        kind: 'goal', status: 'confirmed', parentId: null },
      { id: 's1', label: "Completeness, soundness, ZK",
        content: "Honest passes; cheater fails; transcript leaks nothing.",
        kind: 'subgoal', status: 'confirmed' },
      { id: 's2', label: "Challenge after commitment",
        content: "Predictable c breaks soundness; reused r leaks x.",
        kind: 'subgoal', status: 'confirmed' },
      { id: 's3', label: "Fiat\u2013Shamir removes interaction",
        content: "c = H(transcript) preserves unpredictability \u2014 yields signatures.",
        kind: 'subgoal', status: 'confirmed' },
      { id: 'x1', label: "Simulator argument",
        content: "Simulated transcripts \u2248 real ones \u21d2 nothing learned.",
        kind: 'operator', status: 'confirmed' },
      { id: 'x2', label: "Negligible cheating odds",
        content: "Random guessing fails except with 1/n probability.",
        kind: 'evidence', status: 'confirmed' },
      { id: 'x3', label: "Back-solving t",
        content: "Known c lets a cheater forge the commitment.",
        kind: 'evidence', status: 'confirmed' },
      { id: 'x4', label: "x = (s\u2212s')/(c\u2212c')",
        content: "Two transcripts on one r recover the secret.",
        kind: 'operator', status: 'confirmed' },
      { id: 'x5', label: "Random oracle",
        content: "Hashing t binds c to the commitment.",
        kind: 'operator', status: 'confirmed' },
      { id: 'x6', label: "Schnorr signatures",
        content: "Fiat\u2013Shamir turns the \u03a3-protocol into a signature scheme.",
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

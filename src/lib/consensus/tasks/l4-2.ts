import type { LabTask } from '../types';

// Lesson 4.2 — Diffie-Hellman Key Exchange & Discrete Logarithms.
export const l4_2Task: LabTask = {
  labSlug: 'diffie-hellman-discrete-log',
  title: "Why Diffie\u2013Hellman Is Secure \u2014 and When It Isn't",
  brief:
    "Argue DH's agreement, its reliance on the discrete-log/CDH assumptions, and why unauthenticated DH falls to man-in-the-middle.",
  scenes: [
    {
      id: 'scene-l4-2-1',
      order: 1,
      title: "Agreement",
      narration:
        "Alice sends g^a, Bob sends g^b. Each raises the other's share to their secret: (g^b)^a = (g^a)^b = g^(ab). Exponent commutativity is the entire protocol.",
      goal: "Commit why both parties derive the same secret without ever transmitting it.",
      goldNodeIds: ['s1', 'x1', 'x2'],
      elicitation: 'code-cell',
      hints: [
        "Exponents multiply: (g^a)^b = g^(ab).",
        "Only g^a, g^b cross the wire."
      ],
    },
    {
      id: 'scene-l4-2-2',
      order: 2,
      title: "Hardness assumptions",
      narration:
        "An eavesdropper sees g, g^a, g^b. Computing g^(ab) is the CDH problem; solving discrete log solves CDH. Generic attacks cost \u221aq for prime order q, so groups must have large prime-order subgroups.",
      goal: "Commit the assumption chain and how group order sets security.",
      goldNodeIds: ['s2', 'x3', 'x4'],
      elicitation: 'code-cell',
      hints: [
        "DLP \u21d2 CDH, not necessarily the reverse.",
        "BSGS/rho: \u221aq work."
      ],
    },
    {
      id: 'scene-l4-2-3',
      order: 3,
      title: "Man in the middle",
      narration:
        "DH proves nothing about who is on the other end. Mallory swaps in her own shares and runs two exchanges. Real protocols (TLS 1.3) sign the DH transcript with certified keys.",
      goal: "Commit the MITM attack and the authentication fix.",
      goldNodeIds: ['s3', 'x5', 'x6'],
      elicitation: 'code-cell',
      hints: [
        "Keys agree \u2014 but with the wrong party.",
        "Signatures bind shares to identities."
      ],
    },
  ],
  goldTree: {
    labSlug: 'diffie-hellman-discrete-log',
    rootId: 'g1',
    version: 1,
    prunedNodeIds: [],
    activePath: ['g1', 's1', 's2', 's3', 'x1', 'x2', 'x3', 'x4', 'x5', 'x6'],
    nodes: [
      { id: 'g1', label: "Justify and qualify Diffie\u2013Hellman",
        content: "Agreement via commutativity, security via CDH/DLP, safety via authentication.",
        kind: 'goal', status: 'confirmed', parentId: null },
      { id: 's1', label: "Both sides reach g^(ab)",
        content: "Exponent commutativity yields one shared secret.",
        kind: 'subgoal', status: 'confirmed' },
      { id: 's2', label: "Security rests on CDH",
        content: "Eavesdropper must compute g^(ab) from g^a, g^b.",
        kind: 'subgoal', status: 'confirmed' },
      { id: 's3', label: "Unauthenticated DH is MITM-able",
        content: "Identity must be bound to the shares.",
        kind: 'subgoal', status: 'confirmed' },
      { id: 'x1', label: "(g^a)^b = (g^b)^a",
        content: "Commutativity of exponentiation.",
        kind: 'operator', status: 'confirmed' },
      { id: 'x2', label: "Secret never transmitted",
        content: "Only public shares cross the network.",
        kind: 'evidence', status: 'confirmed' },
      { id: 'x3', label: "DLP \u21d2 CDH",
        content: "Recovering a solves CDH directly.",
        kind: 'operator', status: 'confirmed' },
      { id: 'x4', label: "\u221aq generic cost",
        content: "BSGS/Pollard-rho bound security by subgroup order.",
        kind: 'evidence', status: 'confirmed' },
      { id: 'x5', label: "Share substitution",
        content: "Mallory runs two exchanges and relays.",
        kind: 'evidence', status: 'confirmed' },
      { id: 'x6', label: "Signed transcripts",
        content: "TLS 1.3 signs the handshake with certified keys.",
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

import type { LabTask } from '../types';

// Lesson 5.1 — Elliptic Curves over Real & Finite Fields.
export const l5_1Task: LabTask = {
  labSlug: 'elliptic-curves-real-finite-fields',
  title: "Why Elliptic Curves Beat Z*_p",
  brief:
    "Argue that EC points form a group, that the ECDLP admits no index-calculus shortcut, and that this gives equal security with much smaller keys.",
  scenes: [
    {
      id: 'scene-l5-1-1',
      order: 1,
      title: "Points form a group",
      narration:
        "The chord-and-tangent rule plus the point at infinity O gives closure, identity, inverses (reflect over the x-axis), and associativity. Every group-based protocol (DH, ElGamal, DSA) ports directly onto the curve.",
      goal: "Commit the group law's pieces and why it makes EC a drop-in carrier.",
      goldNodeIds: ['s1', 'x1', 'x2'],
      elicitation: 'code-cell',
      hints: [
        "\u2212(x, y) = (x, \u2212y).",
        "O plays the identity role."
      ],
    },
    {
      id: 'scene-l5-1-2',
      order: 2,
      title: "ECDLP hardness",
      narration:
        "Given P and Q = kP, find k. Unlike Z*_p, where index calculus gives sub-exponential attacks, generic curves have only \u221an attacks (Pollard-rho). No useful notion of 'smooth' points exists.",
      goal: "Commit why the best ECDLP attack is generic, unlike classical DLP.",
      goldNodeIds: ['s2', 'x3', 'x4'],
      elicitation: 'code-cell',
      hints: [
        "Index calculus needs a factor base \u2014 curves don't offer one.",
        "Pollard-rho: \u221an group operations."
      ],
    },
    {
      id: 'scene-l5-1-3',
      order: 3,
      title: "Smaller keys",
      narration:
        "Because attacks are fully exponential, a 256-bit curve gives ~128-bit security \u2014 matching 3072-bit RSA. Smaller keys mean faster handshakes, less bandwidth, cheaper hardware.",
      goal: "Commit the size comparison and why it follows from the attack gap.",
      goldNodeIds: ['s3', 'x5', 'x6'],
      elicitation: 'code-cell',
      hints: [
        "128-bit security: P-256 vs RSA-3072.",
        "Exponential vs sub-exponential attack curves."
      ],
    },
  ],
  goldTree: {
    labSlug: 'elliptic-curves-real-finite-fields',
    rootId: 'g1',
    version: 1,
    prunedNodeIds: [],
    activePath: ['g1', 's1', 's2', 's3', 'x1', 'x2', 'x3', 'x4', 'x5', 'x6'],
    nodes: [
      { id: 'g1', label: "Justify elliptic-curve cryptography",
        content: "Group law, generic-only ECDLP attacks, compact keys.",
        kind: 'goal', status: 'confirmed', parentId: null },
      { id: 's1', label: "EC points form a group",
        content: "Chord-tangent rule + O satisfies all group axioms.",
        kind: 'subgoal', status: 'confirmed' },
      { id: 's2', label: "ECDLP is generic-hard",
        content: "No index-calculus analogue; only \u221an attacks.",
        kind: 'subgoal', status: 'confirmed' },
      { id: 's3', label: "Equal security, smaller keys",
        content: "256-bit EC \u2248 3072-bit RSA.",
        kind: 'subgoal', status: 'confirmed' },
      { id: 'x1', label: "Chord-and-tangent rule",
        content: "Third intersection reflected gives P + Q.",
        kind: 'operator', status: 'confirmed' },
      { id: 'x2', label: "Protocols port directly",
        content: "DH, ElGamal, DSA run unchanged on the curve group.",
        kind: 'evidence', status: 'confirmed' },
      { id: 'x3', label: "No factor base",
        content: "Index calculus has nothing to decompose points into.",
        kind: 'evidence', status: 'confirmed' },
      { id: 'x4', label: "Pollard-rho \u221an",
        content: "Best attack on generic curves is square-root.",
        kind: 'operator', status: 'confirmed' },
      { id: 'x5', label: "P-256 \u2248 RSA-3072",
        content: "Both target ~128-bit security.",
        kind: 'evidence', status: 'confirmed' },
      { id: 'x6', label: "Bandwidth and speed",
        content: "Smaller keys and signatures \u2014 faster handshakes.",
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

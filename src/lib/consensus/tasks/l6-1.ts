import type { LabTask } from '../types';

// Lesson 6.1 — Lattice-Based Cryptography & LWE.
export const l6_1Task: LabTask = {
  labSlug: 'lattice-based-cryptography-lwe',
  title: "Why Lattices Survive Quantum \u2014 and Why Noise Is the Point",
  brief:
    "Argue LWE's design: linear algebra without noise is trivially solvable, small error destroys Gaussian-elimination solvers, and the structured variants (Ring-LWE \u2192 Kyber) make it efficient enough to standardize.",
  scenes: [
    {
      id: 'scene-l6-1-1',
      order: 1,
      title: "Noise defeats algebra",
      narration:
        "A\u00b7s = b mod q is one Gaussian elimination away from s. Adding a small error vector makes every elimination amplify the noise until the system is unrecoverable \u2014 LWE is 'linear algebra plus static'.",
      goal: "Commit the single ingredient that turns a trivial problem into a hard one.",
      goldNodeIds: ['s1', 'x1', 'x2'],
      elicitation: 'code-cell',
      hints: [
        "Without e: solved in O(n\u00b3).",
        "Errors compound under the same operations that would solve it."
      ],
    },
    {
      id: 'scene-l6-1-2',
      order: 2,
      title: "Hardness by reduction",
      narration:
        "Regev showed solving LWE efficiently would give efficient approximations of worst-case lattice problems (SVP/SIVP) \u2014 including on quantum computers. Average-case keys inherit worst-case hardness.",
      goal: "Commit the worst-to-average-case reduction and why quantum gives no shortcut.",
      goldNodeIds: ['s2', 'x3', 'x4'],
      elicitation: 'code-cell',
      hints: [
        "No known quantum speedup for SVP.",
        "Worst-case lattice problems are among the most conservative assumptions."
      ],
    },
    {
      id: 'scene-l6-1-3',
      order: 3,
      title: "Kyber and structure",
      narration:
        "Plain LWE keys are huge. Ring-LWE (Kyber) swaps unstructured matrices for polynomial rings, shrinking keys to kilobytes. That efficiency is why NIST standardized ML-KEM (FIPS 203) as the primary post-quantum KEM.",
      goal: "Commit the efficiency argument and what made Kyber the standard.",
      goldNodeIds: ['s3', 'x5', 'x6'],
      elicitation: 'code-cell',
      hints: [
        "Structure trades provable generality for practicality.",
        "ML-KEM = standardized Kyber."
      ],
    },
  ],
  goldTree: {
    labSlug: 'lattice-based-cryptography-lwe',
    rootId: 'g1',
    version: 1,
    prunedNodeIds: [],
    activePath: ['g1', 's1', 's2', 's3', 'x1', 'x2', 'x3', 'x4', 'x5', 'x6'],
    nodes: [
      { id: 'g1', label: "Justify lattice crypto's post-quantum claim",
        content: "Noise defeats algebra, reductions give worst-case hardness, structure gives efficiency.",
        kind: 'goal', status: 'confirmed', parentId: null },
      { id: 's1', label: "Noise breaks linear solvers",
        content: "Error makes elimination diverge.",
        kind: 'subgoal', status: 'confirmed' },
      { id: 's2', label: "Worst-case \u21d2 average-case",
        content: "LWE hardness reduces from SVP/SIVP \u2014 quantum-resistant.",
        kind: 'subgoal', status: 'confirmed' },
      { id: 's3', label: "Structure makes it deployable",
        content: "Ring-LWE shrinks keys \u2014 ML-KEM standardized.",
        kind: 'subgoal', status: 'confirmed' },
      { id: 'x1', label: "A\u00b7s = b is trivial",
        content: "Gaussian elimination recovers s in poly time.",
        kind: 'operator', status: 'confirmed' },
      { id: 'x2', label: "Error amplification",
        content: "Each elimination step grows the relative noise.",
        kind: 'evidence', status: 'confirmed' },
      { id: 'x3', label: "Regev's reduction",
        content: "Efficient LWE solver \u21d2 efficient worst-case SVP.",
        kind: 'operator', status: 'confirmed' },
      { id: 'x4', label: "No quantum shortcut",
        content: "Shor-style speedups don't apply to lattice problems.",
        kind: 'evidence', status: 'confirmed' },
      { id: 'x5', label: "Polynomial rings",
        content: "Kyber replaces matrices with structured ring elements.",
        kind: 'operator', status: 'confirmed' },
      { id: 'x6', label: "FIPS 203 ML-KEM",
        content: "NIST's standardized post-quantum KEM.",
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

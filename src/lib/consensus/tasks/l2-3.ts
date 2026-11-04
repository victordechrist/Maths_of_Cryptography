import type { LabTask } from '../types';

// Lesson 2.3 — Finite Fields & Field Arithmetic.
export const l2_3Task: LabTask = {
  labSlug: 'finite-fields-galois-fields',
  title: "Why Finite Fields \u2014 Inverses on Demand",
  brief:
    "Argue why field structure is the cryptographic sweet spot: every nonzero element inverts, arithmetic is exact and finite, and GF(2^8) in particular is the byte-sized field AES was designed around.",
  scenes: [
    {
      id: 'scene-l2-3-1',
      order: 1,
      title: "Inverses on demand",
      narration:
        "A field guarantees every nonzero element a multiplicative inverse \u2014 the extended Euclidean algorithm finds it concretely. Protocols can divide: keys can be canceled, blinding factors removed, S-boxes built from inversion. Rings without this guarantee (Z_n with n composite) leave some elements un-invertible and protocols must tiptoe around them.",
      goal: "Commit the operational meaning of 'field': division always works.",
      goldNodeIds: ['s1', 'x1', 'x2'],
      elicitation: 'code-cell',
      hints: [
        "Inverse = B\u00e9zout coefficient when gcd = 1.",
        "Composite-modulus rings have zero divisors \u2014 permanent exceptions."
      ],
    },
    {
      id: 'scene-l2-3-2',
      order: 2,
      title: "Finite means exact",
      narration:
        "Field arithmetic never overflows and never rounds: 256 elements in GF(2^8), every result still a byte. Compare floats or bignum modular work \u2014 a finite field is the only place where crypto gets exactness AND bounded size simultaneously.",
      goal: "Commit why finiteness + field structure is the practical combination.",
      goldNodeIds: ['s2', 'x3', 'x4'],
      elicitation: 'code-cell',
      hints: [
        "Fixed word size, no approximation \u2014 every bit is accounted for.",
        "256 elements fit one machine byte exactly."
      ],
    },
    {
      id: 'scene-l2-3-3',
      order: 3,
      title: "GF(2^8) inside AES",
      narration:
        "The AES S-box is inversion in GF(2^8) followed by an affine map \u2014 chosen because inversion is maximally nonlinear, which is what breaks linear attacks. Field structure was not incidental to the design: it is the source of AES's nonlinearity.",
      goal: "Commit where the field sits in AES and what property it provides.",
      goldNodeIds: ['s3', 'x5', 'x6'],
      elicitation: 'code-cell',
      hints: [
        "S-box = x\u207b\u00b9 then affine transform.",
        "Nonlinearity is what defeats linear/differential cryptanalysis."
      ],
    },
  ],
  goldTree: {
    labSlug: 'finite-fields-galois-fields',
    rootId: 'g1',
    version: 1,
    prunedNodeIds: [],
    activePath: ['g1', 's1', 's2', 's3', 'x1', 'x2', 'x3', 'x4', 'x5', 'x6'],
    nodes: [
      { id: 'g1', label: "Justify finite fields for crypto",
        content: "Inverses guaranteed; exact bounded arithmetic; GF(2^8) supplies AES's nonlinearity.",
        kind: 'goal', status: 'confirmed', parentId: null },
      { id: 's1', label: "Field = division works",
        content: "Every nonzero element inverts \u2014 protocols can rely on cancellation.",
        kind: 'subgoal', status: 'confirmed' },
      { id: 's2', label: "Finite + exact",
        content: "Bounded size with zero rounding \u2014 the engineering sweet spot.",
        kind: 'subgoal', status: 'confirmed' },
      { id: 's3', label: "GF(2^8) powers the S-box",
        content: "AES nonlinearity is literally field inversion.",
        kind: 'subgoal', status: 'confirmed' },
      { id: 'x1', label: "B\u00e9zout gives the inverse",
        content: "gcd(a, r) = 1 yields coefficient x with a\u00b7x \u2261 1 (mod r).",
        kind: 'operator', status: 'confirmed' },
      { id: 'x2', label: "Zero divisors in rings",
        content: "Composite-modulus rings leave elements un-invertible.",
        kind: 'evidence', status: 'confirmed' },
      { id: 'x3', label: "256 elements = 1 byte",
        content: "Every result stays a machine byte \u2014 no growth, no rounding.",
        kind: 'evidence', status: 'confirmed' },
      { id: 'x4', label: "Exact by construction",
        content: "Finite arithmetic has no approximation anywhere in the pipeline.",
        kind: 'operator', status: 'confirmed' },
      { id: 'x5', label: "Inversion is nonlinear",
        content: "x\u207b\u00b9 has maximal algebraic nonlinearity \u2014 the S-box's defense.",
        kind: 'evidence', status: 'confirmed' },
      { id: 'x6', label: "Affine map finishes it",
        content: "Inversion + affine transform gives the required S-box properties.",
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

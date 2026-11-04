import type { LabTask } from '../types';

// Lesson 2.2 — Ring Theory & Polynomial Rings.
export const l2_2Task: LabTask = {
  labSlug: 'ring-theory-polynomials',
  title: "Why Rings \u2014 the Structure Behind AES",
  brief:
    "Argue why crypto needed more than a group: a second operation (multiplication) gives fields and polynomial rings, and GF(2^8) is the concrete object AES's MixColumns arithmetic lives in.",
  scenes: [
    {
      id: 'scene-l2-2-1',
      order: 1,
      title: "Two operations, one algebra",
      narration:
        "A ring adds multiplication to the abelian group: (R, +) stays a group while \u00b7 distributes over +. That single extra operation is what lets us do substitution-permutation arithmetic \u2014 AES needs to multiply bytes, not just add them.",
      goal: "Commit what the second operation buys: arithmetic richer than group powering alone.",
      goldNodeIds: ['s1', 'x1', 'x2'],
      elicitation: 'code-cell',
      hints: [
        "Distribution links the two operations \u2014 no ring without it.",
        "AES MixColumns is literal polynomial multiplication."
      ],
    },
    {
      id: 'scene-l2-2-2',
      order: 2,
      title: "Irreducibles make fields",
      narration:
        "Polynomials modulo an irreducible form a field: every nonzero element gets an inverse, because no nonzero remainder can share a factor with the modulus. GF(2^8) = GF(2)[x]/(x^8 + x^4 + x^3 + x + 1) is exactly this construction.",
      goal: "Commit why the modulus must be irreducible: it is the polynomial analogue of prime.",
      goldNodeIds: ['s2', 'x3', 'x4'],
      elicitation: 'code-cell',
      hints: [
        "mod composite \u2192 zero divisors \u2192 some elements have no inverse.",
        "GF(p^n) always exists for prime p \u2014 the irreducible is its modulus."
      ],
    },
    {
      id: 'scene-l2-2-3',
      order: 3,
      title: "Hardware-friendly fields",
      narration:
        "GF(2^8) elements are bytes; addition is XOR (free in hardware), multiplication is shift-and-reduce. Choosing a binary field is not aesthetic \u2014 it is the reason AES runs at wire speed with no multipliers.",
      goal: "Commit the engineering argument: GF(2) arithmetic maps directly onto wires.",
      goldNodeIds: ['s3', 'x5', 'x6'],
      elicitation: 'code-cell',
      hints: [
        "XOR needs no carry \u2014 it is the cheapest operation that exists.",
        "One field byte = one wire bundle of 8 bits."
      ],
    },
  ],
  goldTree: {
    labSlug: 'ring-theory-polynomials',
    rootId: 'g1',
    version: 1,
    prunedNodeIds: [],
    activePath: ['g1', 's1', 's2', 's3', 'x1', 'x2', 'x3', 'x4', 'x5', 'x6'],
    nodes: [
      { id: 'g1', label: "Justify the ring/field layer",
        content: "Multiplication enables richer arithmetic; irreducible moduli yield fields; GF(2^8) is built for hardware.",
        kind: 'goal', status: 'confirmed', parentId: null },
      { id: 's1', label: "Second operation buys SPN",
        content: "Multiplication distributes over addition \u2014 the algebra substitution-permutation needs.",
        kind: 'subgoal', status: 'confirmed' },
      { id: 's2', label: "Irreducible \u21d2 field",
        content: "Polynomials mod an irreducible give every nonzero element an inverse.",
        kind: 'subgoal', status: 'confirmed' },
      { id: 's3', label: "GF(2^8) is hardware-shaped",
        content: "Bytes + XOR + shifts \u2014 no multiplier hardware needed.",
        kind: 'subgoal', status: 'confirmed' },
      { id: 'x1', label: "Distributivity",
        content: "a\u00b7(b + c) = ab + ac \u2014 the axiom linking both operations.",
        kind: 'operator', status: 'confirmed' },
      { id: 'x2', label: "MixColumns is poly-mul",
        content: "AES column mixing multiplies by a fixed polynomial mod x^4+1 in GF(2^8).",
        kind: 'evidence', status: 'confirmed' },
      { id: 'x3', label: "Composite modulus breaks inverses",
        content: "Zero divisors appear \u2014 some nonzero elements can never be inverted.",
        kind: 'operator', status: 'confirmed' },
      { id: 'x4', label: "GF(p^n) exists for all p, n",
        content: "An irreducible of degree n over GF(p) always exists \u2014 construction is general.",
        kind: 'evidence', status: 'confirmed' },
      { id: 'x5', label: "XOR is carry-free",
        content: "Coefficient-wise XOR is the cheapest silicon operation.",
        kind: 'evidence', status: 'confirmed' },
      { id: 'x6', label: "Shift-and-reduce multiply",
        content: "GF(2)[x] multiplication is shifts + XORs \u2014 maps to wires directly.",
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

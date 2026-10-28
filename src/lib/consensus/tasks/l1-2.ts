import type { LabTask } from '../types';

// Lesson 1.2 — congruence as structure: equivalence, well-defined ops, and
// why fast exponentiation is the reason any of it is usable.
export const l1_2Task: LabTask = {
  labSlug: 'modular-arithmetic-congruences',
  title: 'Congruence as Structure',
  brief:
    'Argue the three claims that make modular arithmetic a real number system: congruence partitions ℤ, the ring operations ignore which representative you pick, and square-and-multiply is what turns theory into RSA.',
  scenes: [
    {
      id: 'scene-1-2-1',
      order: 1,
      title: 'Congruence partitions ℤ',
      narration:
        'a ≡ b (mod m) means m | (a − b). Reflexive, symmetric, transitive — an equivalence relation. Equivalence relations partition their set: ℤ splits into m disjoint residue classes [0], [1], …, [m−1], and every integer lives in exactly one.',
      goal: 'Commit why congruence is an equivalence relation and what the classes look like.',
      goldNodeIds: ['s1', 'x1', 'x2'],
      elicitation: 'code-cell',
      hints: [
        'Check the three properties on m | (a−b): a−a=0; if m|(a−b) then m|(b−a); transitivity by addition of differences.',
        'The classes are exactly the remainders 0..m−1 — disjoint, and they cover ℤ.',
      ],
    },
    {
      id: 'scene-1-2-2',
      order: 2,
      title: 'Operations are well-defined',
      narration:
        'If a ≡ a′ and b ≡ b′ (mod m), then a+b ≡ a′+b′ and a·b ≡ a′·b′. That representative-independence is what lets ℤ_m add and multiply as a ring — computing on classes is the same as computing on any members of them.',
      goal: 'Commit why the ring operations do not depend on the chosen representative.',
      goldNodeIds: ['s2', 'x3', 'x4'],
      elicitation: 'code-cell',
      hints: [
        'Write a′ = a + km, b′ = b + lm and expand — every cross term carries a factor of m.',
        'This is exactly why reducing inputs early is legal: (a·b) mod m = ((a mod m)·(b mod m)) mod m.',
      ],
    },
    {
      id: 'scene-1-2-3',
      order: 3,
      title: 'Why fast exponentiation matters',
      narration:
        'Modular exponentiation is the engine of RSA, DH, and ElGamal — but g^e is astronomically large for cryptographic exponents. Square-and-multiply uses the binary expansion of e: O(log e) multiplications, each reduced mod m to keep operands bounded. Without it, public-key crypto does not compute.',
      goal: 'Commit the efficiency argument: what breaks naïvely, and what the binary trick saves.',
      goldNodeIds: ['s3', 'x5', 'x6'],
      elicitation: 'code-cell',
      hints: [
        'Naïve g^e needs e−1 multiplications AND the value explodes before you can reduce it.',
        'Binary exponent: e = Σ bᵢ2ⁱ → result = Π g^{bᵢ·2ⁱ}; squaring the base each round gives every power of two for free.',
      ],
    },
  ],
  goldTree: {
    labSlug: 'modular-arithmetic-congruences',
    rootId: 'g1',
    version: 1,
    prunedNodeIds: [],
    activePath: ['g1', 's1', 's2', 's3', 'x1', 'x2', 'x3', 'x4', 'x5', 'x6'],
    nodes: [
      { id: 'g1', label: 'Justify ℤ_m as a number system',
        content: 'Show congruence partitions ℤ, ops are representative-free, and exponentiation is tractable.',
        kind: 'goal', status: 'confirmed', parentId: null },
      { id: 's1', label: 'Equivalence → partition',
        content: 'Congruence is reflexive/symmetric/transitive → m disjoint residue classes covering ℤ.',
        kind: 'subgoal', status: 'confirmed' },
      { id: 's2', label: 'Well-defined ring ops',
        content: 'a ≡ a′, b ≡ b′ ⇒ a+b ≡ a′+b′ and a·b ≡ a′·b′ — classes compute like members.',
        kind: 'subgoal', status: 'confirmed' },
      { id: 's3', label: 'Tractable exponentiation',
        content: 'Square-and-multiply makes g^e mod m O(log e) — the reason public-key crypto computes.',
        kind: 'subgoal', status: 'confirmed' },
      { id: 'x1', label: 'm | (a−b) is an equivalence',
        content: '0, negation, and addition of divisibility witnesses give reflexive/symmetric/transitive.',
        kind: 'operator', status: 'confirmed' },
      { id: 'x2', label: 'm classes, disjoint, covering ℤ',
        content: 'Residues 0..m−1: every integer has exactly one remainder under division by m.',
        kind: 'evidence', status: 'confirmed' },
      { id: 'x3', label: 'Substitute a′ = a + km',
        content: 'Expanding (a+km)+(b+lm) and (a+km)(b+lm) leaves only m-multiples beyond a+b, a·b.',
        kind: 'operator', status: 'confirmed' },
      { id: 'x4', label: 'Early reduction is legal',
        content: 'Representative-independence is exactly (a·b) mod m = ((a mod m)(b mod m)) mod m.',
        kind: 'evidence', status: 'confirmed' },
      { id: 'x5', label: 'Naïve power explodes',
        content: 'g^e with 2048-bit e cannot be written down, let alone computed by repeated multiplication.',
        kind: 'evidence', status: 'confirmed' },
      { id: 'x6', label: 'Binary expansion → O(log e)',
        content: 'Squaring the base each round yields g^{2^i}; set bits fold into result — ~log₂e multiplications.',
        kind: 'operator', status: 'confirmed' },
    ],
    edges: [
      { from: 'g1', to: 's1', relation: 'elaborates' },
      { from: 'g1', to: 's2', relation: 'elaborates' },
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

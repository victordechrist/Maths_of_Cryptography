import type { LabTask } from '../types';

// Lesson 4.1 — RSA Cryptosystem & Integer Factorization.
export const l4_1Task: LabTask = {
  labSlug: 'rsa-cryptosystem-factorization',
  title: "Why RSA Works \u2014 and What Breaks It",
  brief:
    "Argue RSA's correctness from Euler's theorem, its security from the hardness of factoring, and why textbook RSA must never be used without padding.",
  scenes: [
    {
      id: 'scene-l4-1-1',
      order: 1,
      title: "Correctness via Euler",
      narration:
        "ed \u2261 1 (mod \u03c6(n)) means ed = 1 + k\u03c6(n). Then c^d = m^(ed) = m\u00b7(m^\u03c6(n))^k \u2261 m (mod n) by Euler's theorem (and CRT covers m sharing a factor with n).",
      goal: "Commit the algebraic chain that makes decryption invert encryption.",
      goldNodeIds: ['s1', 'x1', 'x2'],
      elicitation: 'code-cell',
      hints: [
        "Euler: m^\u03c6(n) \u2261 1 for gcd(m, n) = 1.",
        "Write ed as 1 + k\u03c6(n) and expand."
      ],
    },
    {
      id: 'scene-l4-1-2',
      order: 2,
      title: "Security = factoring",
      narration:
        "Knowing p, q gives \u03c6(n) and hence d. The best classical factoring (GNFS) is sub-exponential, so 2048-bit n \u2248 112-bit security. Shor's algorithm factors in polynomial time on a quantum computer \u2014 RSA's long-term clock.",
      goal: "Commit the reduction (factor \u21d2 d) and the parameter-size consequence.",
      goldNodeIds: ['s2', 'x3', 'x4'],
      elicitation: 'code-cell',
      hints: [
        "\u03c6(n) = (p\u22121)(q\u22121) is trivial once p, q are known.",
        "GNFS is why RSA keys are much larger than ECC keys."
      ],
    },
    {
      id: 'scene-l4-1-3',
      order: 3,
      title: "Textbook RSA is malleable",
      narration:
        "Textbook RSA is deterministic and multiplicatively homomorphic: E(m1)\u00b7E(m2) = E(m1\u00b7m2). Attackers can test guesses and tamper ciphertexts. OAEP adds randomized padding; PSS does the same for signatures.",
      goal: "Commit two concrete flaws of raw RSA and the padding that fixes them.",
      goldNodeIds: ['s3', 'x5', 'x6'],
      elicitation: 'code-cell',
      hints: [
        "Determinism \u21d2 guess-and-check.",
        "Homomorphism \u21d2 chosen-ciphertext tampering."
      ],
    },
  ],
  goldTree: {
    labSlug: 'rsa-cryptosystem-factorization',
    rootId: 'g1',
    version: 1,
    prunedNodeIds: [],
    activePath: ['g1', 's1', 's2', 's3', 'x1', 'x2', 'x3', 'x4', 'x5', 'x6'],
    nodes: [
      { id: 'g1', label: "Justify RSA end to end",
        content: "Correctness via Euler, security via factoring, safety via padding.",
        kind: 'goal', status: 'confirmed', parentId: null },
      { id: 's1', label: "Decryption inverts encryption",
        content: "ed \u2261 1 mod \u03c6(n) plus Euler gives m^(ed) \u2261 m.",
        kind: 'subgoal', status: 'confirmed' },
      { id: 's2', label: "Security rests on factoring",
        content: "Factoring n reveals \u03c6(n) and d.",
        kind: 'subgoal', status: 'confirmed' },
      { id: 's3', label: "Raw RSA is unsafe",
        content: "Deterministic + malleable \u2014 needs OAEP/PSS.",
        kind: 'subgoal', status: 'confirmed' },
      { id: 'x1', label: "Euler's theorem",
        content: "m^\u03c6(n) \u2261 1 (mod n) for units m.",
        kind: 'operator', status: 'confirmed' },
      { id: 'x2', label: "ed = 1 + k\u03c6(n)",
        content: "Expansion gives m\u00b7(m^\u03c6)^k \u2261 m.",
        kind: 'evidence', status: 'confirmed' },
      { id: 'x3', label: "p, q \u21d2 d",
        content: "\u03c6 = (p\u22121)(q\u22121) then d = e\u207b\u00b9 mod \u03c6.",
        kind: 'operator', status: 'confirmed' },
      { id: 'x4', label: "GNFS sets key size",
        content: "Sub-exponential factoring \u2192 2048-bit for ~112-bit security.",
        kind: 'evidence', status: 'confirmed' },
      { id: 'x5', label: "Multiplicative homomorphism",
        content: "E(m1)E(m2) = E(m1m2) lets attackers tamper.",
        kind: 'evidence', status: 'confirmed' },
      { id: 'x6', label: "OAEP randomizes",
        content: "Padding makes encryption probabilistic and non-malleable.",
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

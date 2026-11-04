import type { LabExercise } from '../types';

// Lesson 4.2 — Diffie-Hellman Key Exchange & Discrete Logarithms.
export const l4_2Exercise: LabExercise = {
  labSlug: 'diffie-hellman-discrete-log',
  title: "Diffie\u2013Hellman Exchange",
  intro:
    "Assemble both sides of a DH exchange plus a baby-step giant-step solver that shows why small groups are unsafe.",
  steps: [
    {
      id: 'l4-2-s1',
      order: 1,
      title: "Public share",
      instruction:
        "Assemble a party's keypair: random secret a, public A = g^a mod p.",
      expectedInput: "prime p, generator g",
      expectedOutput: "(a, A)",
      solution: ['b1', 'b2', 'b3', 'b4'],
      blocks: [
        { id: 'b1', code: "def dh_keypair(p, g):", caption: "signature" },
        { id: 'b2', code: "    a = secrets.randbelow(p - 2) + 1", caption: "secret in [1, p\u22122]" },
        { id: 'b3', code: "    A = pow(g, a, p)", caption: "public share" },
        { id: 'b4', code: "    return a, A", caption: "keep a, send A" },
        { id: 'b5', code: "    A = pow(a, g, p)", caption: "base and exponent swapped", isDistractor: true },
      ],
    },
    {
      id: 'l4-2-s2',
      order: 2,
      title: "Shared secret",
      instruction:
        "Assemble the shared-secret step: raise the peer's public share to your own secret.",
      expectedInput: "own secret a, peer share B, prime p",
      expectedOutput: "g^(ab) mod p",
      solution: ['b1', 'b2', 'b3'],
      blocks: [
        { id: 'b1', code: "def dh_shared(a, B, p):", caption: "signature" },
        { id: 'b2', code: "    if not 1 < B < p - 1:\n        raise ValueError(\"invalid peer share\")", caption: "reject 0, 1, p\u22121 small-subgroup shares" },
        { id: 'b3', code: "    return pow(B, a, p)", caption: "B^a = g^(ab)" },
        { id: 'b4', code: "    return (B * a) % p", caption: "multiplies instead of exponentiating", isDistractor: true },
      ],
    },
    {
      id: 'l4-2-s3',
      order: 3,
      title: "Baby-step giant-step",
      instruction:
        "Assemble BSGS: solve g^x = h in O(\u221an) time and memory via a table of baby steps.",
      expectedInput: "g, h, p, group order n",
      expectedOutput: "x with g^x \u2261 h, or None",
      solution: ['b1', 'b2', 'b3', 'b4', 'b5', 'b6'],
      blocks: [
        { id: 'b1', code: "def bsgs(g, h, p, n):", caption: "signature" },
        { id: 'b2', code: "    m = math.isqrt(n) + 1", caption: "step size \u2248 \u221an" },
        { id: 'b3', code: "    table = {pow(g, j, p): j for j in range(m)}", caption: "baby steps g^j" },
        { id: 'b4', code: "    factor = pow(g, -m, p)\n    y = h", caption: "giant step multiplier g^(\u2212m)" },
        { id: 'b5', code: "    for i in range(m):\n        if y in table:\n            return i * m + table[y]\n        y = (y * factor) % p", caption: "giant steps until a match" },
        { id: 'b6', code: "    return None", caption: "no solution" },
        { id: 'b7', code: "    factor = pow(g, m, p)\n    y = h", caption: "giant step goes the wrong direction", isDistractor: true },
      ],
    },
  ],
};

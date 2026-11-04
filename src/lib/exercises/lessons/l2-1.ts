import type { LabExercise } from '../types';

// Lesson 2.1 — Group Theory & Cyclic Groups.
export const l2_1Exercise: LabExercise = {
  labSlug: 'group-theory-cyclic-groups',
  title: "Group Powering & Cyclic Order",
  intro:
    "Assemble the mechanics every group-based cryptosystem relies on: fast modular exponentiation, the order of an element, and a generator check.",
  steps: [
    {
      id: 'l2-1-s1',
      order: 1,
      title: "Square-and-multiply",
      instruction:
        "Assemble binary modular exponentiation: square the base each round, multiply into the accumulator only on set bits.",
      expectedInput: "base g, exponent e, modulus m",
      expectedOutput: "g^e mod m in O(log e) multiplications",
      solution: ['b1', 'b2', 'b3', 'b4', 'b5', 'b6'],
      blocks: [
        { id: 'b1', code: "def mod_pow(g, e, m):", caption: "signature" },
        { id: 'b2', code: "    result = 1\n    g = g % m", caption: "accumulator + reduce base" },
        { id: 'b3', code: "    while e > 0:", caption: "consume the exponent bit by bit" },
        { id: 'b4', code: "        if e & 1:\n            result = (result * g) % m", caption: "set bit \u2192 multiply in" },
        { id: 'b5', code: "        g = (g * g) % m\n        e >>= 1", caption: "square base, shift exponent" },
        { id: 'b6', code: "    return result", caption: "done" },
        { id: 'b7', code: "        g = (g * g)\n        e >>= 1", caption: "missing mod \u2014 overflows", isDistractor: true },
      ],
    },
    {
      id: 'l2-1-s2',
      order: 2,
      title: "Order of an element",
      instruction:
        "Assemble the order computation: smallest k > 0 with g^k = 1, found by walking powers until identity.",
      expectedInput: "element g, modulus m, candidate bound n",
      expectedOutput: "least k \u2264 n with g^k \u2261 1, or None",
      solution: ['b1', 'b2', 'b3', 'b4', 'b5', 'b6'],
      blocks: [
        { id: 'b1', code: "def order_of(g, m, n):", caption: "signature" },
        { id: 'b2', code: "    acc = 1", caption: "g^0 = identity" },
        { id: 'b3', code: "    for k in range(1, n + 1):", caption: "try each exponent" },
        { id: 'b4', code: "        acc = (acc * g) % m", caption: "acc = g^k" },
        { id: 'b5', code: "        if acc == 1:\n            return k", caption: "identity reached \u2192 k is the order" },
        { id: 'b6', code: "    return None", caption: "no order within bound" },
        { id: 'b7', code: "        if acc == 0:\n            return k", caption: "wrong identity", isDistractor: true },
      ],
    },
    {
      id: 'l2-1-s3',
      order: 3,
      title: "Generator check",
      instruction:
        "Assemble the cyclic-generator test: g generates Z*_m iff its order reaches \u03c6(m).",
      expectedInput: "element g, modulus m",
      expectedOutput: "True iff g is a generator",
      solution: ['b1', 'b2', 'b3', 'b4'],
      blocks: [
        { id: 'b1', code: "def is_generator(g, m):", caption: "signature" },
        { id: 'b2', code: "    if math.gcd(g, m) != 1:\n        return False", caption: "non-units can't generate" },
        { id: 'b3', code: "    phi = sum(1 for x in range(1, m) if math.gcd(x, m) == 1)", caption: "\u03c6(m) by unit count" },
        { id: 'b4', code: "    return order_of(g, m, phi) == phi", caption: "order = \u03c6(m) \u2192 generates" },
        { id: 'b5', code: "    return order_of(g, m, m) == m", caption: "wrong bound", isDistractor: true },
      ],
    },
  ],
};

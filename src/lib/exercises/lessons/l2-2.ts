import type { LabExercise } from '../types';

// Lesson 2.2 — Ring Theory & Polynomial Rings.
export const l2_2Exercise: LabExercise = {
  labSlug: 'ring-theory-polynomials',
  title: "Polynomial Arithmetic mod an Irreducible",
  intro:
    "Assemble the ring machinery behind AES: polynomial addition in GF(2), multiplication, and reduction modulo an irreducible polynomial.",
  steps: [
    {
      id: 'l2-2-s1',
      order: 1,
      title: "Poly add = XOR",
      instruction:
        "Assemble addition in GF(2)[x]: coefficients are bits, so adding polynomials is XOR of coefficient lists.",
      expectedInput: "coefficient lists p, q (LSB first)",
      expectedOutput: "p + q coefficientwise mod 2",
      solution: ['b1', 'b2', 'b3', 'b4'],
      blocks: [
        { id: 'b1', code: "def poly_add(p, q):", caption: "signature" },
        { id: 'b2', code: "    n = max(len(p), len(q))", caption: "longer operand sets the degree" },
        { id: 'b3', code: "    p = p + [0] * (n - len(p))\n    q = q + [0] * (n - len(q))", caption: "zero-pad the shorter" },
        { id: 'b4', code: "    return [a ^ b for a, b in zip(p, q)]", caption: "coefficientwise XOR" },
        { id: 'b5', code: "    return [a + b for a, b in zip(p, q)]", caption: "integer add \u2014 coefficients escape GF(2)", isDistractor: true },
      ],
    },
    {
      id: 'l2-2-s2',
      order: 2,
      title: "Shift-and-add multiply",
      instruction:
        "Assemble polynomial multiplication: for each set bit in q, shift p and XOR into the accumulator.",
      expectedInput: "coefficient lists p, q",
      expectedOutput: "product polynomial (before reduction)",
      solution: ['b1', 'b2', 'b3', 'b4', 'b5'],
      blocks: [
        { id: 'b1', code: "def poly_mul(p, q):", caption: "signature" },
        { id: 'b2', code: "    acc = []", caption: "empty accumulator" },
        { id: 'b3', code: "    for i, c in enumerate(q):", caption: "each coefficient of q" },
        { id: 'b4', code: "        if c:\n            acc = poly_add(acc, [0] * i + p)", caption: "shift p by i, add in" },
        { id: 'b5', code: "    return acc", caption: "done" },
        { id: 'b6', code: "            acc = poly_add(acc, [0] * i * p)", caption: "multiply index, not shift", isDistractor: true },
      ],
    },
    {
      id: 'l2-2-s3',
      order: 3,
      title: "Reduce mod irreducible",
      instruction:
        "Assemble long-division reduction: while the degree reaches the modulus degree, XOR away the leading term.",
      expectedInput: "product f, irreducible modulus r",
      expectedOutput: "f mod r",
      solution: ['b1', 'b2', 'b3', 'b4', 'b5'],
      blocks: [
        { id: 'b1', code: "def poly_mod(f, r):", caption: "signature" },
        { id: 'b2', code: "    f = f[:]", caption: "copy \u2014 don't mutate the caller's list" },
        { id: 'b3', code: "    while len(f) >= len(r):", caption: "degree still \u2265 modulus degree" },
        { id: 'b4', code: "        shift = len(f) - len(r)\n        f = poly_add(f, [0] * shift + r)", caption: "cancel the leading term" },
        { id: 'b5', code: "    while f and f[-1] == 0:\n        f.pop()\n    return f", caption: "trim leading zeros, return remainder" },
        { id: 'b6', code: "        f = poly_add(f, r)", caption: "no shift \u2014 never terminates", isDistractor: true },
      ],
    },
  ],
};

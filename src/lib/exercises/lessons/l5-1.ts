import type { LabExercise } from '../types';

// Lesson 5.1 — Elliptic Curves over Real & Finite Fields.
export const l5_1Exercise: LabExercise = {
  labSlug: 'elliptic-curves-real-finite-fields',
  title: "Point Arithmetic on y\u00b2 = x\u00b3 + ax + b (mod p)",
  intro:
    "Assemble elliptic-curve point addition, doubling, and double-and-add scalar multiplication over a prime field. None represents the point at infinity.",
  steps: [
    {
      id: 'l5-1-s1',
      order: 1,
      title: "Point addition",
      instruction:
        "Assemble P + Q: handle infinity and inverse points, then use the chord slope (or tangent slope when P = Q).",
      expectedInput: "points P, Q; curve parameter a; prime p",
      expectedOutput: "P + Q on the curve",
      solution: ['b1', 'b2', 'b3', 'b4', 'b5', 'b6'],
      blocks: [
        { id: 'b1', code: "def ec_add(P, Q, a, p):", caption: "signature" },
        { id: 'b2', code: "    if P is None:\n        return Q\n    if Q is None:\n        return P", caption: "O is the identity" },
        { id: 'b3', code: "    (x1, y1), (x2, y2) = P, Q\n    if x1 == x2 and (y1 + y2) % p == 0:\n        return None", caption: "P + (\u2212P) = O" },
        { id: 'b4', code: "    if P == Q:\n        lam = (3 * x1 * x1 + a) * pow(2 * y1, -1, p) % p\n    else:\n        lam = (y2 - y1) * pow(x2 - x1, -1, p) % p", caption: "tangent or chord slope" },
        { id: 'b5', code: "    x3 = (lam * lam - x1 - x2) % p\n    y3 = (lam * (x1 - x3) - y1) % p", caption: "reflect the third intersection" },
        { id: 'b6', code: "    return (x3, y3)", caption: "sum point" },
        { id: 'b7', code: "    y3 = (lam * (x1 - x3) + y1) % p", caption: "forgets the reflection", isDistractor: true },
      ],
    },
    {
      id: 'l5-1-s2',
      order: 2,
      title: "Double-and-add",
      instruction:
        "Assemble scalar multiplication kP via the binary expansion of k.",
      expectedInput: "scalar k, point P, a, p",
      expectedOutput: "kP",
      solution: ['b1', 'b2', 'b3', 'b4', 'b5', 'b6'],
      blocks: [
        { id: 'b1', code: "def ec_mul(k, P, a, p):", caption: "signature" },
        { id: 'b2', code: "    R = None", caption: "accumulator = O" },
        { id: 'b3', code: "    while k > 0:", caption: "consume bits of k" },
        { id: 'b4', code: "        if k & 1:\n            R = ec_add(R, P, a, p)", caption: "set bit \u2192 add" },
        { id: 'b5', code: "        P = ec_add(P, P, a, p)\n        k >>= 1", caption: "double, shift" },
        { id: 'b6', code: "    return R", caption: "kP" },
        { id: 'b7', code: "        P = ec_add(P, R, a, p)\n        k >>= 1", caption: "adds the accumulator instead of doubling", isDistractor: true },
      ],
    },
    {
      id: 'l5-1-s3',
      order: 3,
      title: "On-curve check",
      instruction:
        "Assemble point validation: reject points that don't satisfy the curve equation (invalid-curve attack defense).",
      expectedInput: "point P, a, b, p",
      expectedOutput: "True iff P is on the curve",
      solution: ['b1', 'b2', 'b3', 'b4'],
      blocks: [
        { id: 'b1', code: "def on_curve(P, a, b, p):", caption: "signature" },
        { id: 'b2', code: "    if P is None:\n        return True", caption: "O is on every curve" },
        { id: 'b3', code: "    x, y = P", caption: "unpack" },
        { id: 'b4', code: "    return (y * y - (x * x * x + a * x + b)) % p == 0", caption: "y\u00b2 \u2261 x\u00b3 + ax + b" },
        { id: 'b5', code: "    return (y * y - (x * x * x + a * x + b)) == 0", caption: "no reduction mod p", isDistractor: true },
      ],
    },
  ],
};

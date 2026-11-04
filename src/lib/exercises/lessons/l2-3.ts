import type { LabExercise } from '../types';

// Lesson 2.3 — Finite Fields & Field Arithmetic.
export const l2_3Exercise: LabExercise = {
  labSlug: 'finite-fields-galois-fields',
  title: "Field Inverses in GF(2^8)",
  intro:
    "Assemble the extended Euclid trick for polynomials: find the inverse of a byte mod the AES polynomial \u2014 the exact subroutine inside the AES S-box.",
  steps: [
    {
      id: 'l2-3-s1',
      order: 1,
      title: "Poly extended Euclid",
      instruction:
        "Assemble the polynomial extended GCD: track two remainder chains and the coefficient of the modulus-side polynomial.",
      expectedInput: "byte polynomial a, irreducible r",
      expectedOutput: "(g, x) with a\u00b7x \u2261 g (mod r)",
      solution: ['b1', 'b2', 'b3', 'b4', 'b5', 'b6'],
      blocks: [
        { id: 'b1', code: "def poly_egcd(a, r):", caption: "signature" },
        { id: 'b2', code: "    r_old, r_new = a, r\n    x_old, x_new = [1], [0]", caption: "seed remainder + coefficient chains" },
        { id: 'b3', code: "    while r_new != [0] and r_new != []:", caption: "until remainder vanishes" },
        { id: 'b4', code: "        q, rem = poly_divmod(r_old, r_new)", caption: "divide the older by the newer" },
        { id: 'b5', code: "        r_old, r_new = r_new, rem\n        x_old, x_new = x_new, poly_add(x_old, poly_mul(q, x_new))", caption: "advance both chains" },
        { id: 'b6', code: "    return r_old, x_old", caption: "g and its coefficient" },
        { id: 'b7', code: "        r_old, r_new = r_new, r_old", caption: "forget the remainder", isDistractor: true },
      ],
    },
    {
      id: 'l2-3-s2',
      order: 2,
      title: "Inverse from coefficient",
      instruction:
        "Assemble the inverse lookup: when the gcd is 1, the B\u00e9zout coefficient IS the multiplicative inverse mod r.",
      expectedInput: "nonzero byte polynomial a, modulus r",
      expectedOutput: "a\u207b\u00b9 mod r",
      solution: ['b1', 'b2', 'b3', 'b4'],
      blocks: [
        { id: 'b1', code: "def poly_inv(a, r):", caption: "signature" },
        { id: 'b2', code: "    g, x = poly_egcd(a, r)", caption: "run extended Euclid" },
        { id: 'b3', code: "    if g != [1]:\n        raise ValueError(\"no inverse\")", caption: "non-unit \u2014 only happens if r is reducible or a = 0" },
        { id: 'b4', code: "    return poly_mod(x, r)", caption: "normalize the coefficient into the field" },
        { id: 'b5', code: "    return x", caption: "unnormalized \u2014 may exceed degree 7", isDistractor: true },
      ],
    },
    {
      id: 'l2-3-s3',
      order: 3,
      title: "Byte interface",
      instruction:
        "Assemble the byte wrappers: encode a byte as a coefficient list, invert, decode back \u2014 the AES S-box's inverse step.",
      expectedInput: "integer byte b (0\u2013255), modulus r",
      expectedOutput: "integer byte of b\u207b\u00b9 mod r (0 \u21a6 0)",
      solution: ['b1', 'b2', 'b3', 'b4', 'b5'],
      blocks: [
        { id: 'b1', code: "def byte_inv(b, r):", caption: "signature" },
        { id: 'b2', code: "    if b == 0:\n        return 0", caption: "zero maps to zero by convention" },
        { id: 'b3', code: "    p = [(b >> i) & 1 for i in range(8)]", caption: "byte \u2192 8 coefficients, LSB first" },
        { id: 'b4', code: "    inv = poly_inv(p, r)", caption: "polynomial inverse" },
        { id: 'b5', code: "    return sum(c << i for i, c in enumerate(inv))", caption: "coefficients \u2192 byte" },
        { id: 'b6', code: "    return sum(c << i for i, c in enumerate(p))", caption: "returns the input, not the inverse", isDistractor: true },
      ],
    },
  ],
};

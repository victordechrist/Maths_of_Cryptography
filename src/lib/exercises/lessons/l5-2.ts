import type { LabExercise } from '../types';

// Lesson 5.2 — ECDH & ECDSA Protocols.
export const l5_2Exercise: LabExercise = {
  labSlug: 'ecdh-ecdsa-protocols',
  title: "ECDSA Sign & Verify",
  intro:
    "Assemble ECDSA on a curve of prime order n: signing with a fresh nonce and verification via the u1\u00b7G + u2\u00b7Q combination. Reuses ec_mul / ec_add.",
  steps: [
    {
      id: 'l5-2-s1',
      order: 1,
      title: "Sign",
      instruction:
        "Assemble signing: fresh k, r = (kG).x mod n, s = k\u207b\u00b9(z + r\u00b7d) mod n.",
      expectedInput: "hash z, private d, generator G, order n, a, p",
      expectedOutput: "(r, s)",
      solution: ['b1', 'b2', 'b3', 'b4', 'b5'],
      blocks: [
        { id: 'b1', code: "def ecdsa_sign(z, d, G, n, a, p):", caption: "signature" },
        { id: 'b2', code: "    while True:", caption: "retry on degenerate r or s" },
        { id: 'b3', code: "        k = secrets.randbelow(n - 1) + 1\n        r = ec_mul(k, G, a, p)[0] % n", caption: "fresh nonce \u2192 r" },
        { id: 'b4', code: "        s = pow(k, -1, n) * (z + r * d) % n", caption: "s binds hash, r, and key" },
        { id: 'b5', code: "        if r and s:\n            return r, s", caption: "non-zero \u2192 done" },
        { id: 'b6', code: "        s = pow(k, -1, n) * (z + d) % n", caption: "drops r \u2014 forgeable", isDistractor: true },
      ],
    },
    {
      id: 'l5-2-s2',
      order: 2,
      title: "Verify",
      instruction:
        "Assemble verification: w = s\u207b\u00b9, u1 = z\u00b7w, u2 = r\u00b7w; accept iff (u1G + u2Q).x \u2261 r.",
      expectedInput: "hash z, (r, s), public Q, G, n, a, p",
      expectedOutput: "True iff valid",
      solution: ['b1', 'b2', 'b3', 'b4', 'b5'],
      blocks: [
        { id: 'b1', code: "def ecdsa_verify(z, sig, Q, G, n, a, p):", caption: "signature" },
        { id: 'b2', code: "    r, s = sig\n    if not (0 < r < n and 0 < s < n):\n        return False", caption: "range checks" },
        { id: 'b3', code: "    w = pow(s, -1, n)\n    u1, u2 = z * w % n, r * w % n", caption: "scalar coefficients" },
        { id: 'b4', code: "    X = ec_add(ec_mul(u1, G, a, p), ec_mul(u2, Q, a, p), a, p)", caption: "u1G + u2Q = kG" },
        { id: 'b5', code: "    return X is not None and X[0] % n == r", caption: "x-coordinate must match r" },
        { id: 'b6', code: "    return X is not None and X[1] % n == r", caption: "compares y instead of x", isDistractor: true },
      ],
    },
    {
      id: 'l5-2-s3',
      order: 3,
      title: "ECDH shared point",
      instruction:
        "Assemble ECDH: validate the peer's point, then multiply by your scalar and keep the x-coordinate.",
      expectedInput: "own scalar d, peer point Q, a, b, p",
      expectedOutput: "shared x-coordinate",
      solution: ['b1', 'b2', 'b3', 'b4'],
      blocks: [
        { id: 'b1', code: "def ecdh(d, Q, a, b, p):", caption: "signature" },
        { id: 'b2', code: "    if not on_curve(Q, a, b, p):\n        raise ValueError(\"invalid point\")", caption: "invalid-curve defense" },
        { id: 'b3', code: "    S = ec_mul(d, Q, a, p)", caption: "d\u00b7Q = d\u00b7e\u00b7G" },
        { id: 'b4', code: "    return S[0]", caption: "use x as shared secret input" },
        { id: 'b5', code: "    S = ec_add(Q, Q, a, p)", caption: "doubles instead of scalar-multiplying", isDistractor: true },
      ],
    },
  ],
};

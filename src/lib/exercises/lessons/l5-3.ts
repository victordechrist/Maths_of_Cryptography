import type { LabExercise } from '../types';

// Lesson 5.3 — Pairing-Based Cryptography & Advanced Curves.
export const l5_3Exercise: LabExercise = {
  labSlug: 'pairing-based-cryptography',
  title: "BLS-Style Signatures (toy bilinear map)",
  intro:
    "Assemble the BLS signing logic over an abstract pairing e: keygen, sign as \u03c3 = x\u00b7H(m), verify e(\u03c3, G) = e(H(m), X), and aggregate signatures by addition. `pair`, `hash_to_point`, `ec_mul`, `ec_add` are provided.",
  steps: [
    {
      id: 'l5-3-s1',
      order: 1,
      title: "Keygen & sign",
      instruction:
        "Assemble BLS keygen and signing: X = x\u00b7G, \u03c3 = x\u00b7H(m).",
      expectedInput: "message m, generator G",
      expectedOutput: "(x, X), \u03c3",
      solution: ['b1', 'b2', 'b3', 'b4'],
      blocks: [
        { id: 'b1', code: "def bls_keygen(G, n):", caption: "keygen signature" },
        { id: 'b2', code: "    x = secrets.randbelow(n - 1) + 1\n    return x, ec_mul(x, G)", caption: "secret scalar, public point" },
        { id: 'b3', code: "def bls_sign(x, m):", caption: "signing signature" },
        { id: 'b4', code: "    return ec_mul(x, hash_to_point(m))", caption: "\u03c3 = x\u00b7H(m) \u2014 deterministic" },
        { id: 'b5', code: "    return ec_mul(x, m)", caption: "multiplies the raw message", isDistractor: true },
      ],
    },
    {
      id: 'l5-3-s2',
      order: 2,
      title: "Verify",
      instruction:
        "Assemble verification using bilinearity: e(\u03c3, G) must equal e(H(m), X).",
      expectedInput: "public X, message m, signature \u03c3, G",
      expectedOutput: "True iff valid",
      solution: ['b1', 'b2', 'b3', 'b4'],
      blocks: [
        { id: 'b1', code: "def bls_verify(X, m, sigma, G):", caption: "signature" },
        { id: 'b2', code: "    lhs = pair(sigma, G)", caption: "e(xH(m), G)" },
        { id: 'b3', code: "    rhs = pair(hash_to_point(m), X)", caption: "e(H(m), xG)" },
        { id: 'b4', code: "    return lhs == rhs", caption: "bilinearity makes both e(H,G)^x" },
        { id: 'b5', code: "    rhs = pair(hash_to_point(m), G)", caption: "forgets the public key", isDistractor: true },
      ],
    },
    {
      id: 'l5-3-s3',
      order: 3,
      title: "Aggregate",
      instruction:
        "Assemble aggregation: sum the signatures; verify one pairing per signer against a single product.",
      expectedInput: "list of signatures",
      expectedOutput: "aggregate signature",
      solution: ['b1', 'b2', 'b3', 'b4'],
      blocks: [
        { id: 'b1', code: "def bls_aggregate(sigs):", caption: "signature" },
        { id: 'b2', code: "    agg = None", caption: "identity point" },
        { id: 'b3', code: "    for s in sigs:\n        agg = ec_add(agg, s)", caption: "point addition" },
        { id: 'b4', code: "    return agg", caption: "one compact signature" },
        { id: 'b5', code: "    for s in sigs:\n        agg = ec_mul(2, s)", caption: "overwrites instead of summing", isDistractor: true },
      ],
    },
  ],
};

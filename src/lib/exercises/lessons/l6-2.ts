import type { LabExercise } from '../types';

// Lesson 6.2 — Zero-Knowledge Proofs & Interactive Proof Systems.
export const l6_2Exercise: LabExercise = {
  labSlug: 'zero-knowledge-proofs',
  title: "Schnorr Identification",
  intro:
    "Assemble the Schnorr \u03a3-protocol: commit, challenge, response \u2014 then the Fiat\u2013Shamir transform that makes it non-interactive.",
  steps: [
    {
      id: 'l6-2-s1',
      order: 1,
      title: "Commitment",
      instruction:
        "Assemble the prover's first move: random r, commitment t = g^r mod p.",
      expectedInput: "p, g, group order n",
      expectedOutput: "(r, t)",
      solution: ['b1', 'b2', 'b3', 'b4'],
      blocks: [
        { id: 'b1', code: "def schnorr_commit(p, g, n):", caption: "signature" },
        { id: 'b2', code: "    r = secrets.randbelow(n - 1) + 1", caption: "fresh randomness" },
        { id: 'b3', code: "    t = pow(g, r, p)", caption: "commitment" },
        { id: 'b4', code: "    return r, t", caption: "send t, keep r" },
        { id: 'b5', code: "    t = pow(r, g, p)", caption: "base/exponent swapped", isDistractor: true },
      ],
    },
    {
      id: 'l6-2-s2',
      order: 2,
      title: "Response",
      instruction:
        "Assemble the response: s = r + c\u00b7x mod n \u2014 binds the randomness to the secret under the challenge.",
      expectedInput: "r, challenge c, secret x, n",
      expectedOutput: "response s",
      solution: ['b1', 'b2'],
      blocks: [
        { id: 'b1', code: "def schnorr_respond(r, c, x, n):", caption: "signature" },
        { id: 'b2', code: "    return (r + c * x) % n", caption: "r masked by challenge\u00b7secret" },
        { id: 'b3', code: "    return (r * c + x) % n", caption: "wrong binding \u2014 breaks verification", isDistractor: true },
      ],
    },
    {
      id: 'l6-2-s3',
      order: 3,
      title: "Verify",
      instruction:
        "Assemble verification: g^s must equal t\u00b7h^c, where h = g^x is the public key.",
      expectedInput: "p, g, public h, (t, c, s)",
      expectedOutput: "True iff the prover knows x",
      solution: ['b1', 'b2', 'b3', 'b4'],
      blocks: [
        { id: 'b1', code: "def schnorr_verify(p, g, h, t, c, s):", caption: "signature" },
        { id: 'b2', code: "    lhs = pow(g, s, p)", caption: "g^(r + cx)" },
        { id: 'b3', code: "    rhs = (t * pow(h, c, p)) % p", caption: "g^r \u00b7 (g^x)^c" },
        { id: 'b4', code: "    return lhs == rhs", caption: "equal iff s was computed with x" },
        { id: 'b5', code: "    rhs = (t + pow(h, c, p)) % p", caption: "addition instead of multiplication", isDistractor: true },
      ],
    },
  ],
};

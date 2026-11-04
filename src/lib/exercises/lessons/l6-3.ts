import type { LabExercise } from '../types';

// Lesson 6.3 — Homomorphic Encryption & Secure Multiparty Computation.
export const l6_3Exercise: LabExercise = {
  labSlug: 'homomorphic-encryption-mpc',
  title: "Secret Sharing (Shamir-lite + additive)",
  intro:
    "Assemble the two simplest FHE/MPC building blocks: additive secret sharing over Z_q, reconstruction, and a partial homomorphic property \u2014 shares add up to the sum.",
  steps: [
    {
      id: 'l6-3-s1',
      order: 1,
      title: "Additive share",
      instruction:
        "Assemble n-out-of-n additive sharing: n\u22121 random shares plus the last = secret \u2212 sum mod q.",
      expectedInput: "secret s, share count n, modulus q",
      expectedOutput: "list of n shares",
      solution: ['b1', 'b2', 'b3', 'b4'],
      blocks: [
        { id: 'b1', code: "def additive_share(s, n, q):", caption: "signature" },
        { id: 'b2', code: "    shares = [secrets.randbelow(q) for _ in range(n - 1)]", caption: "n\u22121 uniform random" },
        { id: 'b3', code: "    shares.append((s - sum(shares)) % q)", caption: "last share closes the sum" },
        { id: 'b4', code: "    return shares", caption: "\u03a3 shares \u2261 s" },
        { id: 'b5', code: "    shares.append(s % q)", caption: "last share = secret \u2014 leaks it", isDistractor: true },
      ],
    },
    {
      id: 'l6-3-s2',
      order: 2,
      title: "Reconstruct",
      instruction:
        "Assemble reconstruction: sum all shares mod q \u2014 nothing less than the full set reveals s.",
      expectedInput: "shares, q",
      expectedOutput: "secret",
      solution: ['b1', 'b2'],
      blocks: [
        { id: 'b1', code: "def additive_reconstruct(shares, q):", caption: "signature" },
        { id: 'b2', code: "    return sum(shares) % q", caption: "sum mod q" },
        { id: 'b3', code: "    return max(shares)", caption: "picks a share \u2014 nonsense", isDistractor: true },
      ],
    },
    {
      id: 'l6-3-s3',
      order: 3,
      title: "Sum via shares",
      instruction:
        "Assemble the homomorphic trick: each party sums their own shares locally; combining those sums yields the total without any share ever being combined per-party.",
      expectedInput: "matrix of shares (parties \u00d7 secrets), q",
      expectedOutput: "sum of all secrets",
      solution: ['b1', 'b2', 'b3'],
      blocks: [
        { id: 'b1', code: "def share_sum(party_shares, q):", caption: "signature" },
        { id: 'b2', code: "    local = [sum(col) % q for col in zip(*party_shares)]", caption: "each party sums its own column" },
        { id: 'b3', code: "    return sum(local) % q", caption: "combine the local sums" },
        { id: 'b4', code: "    return [sum(col) for col in zip(*party_shares)]", caption: "misses the reduction", isDistractor: true },
      ],
    },
  ],
};

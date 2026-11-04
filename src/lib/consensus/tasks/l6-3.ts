import type { LabTask } from '../types';

// Lesson 6.3 — Homomorphic Encryption & Secure Multiparty Computation.
export const l6_3Task: LabTask = {
  labSlug: 'homomorphic-encryption-mpc',
  title: "Why Compute on Secrets",
  brief:
    "Argue the shared motivation behind FHE and MPC: compute without seeing data, distributed trust replaces a trusted party, and noise management is what makes full homomorphic evaluation possible.",
  scenes: [
    {
      id: 'scene-l6-3-1',
      order: 1,
      title: "Compute without seeing",
      narration:
        "Homomorphic encryption evaluates functions on ciphertexts: Enc(a) \u2295 Enc(b) = Enc(a + b) (and \u00d7 for full FHE). A server runs the client's computation while learning nothing \u2014 cloud math on encrypted data.",
      goal: "Commit the property and the use case it unlocks.",
      goldNodeIds: ['s1', 'x1', 'x2'],
      elicitation: 'code-cell',
      hints: [
        "RSA/ElGamal are already multiplicatively homomorphic.",
        "FHE = both + and \u00d7 \u21d2 arbitrary circuits."
      ],
    },
    {
      id: 'scene-l6-3-2',
      order: 2,
      title: "Distributed trust",
      narration:
        "MPC secret-shares inputs among parties; no single one sees real data, and honest majority reconstructs the function's output. Secret sharing gives privacy against coalitions smaller than the threshold.",
      goal: "Commit how sharing removes the trusted third party.",
      goldNodeIds: ['s2', 'x3', 'x4'],
      elicitation: 'code-cell',
      hints: [
        "Any n\u22121 additive shares are uniform random.",
        "Output revealed, inputs never."
      ],
    },
    {
      id: 'scene-l6-3-3',
      order: 3,
      title: "Noise management",
      narration:
        "FHE ciphertexts carry error that grows with every multiplication. Bootstrapping \u2014 homomorphically decrypting the ciphertext with an encrypted secret key \u2014 resets the noise and makes unlimited evaluation possible (Gentry 2009).",
      goal: "Commit why noise bounds depth and how bootstrapping resets it.",
      goldNodeIds: ['s3', 'x5', 'x6'],
      elicitation: 'code-cell',
      hints: [
        "Each multiplication roughly doubles noise.",
        "Bootstrapping = homomorphic self-decryption."
      ],
    },
  ],
  goldTree: {
    labSlug: 'homomorphic-encryption-mpc',
    rootId: 'g1',
    version: 1,
    prunedNodeIds: [],
    activePath: ['g1', 's1', 's2', 's3', 'x1', 'x2', 'x3', 'x4', 'x5', 'x6'],
    nodes: [
      { id: 'g1', label: "Explain computing on hidden data",
        content: "HE evaluates on ciphertexts; MPC distributes trust; noise must be managed.",
        kind: 'goal', status: 'confirmed', parentId: null },
      { id: 's1', label: "Ciphertext computation",
        content: "Operations on encryptions = encrypted operation.",
        kind: 'subgoal', status: 'confirmed' },
      { id: 's2', label: "No trusted party",
        content: "Shares distribute inputs; only outputs combine.",
        kind: 'subgoal', status: 'confirmed' },
      { id: 's3', label: "Noise limits depth",
        content: "Multiplications grow error; bootstrapping resets it.",
        kind: 'subgoal', status: 'confirmed' },
      { id: 'x1', label: "Enc(a)\u00b7Enc(b)=Enc(ab)",
        content: "Homomorphic operations preserve the function.",
        kind: 'operator', status: 'confirmed' },
      { id: 'x2', label: "Encrypted cloud compute",
        content: "Server computes for client without seeing data.",
        kind: 'evidence', status: 'confirmed' },
      { id: 'x3', label: "n\u22121 shares = uniform",
        content: "Any proper subset leaks nothing about s.",
        kind: 'evidence', status: 'confirmed' },
      { id: 'x4', label: "Threshold privacy",
        content: "Coalitions below threshold learn nothing.",
        kind: 'operator', status: 'confirmed' },
      { id: 'x5', label: "Noise growth",
        content: "Multiplication dominates error expansion.",
        kind: 'evidence', status: 'confirmed' },
      { id: 'x6', label: "Gentry's bootstrapping",
        content: "Homomorphic re-decryption refreshes ciphertexts.",
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

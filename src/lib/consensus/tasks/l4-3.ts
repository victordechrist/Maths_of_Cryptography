import type { LabTask } from '../types';

// Lesson 4.3 — ElGamal Cryptosystem & Digital Signatures.
export const l4_3Task: LabTask = {
  labSlug: 'elgamal-digital-signatures',
  title: "Why Randomness Is Non-Negotiable in ElGamal",
  brief:
    "Argue ElGamal's correctness, why its randomized ciphertexts give semantic security, and why ephemeral-key reuse is catastrophic for both ElGamal encryption and DSA-style signatures.",
  scenes: [
    {
      id: 'scene-l4-3-1',
      order: 1,
      title: "Correctness",
      narration:
        "c1^x = g^(kx) = h^k, which is exactly the mask in c2. Dividing it out returns m. ElGamal is DH with the message riding on the shared secret.",
      goal: "Commit why decryption recovers m and its relation to DH.",
      goldNodeIds: ['s1', 'x1', 'x2'],
      elicitation: 'code-cell',
      hints: [
        "h = g^x, so h^k = (g^k)^x.",
        "The mask is a one-time DH secret."
      ],
    },
    {
      id: 'scene-l4-3-2',
      order: 2,
      title: "Randomized = semantic security",
      narration:
        "A fresh k makes every encryption of the same m look different. Under DDH, the ciphertext is indistinguishable from random pairs \u2014 IND-CPA security that textbook RSA lacks.",
      goal: "Commit how fresh randomness provides semantic security under DDH.",
      goldNodeIds: ['s2', 'x3', 'x4'],
      elicitation: 'code-cell',
      hints: [
        "Same m, two encryptions \u2192 unrelated ciphertexts.",
        "DDH: g^(kx) looks random given g^k, g^x."
      ],
    },
    {
      id: 'scene-l4-3-3',
      order: 3,
      title: "Nonce reuse is fatal",
      narration:
        "Reusing k across ciphertexts lets a known plaintext unmask others. In DSA/ECDSA signatures, two signatures with the same k reveal the private key outright \u2014 the PS3 signing-key breach happened exactly this way.",
      goal: "Commit both failure modes of ephemeral reuse.",
      goldNodeIds: ['s3', 'x5', 'x6'],
      elicitation: 'code-cell',
      hints: [
        "Same mask h^k across messages.",
        "Two equations, two unknowns (k, x) \u2014 solve for x."
      ],
    },
  ],
  goldTree: {
    labSlug: 'elgamal-digital-signatures',
    rootId: 'g1',
    version: 1,
    prunedNodeIds: [],
    activePath: ['g1', 's1', 's2', 's3', 'x1', 'x2', 'x3', 'x4', 'x5', 'x6'],
    nodes: [
      { id: 'g1', label: "Argue ElGamal correctness and fragility",
        content: "Correct via DH mask, secure via randomization, broken by nonce reuse.",
        kind: 'goal', status: 'confirmed', parentId: null },
      { id: 's1', label: "Decryption strips the DH mask",
        content: "c1^x reproduces h^k exactly.",
        kind: 'subgoal', status: 'confirmed' },
      { id: 's2', label: "Fresh k gives IND-CPA",
        content: "Randomized ciphertexts secure under DDH.",
        kind: 'subgoal', status: 'confirmed' },
      { id: 's3', label: "Ephemeral reuse is catastrophic",
        content: "Unmasks messages; leaks signing keys.",
        kind: 'subgoal', status: 'confirmed' },
      { id: 'x1', label: "(g^k)^x = (g^x)^k",
        content: "Both sides compute the same mask.",
        kind: 'operator', status: 'confirmed' },
      { id: 'x2', label: "ElGamal = DH + message",
        content: "The message multiplies a one-time shared secret.",
        kind: 'evidence', status: 'confirmed' },
      { id: 'x3', label: "Probabilistic encryption",
        content: "Same m encrypts differently each time.",
        kind: 'operator', status: 'confirmed' },
      { id: 'x4', label: "DDH assumption",
        content: "g^(kx) indistinguishable from random given g^k, g^x.",
        kind: 'evidence', status: 'confirmed' },
      { id: 'x5', label: "Known m1 \u21d2 m2",
        content: "Shared mask recovered and reused.",
        kind: 'evidence', status: 'confirmed' },
      { id: 'x6', label: "DSA k-reuse leaks x",
        content: "Two signatures \u2192 linear system \u2192 private key (PS3 breach).",
        kind: 'evidence', status: 'confirmed' },
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

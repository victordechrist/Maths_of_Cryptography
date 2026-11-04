import type { LabExercise } from '../types';

// Lesson 4.3 — ElGamal Cryptosystem & Digital Signatures.
export const l4_3Exercise: LabExercise = {
  labSlug: 'elgamal-digital-signatures',
  title: "ElGamal Encryption",
  intro:
    "Assemble ElGamal over Z*_p: ephemeral-key encryption, decryption via the shared mask, and a demonstration of why the ephemeral key must never repeat.",
  steps: [
    {
      id: 'l4-3-s1',
      order: 1,
      title: "Encrypt",
      instruction:
        "Assemble encryption: fresh k, c1 = g^k, c2 = m\u00b7h^k where h = g^x is the public key.",
      expectedInput: "p, g, public h, message m",
      expectedOutput: "(c1, c2)",
      solution: ['b1', 'b2', 'b3', 'b4', 'b5'],
      blocks: [
        { id: 'b1', code: "def elgamal_encrypt(p, g, h, m):", caption: "signature" },
        { id: 'b2', code: "    k = secrets.randbelow(p - 2) + 1", caption: "fresh ephemeral key" },
        { id: 'b3', code: "    c1 = pow(g, k, p)", caption: "ephemeral share" },
        { id: 'b4', code: "    c2 = (m * pow(h, k, p)) % p", caption: "mask the message" },
        { id: 'b5', code: "    return c1, c2", caption: "ciphertext pair" },
        { id: 'b6', code: "    c2 = (m + pow(h, k, p)) % p", caption: "additive mask breaks decryption", isDistractor: true },
      ],
    },
    {
      id: 'l4-3-s2',
      order: 2,
      title: "Decrypt",
      instruction:
        "Assemble decryption: recompute the mask s = c1^x and divide it out.",
      expectedInput: "p, secret x, (c1, c2)",
      expectedOutput: "m",
      solution: ['b1', 'b2', 'b3'],
      blocks: [
        { id: 'b1', code: "def elgamal_decrypt(p, x, c1, c2):", caption: "signature" },
        { id: 'b2', code: "    s = pow(c1, x, p)", caption: "shared mask g^(kx)" },
        { id: 'b3', code: "    return (c2 * pow(s, -1, p)) % p", caption: "m = c2\u00b7s\u207b\u00b9" },
        { id: 'b4', code: "    return (c2 * s) % p", caption: "multiplies by the mask again", isDistractor: true },
      ],
    },
    {
      id: 'l4-3-s3',
      order: 3,
      title: "Reused-k leak",
      instruction:
        "Assemble the attack: if two ciphertexts share k, knowing m1 reveals m2.",
      expectedInput: "p, known m1, (c1, c2a), (c1, c2b)",
      expectedOutput: "m2",
      solution: ['b1', 'b2', 'b3'],
      blocks: [
        { id: 'b1', code: "def reuse_attack(p, m1, c2a, c2b):", caption: "signature" },
        { id: 'b2', code: "    mask = (c2a * pow(m1, -1, p)) % p", caption: "recover h^k from the known pair" },
        { id: 'b3', code: "    return (c2b * pow(mask, -1, p)) % p", caption: "strip the same mask from the second" },
        { id: 'b4', code: "    return (c2b * mask) % p", caption: "applies the mask instead of removing it", isDistractor: true },
      ],
    },
  ],
};

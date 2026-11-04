import type { LabExercise } from '../types';

// Lesson 6.1 — Lattice-Based Cryptography & LWE.
export const l6_1Exercise: LabExercise = {
  labSlug: 'lattice-based-cryptography-lwe',
  title: "Regev's LWE Encryption (toy)",
  intro:
    "Assemble a toy LWE cryptosystem: public key from A + error, encrypt as bit times \u230aq/2\u230b masked by an LWE sample, decrypt by thresholding the noise.",
  steps: [
    {
      id: 'l6-1-s1',
      order: 1,
      title: "Secret key + public key",
      instruction:
        "Assemble keygen: secret s, matrix A, error vector e; publish (A, b = A\u00b7s + e mod q).",
      expectedInput: "params (m, n, q)",
      expectedOutput: "(s, (A, b))",
      solution: ['b1', 'b2', 'b3', 'b4', 'b5', 'b6'],
      blocks: [
        { id: 'b1', code: "def lwe_keygen(m, n, q):", caption: "signature" },
        { id: 'b2', code: "    s = [secrets.randbelow(q) for _ in range(n)]", caption: "secret vector" },
        { id: 'b3', code: "    A = [[secrets.randbelow(q) for _ in range(n)] for _ in range(m)]", caption: "public random matrix" },
        { id: 'b4', code: "    e = [secrets.choice([-1, 0, 1]) for _ in range(m)]", caption: "small error \u2014 the security ingredient" },
        { id: 'b5', code: "    b = [(sum(A[i][j] * s[j] for j in range(n)) + e[i]) % q for i in range(m)]", caption: "b = A\u00b7s + e" },
        { id: 'b6', code: "    return s, (A, b)", caption: "secret, public" },
        { id: 'b7', code: "    b = [sum(A[i][j] * s[j] for j in range(n)) % q for i in range(m)]", caption: "no error \u2014 solved by linear algebra", isDistractor: true },
      ],
    },
    {
      id: 'l6-1-s2',
      order: 2,
      title: "Encrypt a bit",
      instruction:
        "Assemble encryption: pick a random row subset, sum A's rows and b's entries, add m\u00b7\u230aq/2\u230b to the b-part.",
      expectedInput: "public key (A, b), message bit m, q",
      expectedOutput: "(u, v)",
      solution: ['b1', 'b2', 'b3', 'b4', 'b5'],
      blocks: [
        { id: 'b1', code: "def lwe_encrypt(A, b, bit, q):", caption: "signature" },
        { id: 'b2', code: "    rows = [i for i in range(len(A)) if secrets.randbelow(2)]", caption: "random subset of rows" },
        { id: 'b3', code: "    u = [sum(A[i][j] for i in rows) % q for j in range(len(A[0]))]", caption: "u = sum of chosen A-rows" },
        { id: 'b4', code: "    v = (sum(b[i] for i in rows) + bit * (q // 2)) % q", caption: "v = sum of b + message encoding" },
        { id: 'b5', code: "    return u, v", caption: "LWE ciphertext" },
        { id: 'b6', code: "    v = (sum(b[i] for i in rows) + bit) % q", caption: "encoding too small to survive noise", isDistractor: true },
      ],
    },
    {
      id: 'l6-1-s3',
      order: 3,
      title: "Decrypt by thresholding",
      instruction:
        "Assemble decryption: compute v \u2212 u\u00b7s; the result is near 0 for bit 0, near q/2 for bit 1.",
      expectedInput: "secret s, (u, v), q",
      expectedOutput: "decoded bit",
      solution: ['b1', 'b2', 'b3'],
      blocks: [
        { id: 'b1', code: "def lwe_decrypt(s, u, v, q):", caption: "signature" },
        { id: 'b2', code: "    w = (v - sum(u[j] * s[j] for j in range(len(s)))) % q", caption: "strip the mask \u2014 error remains" },
        { id: 'b3', code: "    return 1 if abs(w - q // 2) < q // 4 else 0", caption: "closer to q/2 \u2192 bit 1" },
        { id: 'b4', code: "    return 1 if w > q // 2 else 0", caption: "wrong threshold direction", isDistractor: true },
      ],
    },
  ],
};

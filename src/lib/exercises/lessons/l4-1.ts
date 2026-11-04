import type { LabExercise } from '../types';

// Lesson 4.1 — RSA Cryptosystem & Integer Factorization.
export const l4_1Exercise: LabExercise = {
  labSlug: 'rsa-cryptosystem-factorization',
  title: "RSA Keygen, Encrypt, Decrypt",
  intro:
    "Assemble textbook RSA end to end: key generation from two primes, encryption, and decryption \u2014 reusing extended Euclid and fast exponentiation.",
  steps: [
    {
      id: 'l4-1-s1',
      order: 1,
      title: "Key generation",
      instruction:
        "Assemble keygen: n = p\u00b7q, \u03c6 = (p\u22121)(q\u22121), d = e\u207b\u00b9 mod \u03c6.",
      expectedInput: "primes p, q; public exponent e",
      expectedOutput: "((n, e), (n, d))",
      solution: ['b1', 'b2', 'b3', 'b4', 'b5'],
      blocks: [
        { id: 'b1', code: "def rsa_keygen(p, q, e=65537):", caption: "signature" },
        { id: 'b2', code: "    n = p * q\n    phi = (p - 1) * (q - 1)", caption: "modulus and totient" },
        { id: 'b3', code: "    if math.gcd(e, phi) != 1:\n        raise ValueError(\"e not invertible mod phi\")", caption: "e must be a unit mod \u03c6" },
        { id: 'b4', code: "    d = pow(e, -1, phi)", caption: "private exponent = inverse" },
        { id: 'b5', code: "    return (n, e), (n, d)", caption: "public, private" },
        { id: 'b6', code: "    d = pow(e, -1, n)", caption: "inverts mod n instead of \u03c6", isDistractor: true },
      ],
    },
    {
      id: 'l4-1-s2',
      order: 2,
      title: "Encrypt",
      instruction:
        "Assemble encryption: c = m^e mod n with a range check on m.",
      expectedInput: "public key (n, e), integer m",
      expectedOutput: "ciphertext c",
      solution: ['b1', 'b2', 'b3', 'b4'],
      blocks: [
        { id: 'b1', code: "def rsa_encrypt(pub, m):", caption: "signature" },
        { id: 'b2', code: "    n, e = pub", caption: "unpack" },
        { id: 'b3', code: "    if not 0 <= m < n:\n        raise ValueError(\"message out of range\")", caption: "m must be a residue" },
        { id: 'b4', code: "    return pow(m, e, n)", caption: "m^e mod n" },
        { id: 'b5', code: "    return pow(m, e) % n", caption: "computes the huge power first", isDistractor: true },
      ],
    },
    {
      id: 'l4-1-s3',
      order: 3,
      title: "Decrypt",
      instruction:
        "Assemble decryption: m = c^d mod n \u2014 Euler's theorem guarantees the round trip.",
      expectedInput: "private key (n, d), ciphertext c",
      expectedOutput: "plaintext m",
      solution: ['b1', 'b2', 'b3'],
      blocks: [
        { id: 'b1', code: "def rsa_decrypt(priv, c):", caption: "signature" },
        { id: 'b2', code: "    n, d = priv", caption: "unpack" },
        { id: 'b3', code: "    return pow(c, d, n)", caption: "c^d = m^(ed) \u2261 m (mod n)" },
        { id: 'b4', code: "    return pow(c, n, d)", caption: "arguments swapped", isDistractor: true },
      ],
    },
  ],
};

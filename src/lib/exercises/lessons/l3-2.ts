import type { LabExercise } from '../types';

// Lesson 3.2 — Stream Ciphers & Pseudo-Random Generators.
export const l3_2Exercise: LabExercise = {
  labSlug: 'stream-ciphers-lfsr',
  title: "LFSR Keystream",
  intro:
    "Assemble a linear-feedback shift register, turn it into a keystream, and XOR-encrypt \u2014 then see why linearity is the weakness.",
  steps: [
    {
      id: 'l3-2-s1',
      order: 1,
      title: "LFSR step",
      instruction:
        "Assemble one LFSR clock: XOR the tapped bits into a feedback bit, shift it in, output the bit shifted out.",
      expectedInput: "state list of bits, tap indices",
      expectedOutput: "(output bit, new state)",
      solution: ['b1', 'b2', 'b3', 'b4'],
      blocks: [
        { id: 'b1', code: "def lfsr_step(state, taps):", caption: "signature" },
        { id: 'b2', code: "    fb = 0\n    for t in taps:\n        fb ^= state[t]", caption: "feedback = XOR of taps" },
        { id: 'b3', code: "    out = state[-1]", caption: "bit leaving the register" },
        { id: 'b4', code: "    return out, [fb] + state[:-1]", caption: "shift right, feedback enters left" },
        { id: 'b5', code: "    return out, state[:-1] + [fb]", caption: "shifts the wrong way", isDistractor: true },
      ],
    },
    {
      id: 'l3-2-s2',
      order: 2,
      title: "Keystream",
      instruction:
        "Assemble the keystream generator: clock the LFSR n times and collect output bits.",
      expectedInput: "seed state, taps, length n",
      expectedOutput: "list of n keystream bits",
      solution: ['b1', 'b2', 'b3', 'b4'],
      blocks: [
        { id: 'b1', code: "def keystream(state, taps, n):", caption: "signature" },
        { id: 'b2', code: "    bits = []", caption: "collector" },
        { id: 'b3', code: "    for _ in range(n):\n        b, state = lfsr_step(state, taps)\n        bits.append(b)", caption: "clock and record" },
        { id: 'b4', code: "    return bits", caption: "n bits" },
        { id: 'b5', code: "    for _ in range(n):\n        b, _ = lfsr_step(state, taps)\n        bits.append(b)", caption: "never advances state \u2014 constant stream", isDistractor: true },
      ],
    },
    {
      id: 'l3-2-s3',
      order: 3,
      title: "XOR encrypt",
      instruction:
        "Assemble stream encryption: XOR plaintext bits with keystream bits. Decryption is the same call.",
      expectedInput: "plaintext bits, seed, taps",
      expectedOutput: "ciphertext bits",
      solution: ['b1', 'b2', 'b3'],
      blocks: [
        { id: 'b1', code: "def stream_xor(bits, seed, taps):", caption: "signature" },
        { id: 'b2', code: "    ks = keystream(seed, taps, len(bits))", caption: "matching-length keystream" },
        { id: 'b3', code: "    return [p ^ k for p, k in zip(bits, ks)]", caption: "XOR \u2014 self-inverse" },
        { id: 'b4', code: "    return [p & k for p, k in zip(bits, ks)]", caption: "AND destroys information", isDistractor: true },
      ],
    },
  ],
};

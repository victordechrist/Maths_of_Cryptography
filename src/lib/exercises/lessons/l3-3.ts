import type { LabExercise } from '../types';

// Lesson 3.3 — Block Ciphers & Modern AES Mathematics.
export const l3_3Exercise: LabExercise = {
  labSlug: 'block-ciphers-aes-math',
  title: "AES Round Building Blocks",
  intro:
    "Assemble three AES layers on a 4\u00d74 byte state: xtime (multiply by x in GF(2^8)), MixColumns on one column, and AddRoundKey.",
  steps: [
    {
      id: 'l3-3-s1',
      order: 1,
      title: "xtime",
      instruction:
        "Assemble multiply-by-x in GF(2^8): shift left, and if the high bit overflowed, reduce by 0x1B.",
      expectedInput: "byte b",
      expectedOutput: "b\u00b7x mod (x^8+x^4+x^3+x+1)",
      solution: ['b1', 'b2', 'b3', 'b4'],
      blocks: [
        { id: 'b1', code: "def xtime(b):", caption: "signature" },
        { id: 'b2', code: "    b <<= 1", caption: "multiply by x" },
        { id: 'b3', code: "    if b & 0x100:\n        b ^= 0x11B", caption: "overflow \u2192 reduce by the AES polynomial" },
        { id: 'b4', code: "    return b & 0xFF", caption: "keep one byte" },
        { id: 'b5', code: "    if b & 0x80:\n        b ^= 0x1B", caption: "checks the wrong bit after shifting", isDistractor: true },
      ],
    },
    {
      id: 'l3-3-s2',
      order: 2,
      title: "MixColumn",
      instruction:
        "Assemble one MixColumns column: each output byte is 2\u00b7a \u2295 3\u00b7b \u2295 c \u2295 d in rotating order.",
      expectedInput: "column [a0, a1, a2, a3]",
      expectedOutput: "mixed column",
      solution: ['b1', 'b2', 'b3', 'b4'],
      blocks: [
        { id: 'b1', code: "def mix_column(col):", caption: "signature" },
        { id: 'b2', code: "    a = col\n    m2 = [xtime(x) for x in a]", caption: "2\u00b7a_i via xtime" },
        { id: 'b3', code: "    m3 = [m2[i] ^ a[i] for i in range(4)]", caption: "3\u00b7a_i = 2\u00b7a_i \u2295 a_i" },
        { id: 'b4', code: "    return [\n        m2[0] ^ m3[1] ^ a[2] ^ a[3],\n        a[0] ^ m2[1] ^ m3[2] ^ a[3],\n        a[0] ^ a[1] ^ m2[2] ^ m3[3],\n        m3[0] ^ a[1] ^ a[2] ^ m2[3],\n    ]", caption: "circulant [2 3 1 1] matrix" },
        { id: 'b5', code: "    m3 = [m2[i] + a[i] for i in range(4)]", caption: "integer add, not field add", isDistractor: true },
      ],
    },
    {
      id: 'l3-3-s3',
      order: 3,
      title: "AddRoundKey",
      instruction:
        "Assemble AddRoundKey: XOR every state byte with the matching round-key byte.",
      expectedInput: "4\u00d74 state, 4\u00d74 round key",
      expectedOutput: "keyed state",
      solution: ['b1', 'b2'],
      blocks: [
        { id: 'b1', code: "def add_round_key(state, rk):", caption: "signature" },
        { id: 'b2', code: "    return [[state[r][c] ^ rk[r][c] for c in range(4)] for r in range(4)]", caption: "bytewise XOR" },
        { id: 'b3', code: "    return [[state[r][c] ^ rk[c][r] for c in range(4)] for r in range(4)]", caption: "transposed key", isDistractor: true },
      ],
    },
  ],
};

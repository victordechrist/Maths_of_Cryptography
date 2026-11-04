import type { LabExercise } from '../types';

// Lesson 3.4 — Hash Functions & Message Authentication.
export const l3_4Exercise: LabExercise = {
  labSlug: 'hash-functions-mac',
  title: "HMAC from a Hash",
  intro:
    "Assemble HMAC-SHA256 from hashlib primitives: key normalization, inner/outer padding, and constant-time verification.",
  steps: [
    {
      id: 'l3-4-s1',
      order: 1,
      title: "Normalize the key",
      instruction:
        "Assemble key prep: hash keys longer than the block size, then zero-pad to exactly 64 bytes.",
      expectedInput: "key bytes",
      expectedOutput: "64-byte block key",
      solution: ['b1', 'b2', 'b3'],
      blocks: [
        { id: 'b1', code: "def block_key(key):", caption: "signature" },
        { id: 'b2', code: "    if len(key) > 64:\n        key = hashlib.sha256(key).digest()", caption: "long keys hashed down" },
        { id: 'b3', code: "    return key + b'\\x00' * (64 - len(key))", caption: "zero-pad to block size" },
        { id: 'b4', code: "    return key[:32]", caption: "truncates instead of padding", isDistractor: true },
      ],
    },
    {
      id: 'l3-4-s2',
      order: 2,
      title: "Inner/outer hash",
      instruction:
        "Assemble HMAC: H((K \u2295 opad) \u2016 H((K \u2295 ipad) \u2016 m)).",
      expectedInput: "key, message",
      expectedOutput: "32-byte tag",
      solution: ['b1', 'b2', 'b3', 'b4', 'b5'],
      blocks: [
        { id: 'b1', code: "def hmac_sha256(key, msg):", caption: "signature" },
        { id: 'b2', code: "    k = block_key(key)", caption: "normalized key" },
        { id: 'b3', code: "    ipad = bytes(b ^ 0x36 for b in k)\n    opad = bytes(b ^ 0x5C for b in k)", caption: "two derived keys" },
        { id: 'b4', code: "    inner = hashlib.sha256(ipad + msg).digest()", caption: "inner hash binds the message" },
        { id: 'b5', code: "    return hashlib.sha256(opad + inner).digest()", caption: "outer hash seals it" },
        { id: 'b6', code: "    return hashlib.sha256(k + msg).digest()", caption: "naive H(K\u2016m) \u2014 length-extension vulnerable", isDistractor: true },
      ],
    },
    {
      id: 'l3-4-s3',
      order: 3,
      title: "Constant-time verify",
      instruction:
        "Assemble verification: recompute the tag and compare without leaking timing.",
      expectedInput: "key, message, received tag",
      expectedOutput: "True iff tag is valid",
      solution: ['b1', 'b2', 'b3'],
      blocks: [
        { id: 'b1', code: "def verify(key, msg, tag):", caption: "signature" },
        { id: 'b2', code: "    expected = hmac_sha256(key, msg)", caption: "recompute" },
        { id: 'b3', code: "    return hmac.compare_digest(expected, tag)", caption: "constant-time equality" },
        { id: 'b4', code: "    return expected == tag", caption: "early-exit compare leaks timing", isDistractor: true },
      ],
    },
  ],
};

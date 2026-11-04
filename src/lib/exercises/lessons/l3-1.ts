import type { LabExercise } from '../types';

// Lesson 3.1 — Classical Ciphers & Cryptanalysis.
export const l3_1Exercise: LabExercise = {
  labSlug: 'classical-ciphers-cryptanalysis',
  title: "Breaking Caesar by Frequency",
  intro:
    "Assemble a ciphertext-only attack: shift encryption, letter-frequency scoring, and a brute-force key search ranked by chi-squared fit to English.",
  steps: [
    {
      id: 'l3-1-s1',
      order: 1,
      title: "Shift cipher",
      instruction:
        "Assemble Caesar encryption over A\u2013Z: shift each letter by k mod 26, leave other characters alone.",
      expectedInput: "plaintext string, key k",
      expectedOutput: "shifted ciphertext",
      solution: ['b1', 'b2', 'b3', 'b4', 'b5', 'b6'],
      blocks: [
        { id: 'b1', code: "def shift(text, k):", caption: "signature" },
        { id: 'b2', code: "    out = []", caption: "output buffer" },
        { id: 'b3', code: "    for ch in text.upper():", caption: "walk uppercase characters" },
        { id: 'b4', code: "        if ch.isalpha():\n            out.append(chr((ord(ch) - 65 + k) % 26 + 65))", caption: "rotate inside A\u2013Z" },
        { id: 'b5', code: "        else:\n            out.append(ch)", caption: "pass through punctuation/spaces" },
        { id: 'b6', code: "    return ''.join(out)", caption: "assemble" },
        { id: 'b7', code: "            out.append(chr(ord(ch) + k))", caption: "no wrap \u2014 leaves the alphabet", isDistractor: true },
      ],
    },
    {
      id: 'l3-1-s2',
      order: 2,
      title: "Chi-squared score",
      instruction:
        "Assemble the English-fit score: compare observed letter counts to expected English frequencies (lower is better).",
      expectedInput: "candidate text, ENGLISH frequency table (26 floats)",
      expectedOutput: "chi-squared statistic",
      solution: ['b1', 'b2', 'b3', 'b4'],
      blocks: [
        { id: 'b1', code: "def chi2(text, ENGLISH):", caption: "signature" },
        { id: 'b2', code: "    letters = [c for c in text if c.isalpha()]\n    n = len(letters) or 1", caption: "count usable letters" },
        { id: 'b3', code: "    counts = [letters.count(chr(65 + i)) for i in range(26)]", caption: "observed counts A\u2013Z" },
        { id: 'b4', code: "    return sum((counts[i] - n * ENGLISH[i]) ** 2 / (n * ENGLISH[i]) for i in range(26))", caption: "\u03a3 (obs \u2212 exp)\u00b2 / exp" },
        { id: 'b5', code: "    return sum(counts[i] - n * ENGLISH[i] for i in range(26))", caption: "signed sum cancels out", isDistractor: true },
      ],
    },
    {
      id: 'l3-1-s3',
      order: 3,
      title: "Key search",
      instruction:
        "Assemble the attack: try all 26 shifts, decrypt, and keep the key whose plaintext scores best.",
      expectedInput: "ciphertext, ENGLISH table",
      expectedOutput: "(best_key, plaintext)",
      solution: ['b1', 'b2', 'b3', 'b4', 'b5', 'b6'],
      blocks: [
        { id: 'b1', code: "def crack(cipher, ENGLISH):", caption: "signature" },
        { id: 'b2', code: "    best = None", caption: "no candidate yet" },
        { id: 'b3', code: "    for k in range(26):", caption: "exhaustive keyspace \u2014 only 26" },
        { id: 'b4', code: "        plain = shift(cipher, -k)\n        score = chi2(plain, ENGLISH)", caption: "decrypt + score" },
        { id: 'b5', code: "        if best is None or score < best[0]:\n            best = (score, k, plain)", caption: "keep the lowest chi\u00b2" },
        { id: 'b6', code: "    return best[1], best[2]", caption: "key and plaintext" },
        { id: 'b7', code: "        if best is None or score > best[0]:", caption: "keeps the WORST fit", isDistractor: true },
      ],
    },
  ],
};

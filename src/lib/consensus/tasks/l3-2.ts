import type { LabTask } from '../types';

// Lesson 3.2 — Stream Ciphers & Pseudo-Random Generators.
export const l3_2Task: LabTask = {
  labSlug: 'stream-ciphers-lfsr',
  title: "Why Stream Ciphers Need Nonlinearity",
  brief:
    "Argue from the one-time pad to modern stream ciphers: XOR with true randomness is perfectly secret, PRGs trade that for practicality, and a linear PRG like a bare LFSR collapses to Berlekamp\u2013Massey.",
  scenes: [
    {
      id: 'scene-l3-2-1',
      order: 1,
      title: "One-time pad ideal",
      narration:
        "XOR with a truly random, never-reused key of message length gives perfect secrecy: every plaintext is equally likely given the ciphertext. Its cost \u2014 key as long as the data, delivered securely \u2014 makes it impractical at scale.",
      goal: "Commit what makes the OTP perfectly secret, and why it can't be deployed broadly.",
      goldNodeIds: ['s1', 'x1', 'x2'],
      elicitation: 'code-cell',
      hints: [
        "Uniform key \u21d2 uniform ciphertext regardless of plaintext.",
        "Key reuse breaks it: c1 \u2295 c2 = p1 \u2295 p2."
      ],
    },
    {
      id: 'scene-l3-2-2',
      order: 2,
      title: "PRGs stretch a seed",
      narration:
        "A pseudo-random generator stretches a short seed into a long keystream. Security becomes computational: no efficient test should tell the keystream from random. Never reuse a (key, nonce) pair \u2014 same keystream twice is the OTP reuse disaster.",
      goal: "Commit the trade: short key for computational (not perfect) secrecy, plus the nonce-reuse rule.",
      goldNodeIds: ['s2', 'x3', 'x4'],
      elicitation: 'code-cell',
      hints: [
        "Indistinguishability from random is the security definition.",
        "Nonces make every keystream unique under one key."
      ],
    },
    {
      id: 'scene-l3-2-3',
      order: 3,
      title: "Linearity kills LFSRs",
      narration:
        "An n-bit LFSR's output satisfies a linear recurrence. Berlekamp\u2013Massey recovers the taps and state from just 2n output bits \u2014 known plaintext reveals keystream, keystream reveals everything. Real ciphers add nonlinear filtering/combining (or use ChaCha's ARX design).",
      goal: "Commit the attack and the fix: why 2n bits suffice, and what nonlinearity changes.",
      goldNodeIds: ['s3', 'x5', 'x6'],
      elicitation: 'code-cell',
      hints: [
        "Linear recurrence \u21d2 solvable linear system.",
        "Nonlinear combiners raise linear complexity far above n."
      ],
    },
  ],
  goldTree: {
    labSlug: 'stream-ciphers-lfsr',
    rootId: 'g1',
    version: 1,
    prunedNodeIds: [],
    activePath: ['g1', 's1', 's2', 's3', 'x1', 'x2', 'x3', 'x4', 'x5', 'x6'],
    nodes: [
      { id: 'g1', label: "Trace OTP \u2192 PRG \u2192 nonlinear stream ciphers",
        content: "Perfect secrecy is impractical; PRGs approximate it; linearity breaks them.",
        kind: 'goal', status: 'confirmed', parentId: null },
      { id: 's1', label: "OTP is perfect but impractical",
        content: "Random key XOR gives perfect secrecy at full-length key cost.",
        kind: 'subgoal', status: 'confirmed' },
      { id: 's2', label: "PRG gives computational secrecy",
        content: "Short seed stretched; security = indistinguishability; never reuse nonce.",
        kind: 'subgoal', status: 'confirmed' },
      { id: 's3', label: "Linear PRGs fall",
        content: "LFSR state recovered from 2n bits via Berlekamp\u2013Massey.",
        kind: 'subgoal', status: 'confirmed' },
      { id: 'x1', label: "Uniform ciphertext",
        content: "Uniform random key makes every plaintext equally consistent with c.",
        kind: 'operator', status: 'confirmed' },
      { id: 'x2', label: "Reuse leaks p1\u2295p2",
        content: "Two messages under one pad cancel the key.",
        kind: 'evidence', status: 'confirmed' },
      { id: 'x3', label: "Indistinguishability",
        content: "No efficient test separates keystream from random bits.",
        kind: 'operator', status: 'confirmed' },
      { id: 'x4', label: "Nonce uniqueness",
        content: "Distinct nonce per message prevents keystream reuse.",
        kind: 'evidence', status: 'confirmed' },
      { id: 'x5', label: "Berlekamp\u2013Massey",
        content: "Recovers an n-bit LFSR from 2n consecutive output bits.",
        kind: 'evidence', status: 'confirmed' },
      { id: 'x6', label: "Nonlinear combining",
        content: "Filters/combiners or ARX designs push linear complexity out of reach.",
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

import type { LabTask } from '../types';

// Lesson 3.1 — Classical Ciphers & Cryptanalysis.
export const l3_1Task: LabTask = {
  labSlug: 'classical-ciphers-cryptanalysis',
  title: "Why Classical Ciphers Fall",
  brief:
    "Argue the three lessons classical cryptanalysis taught modern design: tiny keyspaces die to brute force, substitution preserves statistics, and security must rest on the key alone (Kerckhoffs).",
  scenes: [
    {
      id: 'scene-l3-1-1',
      order: 1,
      title: "Keyspace size",
      narration:
        "Caesar has 26 keys; an attacker tries them all in microseconds. Even a full monoalphabetic substitution (26! \u2248 2^88 keys) is beaten \u2014 so keyspace size is necessary but not sufficient.",
      goal: "Commit why a small keyspace is fatal, and why a large one alone is not enough.",
      goldNodeIds: ['s1', 'x1', 'x2'],
      elicitation: 'code-cell',
      hints: [
        "26 keys = trivial exhaustive search.",
        "2^88 keys still falls \u2014 see the next scene for why."
      ],
    },
    {
      id: 'scene-l3-1-2',
      order: 2,
      title: "Statistics leak",
      narration:
        "Substitution maps each letter to one fixed letter, so ciphertext frequencies are a permutation of plaintext frequencies. E, T, A still dominate \u2014 the attacker reads the key off a histogram without ever searching the keyspace.",
      goal: "Commit the mechanism: one-to-one substitution preserves the frequency distribution.",
      goldNodeIds: ['s2', 'x3', 'x4'],
      elicitation: 'code-cell',
      hints: [
        "The histogram shape survives encryption; only the labels move.",
        "Vigen\u00e8re tries to flatten it \u2014 Kasiski/IC recover the period."
      ],
    },
    {
      id: 'scene-l3-1-3',
      order: 3,
      title: "Kerckhoffs's principle",
      narration:
        "Classical systems hid the algorithm. Once captured, the whole system fell. Kerckhoffs: assume the enemy knows the method; only the key is secret. Every modern cipher is public \u2014 AES survives full public scrutiny.",
      goal: "Commit why secrecy must rest on the key, and what public scrutiny buys.",
      goldNodeIds: ['s3', 'x5', 'x6'],
      elicitation: 'code-cell',
      hints: [
        "Algorithms leak; keys can be rotated.",
        "Public review is how weaknesses are found before attackers find them."
      ],
    },
  ],
  goldTree: {
    labSlug: 'classical-ciphers-cryptanalysis',
    rootId: 'g1',
    version: 1,
    prunedNodeIds: [],
    activePath: ['g1', 's1', 's2', 's3', 'x1', 'x2', 'x3', 'x4', 'x5', 'x6'],
    nodes: [
      { id: 'g1', label: "Extract design lessons from classical breaks",
        content: "Small keyspaces, preserved statistics, and hidden algorithms all fail.",
        kind: 'goal', status: 'confirmed', parentId: null },
      { id: 's1', label: "Keyspace must be large",
        content: "Exhaustive search kills small keyspaces \u2014 but size alone is insufficient.",
        kind: 'subgoal', status: 'confirmed' },
      { id: 's2', label: "Output must hide statistics",
        content: "Substitution preserves letter frequencies \u2192 histogram attack.",
        kind: 'subgoal', status: 'confirmed' },
      { id: 's3', label: "Only the key is secret",
        content: "Kerckhoffs: the algorithm is assumed public.",
        kind: 'subgoal', status: 'confirmed' },
      { id: 'x1', label: "26 keys brute-force instantly",
        content: "Caesar's keyspace is exhausted in microseconds.",
        kind: 'evidence', status: 'confirmed' },
      { id: 'x2', label: "26! still falls",
        content: "2^88 keys but broken by statistics, not search.",
        kind: 'evidence', status: 'confirmed' },
      { id: 'x3', label: "Frequencies are permuted, not hidden",
        content: "Ciphertext histogram = relabeled plaintext histogram.",
        kind: 'operator', status: 'confirmed' },
      { id: 'x4', label: "Chi-squared ranks keys",
        content: "Scoring against English picks the right key automatically.",
        kind: 'evidence', status: 'confirmed' },
      { id: 'x5', label: "Algorithms leak",
        content: "Captured devices/specs expose the method \u2014 keys can be changed, algorithms can't.",
        kind: 'evidence', status: 'confirmed' },
      { id: 'x6', label: "Public scrutiny",
        content: "Open designs like AES survive expert attack \u2014 security by review, not obscurity.",
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

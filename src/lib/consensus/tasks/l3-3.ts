import type { LabTask } from '../types';

// Lesson 3.3 — Block Ciphers & Modern AES Mathematics.
export const l3_3Task: LabTask = {
  labSlug: 'block-ciphers-aes-math',
  title: "Why AES Is Built This Way",
  brief:
    "Argue Shannon's confusion and diffusion through AES's layers: the S-box supplies nonlinearity, ShiftRows + MixColumns spread every byte across the state within two rounds, and AddRoundKey is the only place the key enters.",
  scenes: [
    {
      id: 'scene-l3-3-1',
      order: 1,
      title: "Confusion: the S-box",
      narration:
        "SubBytes replaces each byte by its GF(2^8) inverse then an affine map. This is the only nonlinear step in AES \u2014 without it the whole cipher would be a linear map solvable by Gaussian elimination.",
      goal: "Commit why AES needs exactly one strongly nonlinear layer and where it comes from.",
      goldNodeIds: ['s1', 'x1', 'x2'],
      elicitation: 'code-cell',
      hints: [
        "Linear cipher \u21d2 key recovery by linear algebra.",
        "Field inversion has optimal differential/linear properties."
      ],
    },
    {
      id: 'scene-l3-3-2',
      order: 2,
      title: "Diffusion: ShiftRows + MixColumns",
      narration:
        "ShiftRows moves bytes across columns; MixColumns mixes each column via an MDS matrix \u2014 changing one input byte changes all four outputs. After two rounds, every output byte depends on every input byte (the wide-trail strategy).",
      goal: "Commit how the two linear layers achieve full diffusion and why the MDS property matters.",
      goldNodeIds: ['s2', 'x3', 'x4'],
      elicitation: 'code-cell',
      hints: [
        "MDS branch number 5: active bytes in + out \u2265 5.",
        "Two rounds = full avalanche across 16 bytes."
      ],
    },
    {
      id: 'scene-l3-3-3',
      order: 3,
      title: "Key schedule & rounds",
      narration:
        "AddRoundKey XORs a fresh round key each round \u2014 the only key contact. Ten rounds (AES-128) give a wide margin over the best known attacks on reduced-round variants (~7 rounds).",
      goal: "Commit where the key enters and why the round count is set with a margin.",
      goldNodeIds: ['s3', 'x5', 'x6'],
      elicitation: 'code-cell',
      hints: [
        "Without key mixing, the rest is a public permutation.",
        "Security margin = full rounds \u2212 best attacked rounds."
      ],
    },
  ],
  goldTree: {
    labSlug: 'block-ciphers-aes-math',
    rootId: 'g1',
    version: 1,
    prunedNodeIds: [],
    activePath: ['g1', 's1', 's2', 's3', 'x1', 'x2', 'x3', 'x4', 'x5', 'x6'],
    nodes: [
      { id: 'g1', label: "Explain AES's layered design",
        content: "Confusion from S-box, diffusion from ShiftRows/MixColumns, key via AddRoundKey with round margin.",
        kind: 'goal', status: 'confirmed', parentId: null },
      { id: 's1', label: "S-box gives confusion",
        content: "The sole nonlinear layer \u2014 GF(2^8) inversion + affine map.",
        kind: 'subgoal', status: 'confirmed' },
      { id: 's2', label: "Linear layers give diffusion",
        content: "ShiftRows + MDS MixColumns spread every byte in two rounds.",
        kind: 'subgoal', status: 'confirmed' },
      { id: 's3', label: "Rounds + key schedule",
        content: "Round keys enter via XOR; round count leaves a security margin.",
        kind: 'subgoal', status: 'confirmed' },
      { id: 'x1', label: "Linear ciphers are solvable",
        content: "Without nonlinearity the cipher is a matrix \u2014 Gaussian elimination breaks it.",
        kind: 'evidence', status: 'confirmed' },
      { id: 'x2', label: "Inversion is optimal",
        content: "x\u207b\u00b9 in GF(2^8) minimizes differential and linear bias.",
        kind: 'operator', status: 'confirmed' },
      { id: 'x3', label: "MDS branch number 5",
        content: "One changed byte affects all four column outputs.",
        kind: 'operator', status: 'confirmed' },
      { id: 'x4', label: "Full avalanche in 2 rounds",
        content: "Wide-trail design guarantees every byte depends on every input byte.",
        kind: 'evidence', status: 'confirmed' },
      { id: 'x5', label: "AddRoundKey is the key contact",
        content: "XOR of round key each round binds the permutation to the key.",
        kind: 'operator', status: 'confirmed' },
      { id: 'x6', label: "10 rounds vs ~7 attacked",
        content: "AES-128 keeps a margin over the best reduced-round attacks.",
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

import type { LabExercise } from '../types';

// Lesson 1.2 — Modular Arithmetic & Congruences.
// Solutions concatenate into valid Python (stdlib only).
export const l1_2Exercise: LabExercise = {
  labSlug: 'modular-arithmetic-congruences',
  title: 'Modular Arithmetic in Code',
  intro:
    'Assemble the three workhorses of modular computation: the square-and-multiply loop, a well-reduced addition helper, and the linear-congruence solver.',
  steps: [
    {
      id: 'l1-2-s1',
      order: 1,
      title: 'Square-and-multiply',
      instruction:
        'Build modular_pow — O(log e) modular exponentiation from binary decomposition of the exponent. This is the loop that makes g^e mod m computable on thousand-bit integers.',
      expectedInput: 'base, exponent, modulus',
      expectedOutput: '(base ** exponent) % modulus in O(log exponent) multiplications',
      solution: ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7'],
      blocks: [
        { id: 'b1', code: 'def modular_pow(base, exponent, modulus):', caption: 'signature' },
        {
          id: 'b2',
          code: '    result = 1\n    base = base % modulus',
          caption: 'seed accumulator, shrink the base first',
        },
        { id: 'b3', code: '    while exponent > 0:', caption: 'one round per bit' },
        {
          id: 'b4',
          code: '        if exponent % 2 == 1:\n            result = (result * base) % modulus',
          caption: 'set bit → fold current base into result',
        },
        {
          id: 'b5',
          code: '        exponent = exponent // 2',
          caption: 'shift right — next bit',
        },
        {
          id: 'b6',
          code: '        base = (base * base) % modulus',
          caption: 'square the BASE for the next bit position',
        },
        { id: 'b7', code: '    return result', caption: 'accumulated power mod m' },
        {
          id: 'b8',
          code: '        result = (result * result) % modulus',
          caption: 'squaring the RESULT — doubles the exponent coverage wrongly',
          isDistractor: true,
        },
      ],
    },
    {
      id: 'l1-2-s2',
      order: 2,
      title: 'Well-defined modular addition',
      instruction:
        'Build add_mod — the whole point of ℤ_m is that you may reduce ANY representative. Reduce both operands first so intermediates stay small.',
      expectedInput: 'two residues a, b and modulus m',
      expectedOutput: '(a + b) % m with both operands reduced first',
      solution: ['b1', 'b2', 'b3'],
      blocks: [
        { id: 'b1', code: 'def add_mod(a, b, m):', caption: 'signature' },
        {
          id: 'b2',
          code: '    return ((a % m) + (b % m)) % m',
          caption: 'reduce both operands, then reduce the sum',
        },
        {
          id: 'b3',
          code: '# (a % m) and (a + km) % m give the same class — reduction is free',
          caption: 'representative-independence comment',
        },
        {
          id: 'b4',
          code: '    return a + b % m',
          caption: 'precedence trap — only b gets reduced, a stays huge',
          isDistractor: true,
        },
      ],
    },
    {
      id: 'l1-2-s3',
      order: 3,
      title: 'Solve ax ≡ b (mod m)',
      instruction:
        'Assemble the linear-congruence solver — a linear congruence divides by a ONLY via its modular inverse, and only when the gcd allows it.',
      expectedInput: 'coefficient a, right side b, modulus m',
      expectedOutput: 'all solutions x, or a signal that none exist',
      solution: ['b1', 'b2', 'b3', 'b4', 'b5'],
      blocks: [
        { id: 'b1', code: 'def solve_linear(a, b, m):', caption: 'signature' },
        {
          id: 'b2',
          code: '    g = math.gcd(a, m)\n    if b % g != 0:\n        return []',
          caption: 'solvable iff gcd(a,m) divides b',
        },
        {
          id: 'b3',
          code: '    a_, b_, m_ = a // g, b // g, m // g',
          caption: 'divide through — reduced congruence has gcd 1',
        },
        {
          id: 'b4',
          code: '    x0 = (b_ * pow(a_, -1, m_)) % m_',
          caption: 'multiply by the modular inverse of a',
        },
        {
          id: 'b5',
          code: '    return [(x0 + k * m_) % m for k in range(g)]',
          caption: 'g distinct solutions spaced m/g apart',
        },
        {
          id: 'b6',
          code: '    x = (b // a) % m',
          caption: 'integer division — congruences invert, not divide',
          isDistractor: true,
        },
      ],
    },
  ],
};

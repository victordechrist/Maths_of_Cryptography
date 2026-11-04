import type { LabExercise } from '../types';

// Lesson 1.4 — Chinese Remainder Theorem & Modular Systems.
// Solutions concatenate into valid Python (stdlib only).
export const l1_4Exercise: LabExercise = {
  labSlug: 'chinese-remainder-theorem',
  title: 'CRT Reconstruction',
  intro:
    'Assemble the two-modulus CRT solver: the Bézout combination, the explicit reconstruction formula, and the uniqueness check mod the product.',
  steps: [
    {
      id: 'l1-4-s1',
      order: 1,
      title: 'Coprimality precondition',
      instruction:
        'Assemble the guard that verifies gcd(m1, m2) = 1 — CRT only promises a unique solution for coprime moduli.',
      expectedInput: 'moduli m1, m2',
      expectedOutput: 'raises ValueError unless gcd(m1, m2) == 1',
      solution: ['b1', 'b2', 'b3', 'b4'],
      blocks: [
        { id: 'b1', code: 'def check_coprime(m1, m2):', caption: 'signature' },
        { id: 'b2', code: '    g = math.gcd(m1, m2)', caption: 'stdlib gcd' },
        { id: 'b3', code: '    if g != 1:', caption: 'moduli share a factor' },
        { id: 'b4', code: '        raise ValueError("moduli must be coprime")', caption: 'reject — solution may not exist' },
        { id: 'b5', code: '    if g == 1:\n        raise ValueError("moduli must be coprime")', caption: 'rejects the good case', isDistractor: true },
      ],
    },
    {
      id: 'l1-4-s2',
      order: 2,
      title: 'Bézout combine',
      instruction:
        'Assemble the reconstruction: from m1·x + m2·y = 1, the solution is a1·m2·y + a2·m1·x.',
      expectedInput: 'residues a1, a2; coprime moduli m1, m2',
      expectedOutput: 'x with x ≡ a1 (mod m1), x ≡ a2 (mod m2)',
      solution: ['b1', 'b2', 'b3', 'b4', 'b5', 'b6'],
      blocks: [
        { id: 'b1', code: 'def crt2(a1, m1, a2, m2):', caption: 'signature' },
        { id: 'b2', code: '    check_coprime(m1, m2)', caption: 'precondition' },
        { id: 'b3', code: '    g, x, y = extended_gcd(m1, m2)', caption: 'm1·x + m2·y = 1' },
        { id: 'b4', code: '    M = m1 * m2', caption: 'combined modulus' },
        { id: 'b5', code: '    sol = (a1 * m2 * y + a2 * m1 * x) % M', caption: 'Bézout-weighted reconstruction' },
        { id: 'b6', code: '    return sol', caption: 'unique residue mod m1·m2' },
        { id: 'b7', code: '    sol = (a1 * m1 * x + a2 * m2 * y) % M', caption: 'residue–modulus pairing swapped', isDistractor: true },
      ],
    },
    {
      id: 'l1-4-s3',
      order: 3,
      title: 'Verify the answer',
      instruction:
        'Assemble the self-check driver: solve, then assert both congruences hold before returning.',
      expectedInput: 'residue/modulus pairs',
      expectedOutput: 'verified CRT solution',
      solution: ['b1', 'b2', 'b3', 'b4'],
      blocks: [
        { id: 'b1', code: 'def solve_and_verify(a1, m1, a2, m2):', caption: 'signature' },
        { id: 'b2', code: '    sol = crt2(a1, m1, a2, m2)', caption: 'reconstruct' },
        { id: 'b3', code: '    assert sol % m1 == a1 % m1', caption: 'check first congruence' },
        { id: 'b4', code: '    assert sol % m2 == a2 % m2\n    return sol', caption: 'check second, return' },
        { id: 'b5', code: '    assert sol % m1 == a2 % m1', caption: 'crossed residues', isDistractor: true },
      ],
    },
  ],
};

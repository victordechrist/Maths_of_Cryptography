import type { LabExercise } from '../types';

// Lesson 1.1 — Divisibility & the Euclidean Algorithm.
// Solutions concatenate into valid Python (stdlib only).
export const l1_1Exercise: LabExercise = {
  labSlug: 'divisibility-euclidean-algorithm',
  title: 'The Extended Euclidean Algorithm',
  intro:
    'Build the machinery behind every modular inverse: the extended Euclidean loop, the inverse extraction, and the Bézout check that proves it works.',
  steps: [
    {
      id: 'l1-1-s1',
      order: 1,
      title: 'Extended GCD loop',
      instruction:
        'Assemble extended_gcd: track the remainder chain AND the coefficient chains — every row keeps a·x + b·y = r invariant.',
      expectedInput: 'two integers a, b (a > b > 0)',
      expectedOutput: '(gcd, x, y) such that a·x + b·y = gcd(a, b)',
      solution: ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8'],
      blocks: [
        { id: 'b1', code: 'def extended_gcd(a, b):', caption: 'signature' },
        {
          id: 'b2',
          code: '    r_old, r = a, b\n    x_old, x = 1, 0\n    y_old, y = 0, 1',
          caption: 'seed the Bézout coefficients',
        },
        { id: 'b3', code: '    while r != 0:', caption: 'loop until remainder 0' },
        {
          id: 'b4',
          code: '        q = r_old // r',
          caption: 'quotient of this division round',
        },
        {
          id: 'b5',
          code: '        r_old, r = r, r_old - q * r',
          caption: 'advance the remainder chain (tuple swap keeps it atomic)',
        },
        {
          id: 'b6',
          code: '        x_old, x = x, x_old - q * x',
          caption: 'carry x coefficients',
        },
        {
          id: 'b7',
          code: '        y_old, y = y, y_old - q * y',
          caption: 'carry y coefficients',
        },
        {
          id: 'b8',
          code: '    return r_old, x_old, y_old',
          caption: 'gcd + Bézout pair',
        },
        {
          id: 'b9',
          code: '        r = r_old - q * r\n        r_old = r',
          caption: 'sequential assigns — r_old reads the stale r',
          isDistractor: true,
        },
      ],
    },
    {
      id: 'l1-1-s2',
      order: 2,
      title: 'Modular inverse extraction',
      instruction:
        'Assemble mod_inverse: an inverse of a mod m exists only when gcd(a, m) = 1 — the extended run gives both the check and the coefficient.',
      expectedInput: 'value a, modulus m',
      expectedOutput: 'a⁻¹ mod m, or None when a and m are not coprime',
      solution: ['b1', 'b2', 'b3', 'b4'],
      blocks: [
        { id: 'b1', code: 'def mod_inverse(a, m):', caption: 'signature' },
        {
          id: 'b2',
          code: '    g, x, _ = extended_gcd(a, m)',
          caption: 'one extended run does both jobs',
        },
        {
          id: 'b3',
          code: '    if g != 1:\n        return None',
          caption: 'coprime guard — no inverse without gcd 1',
        },
        {
          id: 'b4',
          code: '    return x % m',
          caption: 'normalize the coefficient into [0, m)',
        },
        {
          id: 'b5',
          code: '    return x',
          caption: 'raw coefficient — can be negative, and skips the coprime check',
          isDistractor: true,
        },
      ],
    },
    {
      id: 'l1-1-s3',
      order: 3,
      title: 'Bézout verification',
      instruction:
        'Assemble the self-check: the coefficients the algorithm returns must reproduce the gcd — that identity is the whole point.',
      expectedInput: 'a, b and the extended_gcd result (g, x, y)',
      expectedOutput: 'a proof that a·x + b·y = gcd(a, b)',
      solution: ['b1', 'b2', 'b3'],
      blocks: [
        {
          id: 'b1',
          code: 'g, x, y = extended_gcd(a, b)',
          caption: 'run the algorithm',
        },
        {
          id: 'b2',
          code: 'assert a * x + b * y == g',
          caption: 'the Bézout identity holds',
        },
        {
          id: 'b3',
          code: 'assert g == math.gcd(a, b)',
          caption: 'and it really is the gcd',
        },
        {
          id: 'b4',
          code: 'assert a * x - b * y == g',
          caption: 'sign flip — proves a different (wrong) identity',
          isDistractor: true,
        },
      ],
    },
  ],
};

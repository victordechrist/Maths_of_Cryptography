import type { LabExercise } from '../types';

// Lesson 1.3 — Prime Numbers & Primality Testing.
// Solutions concatenate into valid Python (stdlib only).
export const l1_3Exercise: LabExercise = {
  labSlug: 'primes-and-primality-testing',
  title: 'Miller–Rabin Primality Test',
  intro:
    'Assemble the probabilistic primality test RSA keygen actually runs: the n−1 = 2^r·d decomposition, the witness loop, and the strong-probable-prime check.',
  steps: [
    {
      id: 'l1-3-s1',
      order: 1,
      title: 'Decompose n−1',
      instruction:
        'Assemble the factor-out-twos helper: write n−1 as 2^r·d with d odd by repeatedly halving.',
      expectedInput: 'odd integer n > 2',
      expectedOutput: '(r, d) with n−1 = 2^r·d, d odd',
      solution: ['b1', 'b2', 'b3', 'b4', 'b5'],
      blocks: [
        { id: 'b1', code: 'def decompose(n):', caption: 'signature' },
        { id: 'b2', code: '    d = n - 1\n    r = 0', caption: 'start with d = n−1, zero twos counted' },
        { id: 'b3', code: '    while d % 2 == 0:', caption: 'still even → factor another 2' },
        { id: 'b4', code: '        d //= 2\n        r += 1', caption: 'halve d, count the factor' },
        { id: 'b5', code: '    return r, d', caption: 'r factors of two, odd part d' },
        { id: 'b6', code: '    return d, r', caption: 'swapped order', isDistractor: true },
        { id: 'b7', code: '    while d % 2 == 1:', caption: 'wrong parity check', isDistractor: true },
      ],
    },
    {
      id: 'l1-3-s2',
      order: 2,
      title: 'Witness check',
      instruction:
        'Assemble one Miller–Rabin round: raise the base to d, then square up to r−1 times looking for −1.',
      expectedInput: 'candidate n, witness base a, (r, d) from decompose',
      expectedOutput: 'True if a does not prove n composite',
      solution: ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7'],
      blocks: [
        { id: 'b1', code: 'def is_witness(n, a, r, d):', caption: 'signature' },
        { id: 'b2', code: '    x = pow(a, d, n)', caption: 'x = a^d mod n' },
        { id: 'b3', code: '    if x == 1 or x == n - 1:', caption: 'trivial pass cases' },
        { id: 'b4', code: '        return False', caption: 'a is not a witness of compositeness' },
        { id: 'b5', code: '    for _ in range(r - 1):', caption: 'square up to r−1 more times' },
        { id: 'b6', code: '        x = pow(x, 2, n)\n        if x == n - 1:\n            return False', caption: 'hit −1 → passes this round' },
        { id: 'b7', code: '    return True', caption: 'never hit ±1 → a witnessed compositeness' },
        { id: 'b8', code: '        x = pow(x, 2)\n        if x == n - 1:\n            return False', caption: 'missing mod n', isDistractor: true },
      ],
    },
    {
      id: 'l1-3-s3',
      order: 3,
      title: 'Probable-prime driver',
      instruction:
        'Assemble the outer loop: screen small primes, then run k random witness rounds — any witness means composite.',
      expectedInput: 'odd candidate n, round count k',
      expectedOutput: 'True if n is probably prime (error ≤ 4^−k)',
      solution: ['b1', 'b2', 'b3', 'b4', 'b5', 'b6'],
      blocks: [
        { id: 'b1', code: 'def is_probable_prime(n, k=8):', caption: 'signature with default rounds' },
        { id: 'b2', code: '    if n < 4:\n        return n > 1', caption: '0,1 composite; 2,3 prime' },
        { id: 'b3', code: '    for p in (2, 3, 5, 7, 11, 13):\n        if n % p == 0:\n            return n == p', caption: 'trial-divide the small primes' },
        { id: 'b4', code: '    r, d = decompose(n)', caption: 'n−1 = 2^r·d' },
        { id: 'b5', code: '    for _ in range(k):\n        a = random.randrange(2, n - 2)\n        if is_witness(n, a, r, d):\n            return False', caption: 'one witness is enough to reject' },
        { id: 'b6', code: '    return True', caption: 'k clean rounds → probably prime' },
        { id: 'b7', code: '            return True', caption: 'early accept on a witness — backwards', isDistractor: true },
      ],
    },
  ],
};

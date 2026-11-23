export interface QuizOption {
  id: string
  label: string
  isCorrect: boolean
  explanation: string
}

export interface Question {
  id: string
  type: "multiple-choice" | "numeric"
  prompt: string
  options?: QuizOption[]
  correctAnswer?: number | string // For numeric / exact input
  explanation: string
  hint?: string
}

export interface Quiz {
  lessonSlug: string
  title: string
  description: string
  questions: Question[]
}

export const QUIZZES: Record<string, Quiz> = {
  "divisibility-euclidean-algorithm": {
    lessonSlug: "divisibility-euclidean-algorithm",
    title: "Check Your Understanding: Euclidean Algorithm",
    description: "Test your knowledge on divisibility properties, greatest common divisors, and Bézout's identity.",
    questions: [
      {
        id: "q1",
        type: "multiple-choice",
        prompt: "What is the Greatest Common Divisor $\\gcd(252, 105)$?",
        options: [
          { id: "a", label: "7", isCorrect: false, explanation: "7 divides both, but it is not the greatest." },
          { id: "b", label: "21", isCorrect: true, explanation: "Correct! $252 = 2 \\times 105 + 42$, $105 = 2 \\times 42 + 21$, $42 = 2 \\times 21 + 0$. So $\\gcd = 21$." },
          { id: "c", label: "42", isCorrect: false, explanation: "42 does not divide 105." },
          { id: "d", label: "105", isCorrect: false, explanation: "105 does not divide 252." },
        ],
        explanation: "Using the Euclidean algorithm: $252 = 2(105) + 42 \\implies 105 = 2(42) + 21 \\implies 42 = 2(21) + 0$. Thus $\\gcd(252, 105) = 21$.",
      },
      {
        id: "q2",
        type: "numeric",
        prompt: "For $\\gcd(35, 15) = 5$, find the integer coefficient $x$ in Bézout's identity $35x + 15y = 5$ where $x$ is the smallest non-negative integer.",
        correctAnswer: "1",
        explanation: "$35(1) + 15(-2) = 35 - 30 = 5$. Thus $x = 1$.",
        hint: "Run $35 \\bmod 15$: $35 = 2(15) + 5 \\implies 5 = 1(35) - 2(15)$.",
      },
    ],
  },
  "modular-arithmetic-congruences": {
    lessonSlug: "modular-arithmetic-congruences",
    title: "Check Your Understanding: Modular Congruences",
    description: "Assess your understanding of congruence classes and modular inverse computation.",
    questions: [
      {
        id: "q1",
        type: "numeric",
        prompt: "Compute $7^{-1} \\bmod 11$, i.e., find the modular inverse of 7 modulo 11 in range $[0, 10]$.",
        correctAnswer: "8",
        explanation: "$7 \\times 8 = 56 = 5 \\times 11 + 1 \\equiv 1 \\pmod{11}$. So $7^{-1} \\bmod 11 = 8$.",
        hint: "Test $7x \\equiv 1 \\pmod{11}$ for $x \\in \\{1, 2, \\dots, 10\\}$.",
      },
      {
        id: "q2",
        type: "multiple-choice",
        prompt: "When does a modular inverse $a^{-1} \\pmod m$ exist?",
        options: [
          { id: "a", label: "Always for any non-zero $a$", isCorrect: false, explanation: "Incorrect; e.g., $2^{-1} \\pmod 4$ does not exist." },
          { id: "b", label: "If and only if $\\gcd(a, m) = 1$", isCorrect: true, explanation: "Correct! $a$ and $m$ must be coprime for $ax \\equiv 1 \\pmod m$ to have a solution." },
          { id: "c", label: "Only if $m$ is even", isCorrect: false, explanation: "Modulus parity is irrelevant." },
          { id: "d", label: "If $a > m$", isCorrect: false, explanation: "Value relative size does not dictate invertibility." },
        ],
        explanation: "By Bézout's identity, $ax + my = 1$ has integer solutions if and only if $\\gcd(a, m) = 1$.",
      },
    ],
  },
  "rsa-cryptosystem": {
    lessonSlug: "rsa-cryptosystem",
    title: "Check Your Understanding: RSA Principles",
    description: "Verify key calculation, totient function usage, and RSA encryption exponent relations.",
    questions: [
      {
        id: "q1",
        type: "numeric",
        prompt: "Given primes $p = 61$ and $q = 53$, calculate Euler's totient $\\phi(n)$ where $n = p \\times q$.",
        correctAnswer: "3120",
        explanation: "$\\phi(n) = (p-1)(q-1) = (60)(52) = 3120$.",
      },
      {
        id: "q2",
        type: "multiple-choice",
        prompt: "Which equation guarantees RSA decryption $m^{ed} \\equiv m \\pmod n$?",
        options: [
          { id: "a", label: "$ed \\equiv 1 \\pmod{\\phi(n)}$", isCorrect: true, explanation: "Correct! By Euler's Totient Theorem, $m^{\\phi(n)} \\equiv 1 \\pmod n$, so $m^{ed} = m^{k\\phi(n) + 1} \\equiv m \\pmod n$." },
          { id: "b", label: "$e + d = n$", isCorrect: false, explanation: "Sum of exponents is not related." },
          { id: "c", label: "$e \\times d = n$", isCorrect: false, explanation: "$ed$ must be congruent to 1 modulo $\\phi(n)$." },
          { id: "d", label: "$e^d \\equiv 1 \\pmod n$", isCorrect: false, explanation: "This is incorrect." },
        ],
        explanation: "By design, $d$ is chosen as $e^{-1} \\pmod{\\phi(n)}$, meaning $ed \\equiv 1 \\pmod{\\phi(n)}$.",
      },
    ],
  },
  "diffie-hellman-key-exchange": {
    lessonSlug: "diffie-hellman-key-exchange",
    title: "Check Your Understanding: Diffie-Hellman",
    description: "Test your calculation of shared secrets and understanding of discrete logarithms.",
    questions: [
      {
        id: "q1",
        type: "numeric",
        prompt: "Let $p = 23$, $g = 5$, Alice's secret $a = 6$, and Bob's public key $B = 19$. Compute Alice's derived shared secret $S = B^a \\bmod p$.",
        correctAnswer: "2",
        explanation: "$S = 19^6 \\bmod 23$. $19 \\equiv -4 \\pmod{23}$, so $19^6 \\equiv (-4)^6 = 4096 \\pmod{23}$. $4096 = 178 \\times 23 + 2 \\equiv 2 \\pmod{23}$.",
        hint: "Use modular exponentiation: $19^2 = 361 \\equiv 16 \\pmod{23}$. $16^3 = 4096 \\equiv 2 \\pmod{23}$.",
      },
    ],
  },
  "test-1": {
    lessonSlug: "test-1",
    title: "Test 1: Number Theory & Algebra Checkpoint",
    description: "Twelve auto-graded questions covering modules 1-2: number theory, modular arithmetic, CRT, primes, and abstract algebra.",
    questions: [
      {
        id: "q1",
        type: "multiple-choice",
        prompt: "What does the Euclidean algorithm compute?",
        options: [
          { id: "a", label: "gcd(a, b) by repeated replacement of (a, b) with (b, a mod b)", isCorrect: true, explanation: "Correct \u2014 the last nonzero remainder is the GCD." },
          { id: "b", label: "The least common multiple directly", isCorrect: false, explanation: "LCM comes from the GCD afterwards: lcm = a\u00b7b/gcd." },
          { id: "c", label: "The modular inverse of a mod b", isCorrect: false, explanation: "The inverse needs the Extended algorithm's back-substitution." },
          { id: "d", label: "The prime factorization of a", isCorrect: false, explanation: "It finds the GCD, not the factors." }
        ],
        correctAnswer: "1",
        explanation: "Repeated division shrinks the pair until the remainder is zero; the last nonzero remainder is gcd(a, b).",
        hint: "Trace remainders: 1071 mod 462 = 147, 462 mod 147 = 21, 147 mod 21 = 0 \u2192 gcd 21.",
      },
      {
        id: "q2",
        type: "multiple-choice",
        prompt: "B\u00e9zout's identity states that when gcd(a, m) = 1...",
        options: [
          { id: "a", label: "There exist x, y with ax + my = 1, so x is a mod m's inverse", isCorrect: true, explanation: "Correct \u2014 the coefficient x is the inverse." },
          { id: "b", label: "a and m must both be prime", isCorrect: false, explanation: "Only coprimality is needed, not primality." },
          { id: "c", label: "a has no inverse mod m", isCorrect: false, explanation: "Coprime elements always have inverses." },
          { id: "d", label: "x must equal m - 1", isCorrect: false, explanation: "The Extended algorithm finds the actual coefficient." }
        ],
        correctAnswer: "1",
        explanation: "ax + my = 1 means ax \u2261 1 (mod m), so x is the multiplicative inverse.",
        hint: "Solve ax + my = 1 with the Extended Euclidean Algorithm.",
      },
      {
        id: "q3",
        type: "multiple-choice",
        prompt: "In modular arithmetic mod m, 'division by a' means...",
        options: [
          { id: "a", label: "Multiplication by a's modular inverse, which exists iff gcd(a, m) = 1", isCorrect: true, explanation: "Correct \u2014 division is defined via the inverse." },
          { id: "b", label: "Integer division rounded down", isCorrect: false, explanation: "Modular division is multiplication by the inverse." },
          { id: "c", label: "Division is always undefined mod m", isCorrect: false, explanation: "It is defined whenever the inverse exists." },
          { id: "d", label: "Dividing by zero mod m is allowed", isCorrect: false, explanation: "Zero never has an inverse." }
        ],
        correctAnswer: "1",
        explanation: "a\u207b\u00b9 mod m exists iff gcd(a, m) = 1; then a/b mod m = a\u00b7b\u207b\u00b9 mod m.",
        hint: "Check gcd(a, m) = 1 first, then use the EEA.",
      },
      {
        id: "q4",
        type: "multiple-choice",
        prompt: "Fermat's little theorem says that for prime p and a not divisible by p...",
        options: [
          { id: "a", label: "a^(p-1) \u2261 1 (mod p)", isCorrect: true, explanation: "Correct \u2014 the base raised to p-1 is 1 mod p." },
          { id: "b", label: "a^p \u2261 0 (mod p)", isCorrect: false, explanation: "a^p \u2261 a (mod p); the exponent is p-1 for 1." },
          { id: "c", label: "a^(p-1) \u2261 0 (mod p)", isCorrect: false, explanation: "The result is 1, not 0." },
          { id: "d", label: "p divides a^(p-1) - 2", isCorrect: false, explanation: "It divides a^(p-1) - 1." }
        ],
        correctAnswer: "1",
        explanation: "Fermat: a^(p-1) \u2261 1 (mod p) \u2014 the foundation of the compositeness test.",
        hint: "Compute a^(p-1) mod p; if not 1, p is composite.",
      },
      {
        id: "q5",
        type: "multiple-choice",
        prompt: "What makes Miller-Rabin stronger than a single Fermat test?",
        options: [
          { id: "a", label: "It uses many bases, so a composite passing all rounds is astronomically unlikely", isCorrect: true, explanation: "Correct \u2014 each round cuts pseudoprime probability \u2265 4x." },
          { id: "b", label: "It is faster on small numbers", isCorrect: false, explanation: "Speed is similar; strength comes from repetition." },
          { id: "c", label: "It proves primality with certainty", isCorrect: false, explanation: "It is probabilistic \u2014 certainty only for small deterministic bounds." },
          { id: "d", label: "It tests all primes up to \u221an", isCorrect: false, explanation: "Trial division does that; Miller-Rabin uses modular exponentiation." }
        ],
        correctAnswer: "1",
        explanation: "Each Miller-Rabin round with a different base reduces the error probability; k rounds make it negligible.",
        hint: "Run several bases; a single failure proves compositeness.",
      },
      {
        id: "q6",
        type: "multiple-choice",
        prompt: "The Chinese Remainder Theorem requires the moduli to be...",
        options: [
          { id: "a", label: "Pairwise coprime, giving a unique solution modulo their product", isCorrect: true, explanation: "Correct \u2014 coprimality guarantees existence and uniqueness." },
          { id: "b", label: "All equal", isCorrect: false, explanation: "They must be pairwise coprime, not equal." },
          { id: "c", label: "Prime powers only", isCorrect: false, explanation: "Any pairwise-coprime moduli work." },
          { id: "d", label: "In decreasing order", isCorrect: false, explanation: "Order does not matter." }
        ],
        correctAnswer: "1",
        explanation: "CRT: for pairwise coprime m\u2081..m\u2096, residues combine into a unique x mod (m\u2081\u00b7\u2026\u00b7m\u2096).",
        hint: "Solve each congruence and combine with the constructive CRT formula.",
      },
      {
        id: "q7",
        type: "multiple-choice",
        prompt: "Lagrange's theorem states that in a finite group G...",
        options: [
          { id: "a", label: "The order of every element divides the order of the group", isCorrect: true, explanation: "Correct \u2014 ord(g) | |G|." },
          { id: "b", label: "Every element generates the group", isCorrect: false, explanation: "Only generators of cyclic groups do." },
          { id: "c", label: "The group order equals the element order", isCorrect: false, explanation: "ord(g) divides |G|, not equals." },
          { id: "d", label: "Groups have no notion of order", isCorrect: false, explanation: "Finite groups have a well-defined order." }
        ],
        correctAnswer: "1",
        explanation: "Lagrange: ord(g) divides |G| \u2014 a constraint exploited throughout cryptographic group theory.",
        hint: "Check ord(g) against |G|; they need not be equal.",
      },
      {
        id: "q8",
        type: "multiple-choice",
        prompt: "What makes a finite field GF(p^n) special for cryptography?",
        options: [
          { id: "a", label: "Every nonzero element has a multiplicative inverse, enabling division everywhere", isCorrect: true, explanation: "Correct \u2014 fields support full arithmetic." },
          { id: "b", label: "It has no zero divisors only", isCorrect: false, explanation: "That is a weaker property; fields give inverses." },
          { id: "c", label: "It is always the integers mod p", isCorrect: false, explanation: "GF(p) is; GF(p^n) uses irreducible polynomials." },
          { id: "d", label: "It cannot be computed efficiently", isCorrect: false, explanation: "Field arithmetic is efficient; the hardness comes from DLP." }
        ],
        correctAnswer: "1",
        explanation: "A field closes under +, \u2212, \u00d7, \u00f7 (nonzero) \u2014 the algebraic home of AES and ECC arithmetic.",
        hint: "Irreducible polynomial modulus gives GF(p^n) from polynomial rings.",
      },
      {
        id: "q9",
        type: "multiple-choice",
        prompt: "A cyclic group is one where...",
        options: [
          { id: "a", label: "A single generator produces every element as a power", isCorrect: true, explanation: "Correct \u2014 one generator cycles through all elements." },
          { id: "b", label: "All elements commute", isCorrect: false, explanation: "Commutativity defines abelian, not cyclic." },
          { id: "c", label: "Every element has order 2", isCorrect: false, explanation: "Orders vary; the group order is the key fact." },
          { id: "d", label: "It has infinitely many elements", isCorrect: false, explanation: "Cyclic groups here are finite." }
        ],
        correctAnswer: "1",
        explanation: "Cyclic: G = \u27e8g\u27e9 = {g^k} \u2014 the structure that makes discrete-log constructions possible.",
        hint: "Find a generator g; every element is some power of g.",
      },
    ],
  },
  "test-2": {
    lessonSlug: "test-2",
    title: "Test 2: Cipher Suites Checkpoint",
    description: "Twelve auto-graded questions covering modules 3-4: symmetric ciphers, hashes, RSA, Diffie-Hellman, and ElGamal.",
    questions: [
      {
        id: "q1",
        type: "multiple-choice",
        prompt: "What are Shannon's two principles of confusion and diffusion?",
        options: [
          { id: "a", label: "Confusion obscures key-ciphertext relationships; diffusion spreads plaintext statistics", isCorrect: true, explanation: "Correct \u2014 substitution provides confusion, permutation provides diffusion." },
          { id: "b", label: "Confusion speeds up encryption; diffusion compresses data", isCorrect: false, explanation: "They are security properties, not performance ones." },
          { id: "c", label: "They are two modes of AES", isCorrect: false, explanation: "They predate AES by decades." },
          { id: "d", label: "Confusion = hashing, diffusion = encryption", isCorrect: false, explanation: "Both describe cipher design, not primitives." }
        ],
        correctAnswer: "1",
        explanation: "Confusion hides how the key affects the ciphertext; diffusion ensures one plaintext bit affects many ciphertext bits.",
        hint: "Think substitution for confusion, transposition for diffusion.",
      },
      {
        id: "q2",
        type: "multiple-choice",
        prompt: "Why did Vigen\u00e8re fall to Kasiski examination?",
        options: [
          { id: "a", label: "Repeated ciphertext patterns reveal the key length, enabling per-position frequency analysis", isCorrect: true, explanation: "Correct \u2014 periodicity leaks through repeated n-grams." },
          { id: "b", label: "It used too short keys always", isCorrect: false, explanation: "The structural periodicity is the flaw, regardless of key." },
          { id: "c", label: "It was encrypted twice", isCorrect: false, explanation: "Multiple encryption was not the issue." },
          { id: "d", label: "Frequency analysis cannot touch polyalphabetic ciphers", isCorrect: false, explanation: "It works per position once the period is known." }
        ],
        correctAnswer: "1",
        explanation: "Finding the period collapses Vigen\u00e8re into independent Caesar ciphers, each broken by frequency analysis.",
        hint: "Look for repeated digraphs and factor the distances between them.",
      },
      {
        id: "q3",
        type: "multiple-choice",
        prompt: "Kerckhoffs's principle states that security must depend on...",
        options: [
          { id: "a", label: "The secrecy of the key, not the secrecy of the algorithm", isCorrect: true, explanation: "Correct \u2014 the algorithm is assumed public." },
          { id: "b", label: "Keeping the algorithm secret forever", isCorrect: false, explanation: "The opposite: the key is the only secret." },
          { id: "c", label: "Using hardware tokens", isCorrect: false, explanation: "It is about where the secret lives." },
          { id: "d", label: "Never reusing plaintexts", isCorrect: false, explanation: "Key secrecy is the principle." }
        ],
        correctAnswer: "1",
        explanation: "A cipher is secure even if everything except the key is known \u2014 obscurity is not security.",
        hint: "Design as if the attacker knows your algorithm.",
      },
      {
        id: "q4",
        type: "multiple-choice",
        prompt: "In a stream cipher, what determines security?",
        options: [
          { id: "a", label: "The unpredictability of the keystream, which is XORed with plaintext", isCorrect: true, explanation: "Correct \u2014 a predictable keystream breaks everything." },
          { id: "b", label: "The block size of the cipher", isCorrect: false, explanation: "Stream ciphers have no blocks." },
          { id: "c", label: "The number of rounds", isCorrect: false, explanation: "Rounds apply to block ciphers." },
          { id: "d", label: "The key length alone", isCorrect: false, explanation: "Key length matters but keystream quality is decisive." }
        ],
        correctAnswer: "1",
        explanation: "ciphertext = plaintext XOR keystream; XOR is reversible, so the keystream's secrecy IS the security.",
        hint: "If you can predict the keystream, you recover the plaintext.",
      },
      {
        id: "q5",
        type: "multiple-choice",
        prompt: "Why is ECB mode insecure for block ciphers?",
        options: [
          { id: "a", label: "Identical plaintext blocks produce identical ciphertext blocks, leaking patterns", isCorrect: true, explanation: "Correct \u2014 the penguin problem." },
          { id: "b", label: "It is too slow", isCorrect: false, explanation: "Speed is not the issue; pattern leakage is." },
          { id: "c", label: "It cannot encrypt the last block", isCorrect: false, explanation: "Padding handles that." },
          { id: "d", label: "It requires a secret IV", isCorrect: false, explanation: "ECB uses no IV at all." }
        ],
        correctAnswer: "1",
        explanation: "ECB encrypts each block independently \u2014 repetition in plaintext becomes repetition in ciphertext.",
        hint: "Picture a bitmap encrypted with ECB: the outline survives.",
      },
      {
        id: "q6",
        type: "multiple-choice",
        prompt: "What makes nonce reuse catastrophic in CTR or CBC mode?",
        options: [
          { id: "a", label: "The same keystream XORs two plaintexts, allowing recovery of both", isCorrect: true, explanation: "Correct \u2014 keystream reuse destroys confidentiality." },
          { id: "b", label: "It only wastes bandwidth", isCorrect: false, explanation: "It breaks the security proof completely." },
          { id: "c", label: "It corrupts the IV chain", isCorrect: false, explanation: "The keystream itself is compromised." },
          { id: "d", label: "Nothing \u2014 nonces can be reused safely", isCorrect: false, explanation: "Never reuse a nonce with the same key." }
        ],
        correctAnswer: "1",
        explanation: "CTR keystream = E(nonce||counter); CBC with fixed IV similarly repeats \u2014 reuse leaks XOR of plaintexts.",
        hint: "One nonce per key, always.",
      },
      {
        id: "q7",
        type: "multiple-choice",
        prompt: "What does the avalanche effect of a cryptographic hash mean?",
        options: [
          { id: "a", label: "Flipping one input bit changes about half the output bits", isCorrect: true, explanation: "Correct \u2014 outputs look random w.r.t. inputs." },
          { id: "b", label: "The hash gets faster with more input", isCorrect: false, explanation: "Avalanche is about output sensitivity." },
          { id: "c", label: "Collisions become impossible", isCorrect: false, explanation: "Collision resistance is separate." },
          { id: "d", label: "The digest length doubles", isCorrect: false, explanation: "Digest length is fixed." }
        ],
        correctAnswer: "1",
        explanation: "Avalanche ensures tiny input changes produce completely different digests \u2014 hiding any input structure.",
        hint: "Compare digests of 'a' and 'b': they share no visible pattern.",
      },
      {
        id: "q8",
        type: "multiple-choice",
        prompt: "Why can't a plain hash authenticate a message?",
        options: [
          { id: "a", label: "Anyone can compute the hash of a forged message, so origin is unproven", isCorrect: true, explanation: "Correct \u2014 integrity \u2260 authenticity." },
          { id: "b", label: "Hashes are too slow for authentication", isCorrect: false, explanation: "Speed is irrelevant to the flaw." },
          { id: "c", label: "Hashes are not reversible", isCorrect: false, explanation: "Irreversibility does not prove origin." },
          { id: "d", label: "HMAC is just a slower hash", isCorrect: false, explanation: "The key, not speed, provides authentication." }
        ],
        correctAnswer: "1",
        explanation: "A public hash function gives anyone the same digest \u2014 only a keyed MAC binds the tag to an authorized origin.",
        hint: "HMAC(key, message) can only be produced by key holders.",
      },
      {
        id: "q9",
        type: "multiple-choice",
        prompt: "Collision resistance means...",
        options: [
          { id: "a", label: "It is infeasible to find two different inputs with the same digest", isCorrect: true, explanation: "Correct \u2014 2^128 work for a 256-bit hash." },
          { id: "b", label: "The hash cannot be reversed", isCorrect: false, explanation: "That is preimage resistance." },
          { id: "c", label: "The digest is shorter than the input", isCorrect: false, explanation: "Compression is separate from collision resistance." },
          { id: "d", label: "Two hashes cannot be compared", isCorrect: false, explanation: "Digests compare trivially; finding collisions is hard." }
        ],
        correctAnswer: "1",
        explanation: "Collision resistance forbids m\u2081 \u2260 m\u2082 with H(m\u2081) = H(m\u2082) \u2014 birthday attacks cost ~2^(n/2).",
        hint: "Preimage = invert; second preimage = find another input for a given digest.",
      },
      {
        id: "q10",
        type: "multiple-choice",
        prompt: "What problem does RSA's security reduce to?",
        options: [
          { id: "a", label: "Factoring the semiprime n = pq used in the modulus", isCorrect: true, explanation: "Correct \u2014 factoring is believed classically hard." },
          { id: "b", label: "Computing square roots mod n", isCorrect: false, explanation: "Square roots are easy with the private key; factoring is the barrier." },
          { id: "c", label: "Discrete logarithms in GF(p)", isCorrect: false, explanation: "That is Diffie-Hellman/ElGamal territory." },
          { id: "d", label: "Solving linear equations", isCorrect: false, explanation: "RSA is nonlinear by design." }
        ],
        correctAnswer: "1",
        explanation: "The public key reveals n and e; recovering d requires \u03c6(n), which requires the factorization of n.",
        hint: "n = pq with ~2048 bits is beyond current factoring records.",
      },
      {
        id: "q11",
        type: "multiple-choice",
        prompt: "How does Diffie-Hellman establish a shared secret?",
        options: [
          { id: "a", label: "Both parties compute g^(ab) mod p from public g^a and g^b, while eavesdroppers face the discrete log", isCorrect: true, explanation: "Correct \u2014 shared secret without transmission." },
          { id: "b", label: "They exchange the secret encrypted with RSA", isCorrect: false, explanation: "DH needs no prior shared key." },
          { id: "c", label: "The server generates and sends the secret", isCorrect: false, explanation: "There is no server in DH." },
          { id: "d", label: "They both hash the same password", isCorrect: false, explanation: "No passwords are involved." }
        ],
        correctAnswer: "1",
        explanation: "Alice sends g^a, Bob sends g^b; Alice computes (g^b)^a = g^(ab) = (g^a)^b = Bob's value.",
        hint: "The eavesdropper sees g, g^a, g^b but solving for a, b is the discrete log problem.",
      },
      {
        id: "q12",
        type: "multiple-choice",
        prompt: "What does ElGamal encryption use the shared-secret idea for?",
        options: [
          { id: "a", label: "Masking the message with a one-time-pad-like value derived from g^(ab) mod p", isCorrect: true, explanation: "Correct \u2014 c\u2081 = g^a, c\u2082 = m\u00b7g^(ab) mod p." },
          { id: "b", label: "Signing messages with RSA keys", isCorrect: false, explanation: "ElGamal encryption is probabilistic and separate from signatures." },
          { id: "c", label: "Hashing the message twice", isCorrect: false, explanation: "No hashing is involved." },
          { id: "d", label: "Exchanging keys like Diffie-Hellman", isCorrect: false, explanation: "ElGamal encrypts with a recipient's public key directly." }
        ],
        correctAnswer: "1",
        explanation: "ElGamal: c\u2081 = g^r, c\u2082 = m\u00b7y^r mod p \u2014 decrypting needs the private key to remove the mask.",
        hint: "The ephemeral r makes each ciphertext different for the same message.",
      },
    ],
  },
  "test-3": {
    lessonSlug: "test-3",
    title: "Test 3: Curves & Post-Quantum Checkpoint",
    description: "Twelve auto-graded questions covering modules 5-6: elliptic curves, ECDH/ECDSA, pairings, and post-quantum cryptography.",
    questions: [
      {
        id: "q1",
        type: "multiple-choice",
        prompt: "On an elliptic curve y\u00b2 = x\u00b3 + ax + b over a finite field, the points together with...",
        options: [
          { id: "a", label: "The point at infinity O as identity form a group", isCorrect: true, explanation: "Correct \u2014 O is the identity element." },
          { id: "b", label: "The origin (0,0) always", isCorrect: false, explanation: "(0,0) is only on the curve if b = 0; O is the identity." },
          { id: "c", label: "Field addition as the group law", isCorrect: false, explanation: "The chord-tangent rule defines the group law." },
          { id: "d", label: "No identity element", isCorrect: false, explanation: "Every group needs an identity; O plays that role." }
        ],
        correctAnswer: "1",
        explanation: "Curve points plus O form an abelian group under the chord-tangent addition rule.",
        hint: "The point at infinity is the group identity, like zero for addition.",
      },
      {
        id: "q2",
        type: "multiple-choice",
        prompt: "Why is the elliptic-curve discrete logarithm problem (ECDLP) hard?",
        options: [
          { id: "a", label: "No known classical or quantum algorithm solves it efficiently for large curves", isCorrect: true, explanation: "Correct \u2014 it is the foundation of ECC security." },
          { id: "b", label: "Curves have too few points", isCorrect: false, explanation: "Large curves have ~2^256 points." },
          { id: "c", label: "Point addition is impossible to compute", isCorrect: false, explanation: "Point addition is efficient; inversion is hard." },
          { id: "d", label: "It reduces to factoring", isCorrect: false, explanation: "ECDLP has no known reduction to factoring." }
        ],
        correctAnswer: "1",
        explanation: "Given P and kP on a large curve, finding k is believed infeasible classically and quantumly (unlike RSA).",
        hint: "Compare: Shor's algorithm breaks RSA/DH but not ECDLP on standard curves.",
      },
      {
        id: "q3",
        type: "multiple-choice",
        prompt: "What is the key-size advantage of ECC over RSA?",
        options: [
          { id: "a", label: "~256-bit ECC keys give security comparable to ~3072-bit RSA keys", isCorrect: true, explanation: "Correct \u2014 ECC is much more efficient per bit of security." },
          { id: "b", label: "ECC keys are always longer", isCorrect: false, explanation: "They are dramatically shorter." },
          { id: "c", label: "ECC is slower for the same security", isCorrect: false, explanation: "ECC is faster at equivalent security." },
          { id: "d", label: "There is no advantage", isCorrect: false, explanation: "The advantage is precisely why ECC dominates modern TLS." }
        ],
        correctAnswer: "1",
        explanation: "ECC's security-per-bit is far higher, so mobile and embedded devices prefer it.",
        hint: "NIST: 128-bit security \u2248 RSA-3072 \u2248 ECC-256.",
      },
      {
        id: "q4",
        type: "multiple-choice",
        prompt: "How does ECDH establish a shared secret?",
        options: [
          { id: "a", label: "Alice sends aP, Bob sends bP; both compute abP as the shared secret", isCorrect: true, explanation: "Correct \u2014 mirrors Diffie-Hellman on curves." },
          { id: "b", label: "They exchange private keys encrypted with RSA", isCorrect: false, explanation: "Private keys never leave their owners." },
          { id: "c", label: "The server computes and sends the secret", isCorrect: false, explanation: "ECDH is peer-to-peer." },
          { id: "d", label: "They both sign the same message", isCorrect: false, explanation: "Signing is ECDSA, not ECDH." }
        ],
        correctAnswer: "1",
        explanation: "Alice computes b(aP) = abP; Bob computes a(bP) = abP \u2014 same point, eavesdroppers face ECDLP.",
        hint: "ECDH provides forward secrecy when ephemeral keys are used.",
      },
      {
        id: "q5",
        type: "multiple-choice",
        prompt: "In ECDSA, what makes a reused nonce catastrophic?",
        options: [
          { id: "a", label: "Two signatures with the same k allow algebraic recovery of the private key", isCorrect: true, explanation: "Correct \u2014 the nonce must be unique per signature." },
          { id: "b", label: "The signature becomes too long", isCorrect: false, explanation: "Length is irrelevant to the flaw." },
          { id: "c", label: "It only weakens the hash", isCorrect: false, explanation: "The key itself leaks." },
          { id: "d", label: "Nothing \u2014 nonces can repeat safely", isCorrect: false, explanation: "Reuse is one of the most famous ECC failures (PS3)." }
        ],
        correctAnswer: "1",
        explanation: "s = k\u207b\u00b9(h + r\u00b7d); two equations with the same k solve for d directly.",
        hint: "Deterministic nonces (RFC 6979) exist to prevent this.",
      },
      {
        id: "q6",
        type: "multiple-choice",
        prompt: "What does ECDSA provide that ECDH does not?",
        options: [
          { id: "a", label: "Digital signatures \u2014 proof of authenticity and integrity", isCorrect: true, explanation: "Correct \u2014 signing vs key agreement are different primitives." },
          { id: "b", label: "Faster encryption", isCorrect: false, explanation: "ECDSA does not encrypt." },
          { id: "c", label: "Forward secrecy", isCorrect: false, explanation: "Signing schemes don't provide that property." },
          { id: "d", label: "Key exchange", isCorrect: false, explanation: "That is ECDH's role." }
        ],
        correctAnswer: "1",
        explanation: "ECDSA signs with the private key; anyone verifies with the public key \u2014 authenticity without shared secrets.",
        hint: "Sign: private key. Verify: public key. Never mix them up.",
      },
      {
        id: "q7",
        type: "multiple-choice",
        prompt: "What is the defining property of a bilinear pairing e: G1 \u00d7 G2 \u2192 GT?",
        options: [
          { id: "a", label: "e(aP, bQ) = e(P, Q)^{ab} \u2014 bilinear in both arguments", isCorrect: true, explanation: "Correct \u2014 that identity powers everything pairing-based." },
          { id: "b", label: "e(P + Q) = e(P) + e(Q) only", isCorrect: false, explanation: "Linearity alone is weaker; bilinearity is the key." },
          { id: "c", label: "e(P, Q) = P \u00b7 Q in the group", isCorrect: false, explanation: "The output lives in GT, a different group." },
          { id: "d", label: "Pairings are symmetric always", isCorrect: false, explanation: "Some pairings are asymmetric (G1 \u2260 G2)." }
        ],
        correctAnswer: "1",
        explanation: "Bilinearity lets you move exponentiation across the pairing \u2014 enabling BLS signatures and the MOV reduction.",
        hint: "e(aP, bQ) = e(P,Q)^{ab} is the single identity to remember.",
      },
      {
        id: "q8",
        type: "multiple-choice",
        prompt: "What does the MOV reduction use pairings for?",
        options: [
          { id: "a", label: "Transferring the elliptic-curve discrete log problem into a finite-field group", isCorrect: true, explanation: "Correct \u2014 it can weaken ECC if the target group is small." },
          { id: "b", label: "Speeding up point addition", isCorrect: false, explanation: "Pairings are expensive; they are a cryptanalytic tool here." },
          { id: "c", label: "Encrypting messages on curves", isCorrect: false, explanation: "MOV is an attack/reduction, not encryption." },
          { id: "d", label: "Generating curve parameters", isCorrect: false, explanation: "It analyzes hardness, not generation." }
        ],
        correctAnswer: "1",
        explanation: "MOV maps ECDLP to DLP in GT; secure curves are chosen so GT's DLP stays hard.",
        hint: "This is why pairing-friendly curves must be chosen carefully.",
      },
      {
        id: "q9",
        type: "multiple-choice",
        prompt: "What makes BLS aggregate signatures special?",
        options: [
          { id: "a", label: "Multiple signatures on different messages aggregate into one short signature verifiable in aggregate", isCorrect: true, explanation: "Correct \u2014 pairing verification supports aggregation." },
          { id: "b", label: "They are faster to create individually", isCorrect: false, explanation: "Aggregation is the point, not single-signature speed." },
          { id: "c", label: "They use no private keys", isCorrect: false, explanation: "BLS still requires private keys." },
          { id: "d", label: "They work without curves", isCorrect: false, explanation: "BLS is defined on pairing-friendly curves." }
        ],
        correctAnswer: "1",
        explanation: "Bilinearity lets e(\u03a3pk\u1d62, H(m\u1d62)) checks collapse \u2014 one pairing verifies many signatures.",
        hint: "Used in blockchain consensus (Ethereum consensus layer).",
      },
      {
        id: "q10",
        type: "multiple-choice",
        prompt: "Why does Shor's algorithm threaten RSA and Diffie-Hellman but not (standard) ECC?",
        options: [
          { id: "a", label: "Shor solves factoring and discrete logs efficiently; ECDLP has no known quantum algorithm", isCorrect: true, explanation: "Correct \u2014 ECC survives quantum better than RSA/DH." },
          { id: "b", label: "Shor only works on symmetric ciphers", isCorrect: false, explanation: "It breaks public-key schemes based on factoring/DL." },
          { id: "c", label: "ECC keys are too long for quantum computers", isCorrect: false, explanation: "Key length is irrelevant to the algorithmic gap." },
          { id: "d", label: "Shor cannot run on quantum hardware yet", isCorrect: false, explanation: "The threat is asymptotic; migration is precautionary." }
        ],
        correctAnswer: "1",
        explanation: "Shor's period-finding kills RSA/DH; ECDLP on standard curves remains quantum-hard \u2014 but NIST still standardizes PQC.",
        hint: "Grover halves symmetric security; AES-256 is the PQ-safe choice.",
      },
      {
        id: "q11",
        type: "multiple-choice",
        prompt: "What makes lattice-based cryptography (Kyber/Dilithium) post-quantum?",
        options: [
          { id: "a", label: "Its hardness assumption (LWE/SIS) has no known quantum algorithm, unlike factoring", isCorrect: true, explanation: "Correct \u2014 lattices resist Shor." },
          { id: "b", label: "It uses larger keys only", isCorrect: false, explanation: "Key size is not the security argument." },
          { id: "c", label: "It is symmetric cryptography", isCorrect: false, explanation: "Kyber/Dilithium are public-key schemes." },
          { id: "d", label: "It relies on hash functions", isCorrect: false, explanation: "Hash-based signatures exist separately." }
        ],
        correctAnswer: "1",
        explanation: "LWE hides secrets in noise; no quantum algorithm solves it efficiently \u2014 the basis of NIST's PQC standards.",
        hint: "Kyber = KEM (key exchange), Dilithium = signatures.",
      },
      {
        id: "q12",
        type: "multiple-choice",
        prompt: "What does a zero-knowledge proof guarantee?",
        options: [
          { id: "a", label: "The verifier learns the statement is true without learning the witness", isCorrect: true, explanation: "Correct \u2014 completeness, soundness, and zero-knowledge." },
          { id: "b", label: "The prover knows nothing at all", isCorrect: false, explanation: "The prover knows the witness; the verifier learns nothing." },
          { id: "c", label: "The statement is hidden from everyone", isCorrect: false, explanation: "The statement is public; the witness is hidden." },
          { id: "d", label: "Encryption of the proof", isCorrect: false, explanation: "ZK is about knowledge, not confidentiality of the statement." }
        ],
        correctAnswer: "1",
        explanation: "ZK protocols prove validity without transfer of knowledge \u2014 used in identity proofs and zk-rollups.",
        hint: "Completeness: honest prover convinces. Soundness: cheater cannot. ZK: verifier learns nothing extra.",
      },
    ],
  },
};

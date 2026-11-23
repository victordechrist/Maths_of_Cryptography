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
  "cumulative-test": {
    lessonSlug: "cumulative-test",
    title: "Cumulative Test: Pairings, Lattices, ZK Proofs & HE/MPC",
    description: "Twelve auto-graded questions covering the last four lessons: pairing-based cryptography, lattice-based cryptography & LWE, zero-knowledge proofs, and homomorphic encryption & MPC.",
    questions: [
      {
        id: "q1",
        type: "multiple-choice",
        prompt: "A bilinear pairing $e: G_1 \times G_2 \to G_T$ is primarily used in pairing-based cryptography to:",
        options: [
          { id: "a", label: "Speed up AES rounds with algebraic structure", isCorrect: false, explanation: "Pairings belong to elliptic-curve groups, not symmetric ciphers." },
          { id: "b", label: "Move the elliptic-curve discrete logarithm problem into a finite-field group (the MOV reduction), and to build short signatures like BLS", isCorrect: true, explanation: "Bilinearity lets you verify e(g1, h) = e(pk, H(m)) and enables the MOV attack transferring ECC DLP to finite fields." },
          { id: "c", label: "Encrypt messages without any public key", isCorrect: false, explanation: "Pairings are a computational tool on groups; they do not remove the need for keys." },
          { id: "d", label: "Generate provably random primes faster", isCorrect: false, explanation: "Primality testing uses different mathematics entirely." },
        ],
        explanation: "Pairings give bilinearity e(aP, bQ) = e(P, Q)^{ab}, which powers BLS signatures, identity-based encryption, and the MOV reduction of ECC discrete logs to finite-field DLP.",
      },
      {
        id: "q2",
        type: "multiple-choice",
        prompt: "Why can BLS aggregate signatures be verified with a single pairing check?",
        options: [
          { id: "a", label: "Because signatures are simply concatenated and hashed once", isCorrect: false, explanation: "Concatenation destroys the algebraic relation the pairing exploits." },
          { id: "b", label: "Bilinearity lets products of signatures pair against sums of public keys: e(\prod \sigma_i, P) = \prod e(H(m_i), pk_i)", isCorrect: true, explanation: "e is multiplicative in each argument, so aggregation collapses to one equation." },
          { id: "c", label: "Because all signers share the same private key", isCorrect: false, explanation: "Aggregation works precisely across distinct keys." },
          { id: "d", label: "Because the hash function is linear", isCorrect: false, explanation: "Cryptographic hashes are deliberately non-linear; bilinearity of e is what matters." },
        ],
        explanation: "Bilinearity turns signature aggregation into group arithmetic: the product of signatures verifies against the product of the corresponding public-key/message pairings.",
      },
      {
        id: "q3",
        type: "multiple-choice",
        prompt: "In the Learning With Errors (LWE) problem, samples have the form $b = A s + e \pmod q$ with small noise $e$. What makes recovering the secret $s$ hard?",
        options: [
          { id: "a", label: "The matrix $A$ is too large to store", isCorrect: false, explanation: "Size affects efficiency, not hardness." },
          { id: "b", label: "The noise $e$ destroys the exact linear relations that Gaussian elimination would need, reducing recovery to a hard lattice problem", isCorrect: true, explanation: "Without noise, s falls out by linear algebra; with noise, finding the closest lattice vector is believed exponentially hard." },
          { id: "c", label: "The modulus $q$ is secret", isCorrect: false, explanation: "q is public in LWE." },
          { id: "d", label: "LWE uses quantum computers to encrypt", isCorrect: false, explanation: "LWE is a mathematical problem, not a machine." },
        ],
        explanation: "LWE hides a short secret in noisy linear equations. The noise makes the system inconsistent for exact solvers, and the best known attacks reduce to lattice problems (CVP/SVP) that are hard in high dimensions.",
      },
      {
        id: "q4",
        type: "multiple-choice",
        prompt: "Why do lattice-based schemes keep secrets as SHORT vectors?",
        options: [
          { id: "a", label: "Short vectors compress better for storage", isCorrect: false, explanation: "Compression is irrelevant to security." },
          { id: "b", label: "Finding the shortest or closest lattice vector in high dimensions is computationally hard, so a short secret embedded in a lattice cannot be recovered efficiently", isCorrect: true, explanation: "Lattice hardness (SVP/CVP approximations) is the foundation of post-quantum security." },
          { id: "c", label: "Short vectors are easier for GPUs to compute", isCorrect: false, explanation: "Hardware speed does not create hardness." },
          { id: "d", label: "Short vectors make encryption deterministic", isCorrect: false, explanation: "Randomness comes from the error term, not length." },
        ],
        explanation: "Lattice cryptography relies on the gap between easy lattice operations (addition, reduction) and hard ones (finding unusually short vectors). Secrets are chosen short so that decoding them is a bounded-distance decoding problem.",
      },
      {
        id: "q5",
        type: "multiple-choice",
        prompt: "The zero-knowledge property of an interactive proof means:",
        options: [
          { id: "a", label: "The proof contains no mathematical content", isCorrect: false, explanation: "It contains exactly enough to convince." },
          { id: "b", label: "A simulator can produce transcripts indistinguishable from real ones, so the verifier learns nothing beyond the statement's validity", isCorrect: true, explanation: "If transcripts can be faked without the witness, they leak nothing about it." },
          { id: "c", label: "The prover never reveals any bits of the witness", isCorrect: false, explanation: "Zero-knowledge is about what is LEARNED, not bits revealed in isolation." },
          { id: "d", label: "The proof is zero bytes long", isCorrect: false, explanation: "A joke option — proofs have size." },
        ],
        explanation: "Zero-knowledge is formalized via simulators: anything the verifier sees could have been generated without the secret, so the interaction reveals only that the statement is true.",
      },
      {
        id: "q6",
        type: "multiple-choice",
        prompt: "In the Schnorr identification protocol, how does the prover convince the verifier of knowledge of $x$ (with $y = g^x$) without revealing $x$?",
        options: [
          { id: "a", label: "The prover sends $x$ encrypted under the verifier's public key", isCorrect: false, explanation: "Sending the secret, even encrypted to one party, is not zero-knowledge." },
          { id: "b", label: "Commit with $t = g^r$, answer a random challenge $c$ with $s = r + cx$, and let the verifier check $g^s = t \cdot y^c$", isCorrect: true, explanation: "The response is a linear combination that verifies only if x is consistent; rewinding extracts x, proving knowledge." },
          { id: "c", label: "The prover hashes the witness and sends the digest", isCorrect: false, explanation: "A hash of x reveals nothing usable and proves nothing." },
          { id: "d", label: "The prover proves $x > 0$ by sorting", isCorrect: false, explanation: "Nonsense — Schnorr is an identification scheme." },
        ],
        explanation: "Schnorr is a sigma protocol: commit, challenge, respond. The verifier's check $g^s \stackrel{?}{=} t y^c$ passes iff the prover knows x, while the random r blinds every transcript (zero-knowledge).",
      },
      {
        id: "q7",
        type: "multiple-choice",
        prompt: "What does SOUNDNESS of an interactive proof system guarantee?",
        options: [
          { id: "a", label: "Honest provers always succeed", isCorrect: false, explanation: "That is completeness." },
          { id: "b", label: "A cheating prover without a valid witness can convince the verifier only with negligible probability", isCorrect: true, explanation: "Soundness is the security half: false statements cannot be proven." },
          { id: "c", label: "Transcripts are perfectly zero-knowledge", isCorrect: false, explanation: "That is the zero-knowledge property." },
          { id: "d", label: "The verifier runs in polynomial time", isCorrect: false, explanation: "Efficiency is separate from soundness." },
        ],
        explanation: "The three pillars: completeness (honest prover convinces), soundness (cheater fails), zero-knowledge (verifier learns nothing). Soundness is what makes the proof mean anything.",
      },
      {
        id: "q8",
        type: "multiple-choice",
        prompt: "What does Paillier's additive homomorphism provide?",
        options: [
          { id: "a", label: "The ability to multiply two ciphertexts and get the product of the plaintexts", isCorrect: false, explanation: "That would be multiplicative homomorphism; Paillier is additive." },
          { id: "b", label: "$\text{Enc}(m_1) \cdot \text{Enc}(m_2) = \text{Enc}(m_1 + m_2)$ — sums can be computed on ciphertexts without decryption", isCorrect: true, explanation: "Ciphertext multiplication corresponds to plaintext addition under Paillier." },
          { id: "c", label: "Deterministic encryption with no randomness", isCorrect: false, explanation: "Paillier uses randomness r for semantic security." },
          { id: "d", label: "Key exchange in one round", isCorrect: false, explanation: "Paillier is an encryption scheme, not a key exchange." },
        ],
        explanation: "Paillier is additively homomorphic: multiplying ciphertexts yields the encryption of the sum of plaintexts, enabling private aggregation (e.g. voting, sums) by an untrusted server.",
      },
      {
        id: "q9",
        type: "multiple-choice",
        prompt: "How does FULLY homomorphic encryption (FHE) differ from partially homomorphic schemes like Paillier?",
        options: [
          { id: "a", label: "FHE encrypts faster but with larger keys", isCorrect: false, explanation: "Performance is not the defining difference." },
          { id: "b", label: "FHE supports arbitrary computations (both additions and multiplications, hence any circuit) on ciphertexts; Paillier supports only one operation", isCorrect: true, explanation: "Gentry's 2009 FHE breakthrough made arbitrary computation on encrypted data possible." },
          { id: "c", label: "FHE requires quantum computers to decrypt", isCorrect: false, explanation: "FHE is classical; its security assumptions are lattice-based." },
          { id: "d", label: "FHE removes the need for a secret key", isCorrect: false, explanation: "FHE still uses public/secret key pairs." },
        ],
        explanation: "Partial HE (Paillier: addition; RSA: multiplication) supports one operation. FHE bootstraps to support any circuit, at much higher cost — the classic privacy/performance trade-off.",
      },
      {
        id: "q10",
        type: "multiple-choice",
        prompt: "In Shamir's (k, n) secret sharing, what can any k − 1 shares reveal about the secret?",
        options: [
          { id: "a", label: "Half the secret's bits", isCorrect: false, explanation: "Shares below the threshold reveal nothing at all." },
          { id: "b", label: "Nothing — fewer than k shares are information-theoretically independent of the secret", isCorrect: true, explanation: "The polynomial's constant term (the secret) is perfectly hidden until k points determine it." },
          { id: "c", label: "The secret modulo a small prime", isCorrect: false, explanation: "No partial information leaks below threshold." },
          { id: "d", label: "Enough to brute-force it in minutes", isCorrect: false, explanation: "Security is information-theoretic, not computational." },
        ],
        explanation: "Shamir encodes the secret as the constant term of a random degree k−1 polynomial. Any k points reconstruct it; k−1 points leave the constant term uniformly random — perfect secrecy.",
      },
      {
        id: "q11",
        type: "multiple-choice",
        prompt: "What does Secure Multi-Party Computation (MPC) let a group of parties do?",
        options: [
          { id: "a", label: "Reveal their inputs to a trusted dealer who computes for them", isCorrect: false, explanation: "MPC's point is removing the trusted party." },
          { id: "b", label: "Jointly compute a function f(x_1, ..., x_n) over private inputs while learning nothing beyond the output", isCorrect: true, explanation: "Secret sharing plus protocol evaluation keeps each party's input hidden from the others." },
          { id: "c", label: "Encrypt all data with one shared key", isCorrect: false, explanation: "Shared keys are not MPC." },
          { id: "d", label: "Prove statements in zero knowledge", isCorrect: false, explanation: "ZK proofs and MPC are complementary but distinct primitives." },
        ],
        explanation: "MPC protocols (often built on secret sharing) let mutually distrustful parties compute on joint data — e.g. salary averages, auctions — without revealing individual inputs.",
      },
      {
        id: "q12",
        type: "multiple-choice",
        prompt: "Why might a privacy-preserving audit combine ZERO-KNOWLEDGE proofs with HOMOMORPHIC encryption?",
        options: [
          { id: "a", label: "ZK proofs make encryption faster", isCorrect: false, explanation: "They solve different problems." },
          { id: "b", label: "HE lets the auditor compute on encrypted records, while ZK proofs let the audited party prove the computation was correct without revealing the data", isCorrect: true, explanation: "HE protects data during computation; ZK proves correctness of the process — together they give verifiable privacy." },
          { id: "c", label: "They are interchangeable; either alone suffices", isCorrect: false, explanation: "HE alone cannot prove correctness; ZK alone cannot compute on hidden data efficiently." },
          { id: "d", label: "Combining them is only a marketing term", isCorrect: false, explanation: "The combination is a real research direction (e.g. verifiable computation, ZKML)." },
        ],
        explanation: "The primitives compose: homomorphic encryption hides the data being processed, zero-knowledge proofs certify that the processing followed the agreed rules — privacy plus accountability.",
      },
    ],
  },

}

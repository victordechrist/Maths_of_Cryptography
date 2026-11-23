import { DetailedLessonContent } from "./types"

export const testLessons: Record<string, DetailedLessonContent> = {
  "test-1": {
    slug: "test-1",
    sections: [
      {
        id: "overview",
        title: "Overview",
        content: "This is Test 1, a periodic checkpoint of the course. It assesses the knowledge, experience, and insight you acquired across the modules covered:",
      },
      {
        id: "topics",
        title: "Topics Assessed",
        content: "The checkpoint draws on **Foundations of Number Theory & Modular Arithmetic** (divisibility, the Euclidean algorithm, modular arithmetic, CRT, primes) and **Abstract Algebra for Cryptography** (groups, rings, finite fields).",
      },
      {
        id: "covered",
        title: "Lessons Covered",
        content: "The checkpoint draws on:\n- Divisibility & The Euclidean Algorithm — GCD, Bézout's identity, and modular inverses via the Extended Euclidean Algorithm.\n- Modular Arithmetic & Congruences — equivalence classes, modular operations, fast exponentiation.\n- Prime Numbers & Primality Testing — prime distribution, Fermat's little theorem, Miller-Rabin.\n- Chinese Remainder Theorem & Modular Systems — CRT construction and multi-modular reconstruction.\n- Group Theory & Cyclic Groups — groups, orders, Lagrange's theorem, generators.\n- Ring Theory & Polynomial Rings — rings, ideals, and polynomial arithmetic.\n- Finite Fields (Galois Fields) & Field Arithmetic — GF(p^n), irreducible polynomials, field operations.",
      },
      {
        id: "how-it-works",
        title: "How the Test Works",
        content: "The test has **two parts**: a consensus reasoning exercise in the Workspace tab with eight scenes (double the usual three), scored against a gold tree covering all four topics; and a Quiz tab with twelve auto-graded multiple-choice questions with instant feedback and explanations. Your best quiz score is saved, so you can retake it.",
      },
      {
        id: "assessment",
        title: "What Is Being Assessed",
        content: "- **Knowledge** — do you know the definitions and mechanisms from the covered lessons?\n- **Experience** — can you apply them in the reasoning scenes, connecting concepts across lessons?\n- **Insight** — can you explain *why* each construction or proof technique matters?",
      },
      {
        id: "closing",
        title: "Closing",
        content: "This checkpoint covers the number-theoretic and algebraic foundations of the course.",
      },
    ],
    summaryTakeaways: [
      "Checkpoint tests cover the modules since the previous checkpoint.",
      "Reasoning scenes build a consensus tree scored against a gold tree.",
      "The quiz gives instant feedback with explanations; best score is saved.",
    ],
  },
  "test-2": {
    slug: "test-2",
    sections: [
      {
        id: "overview",
        title: "Overview",
        content: "This is Test 2, a periodic checkpoint of the course. It assesses the knowledge, experience, and insight you acquired across the modules covered:",
      },
      {
        id: "topics",
        title: "Topics Assessed",
        content: "The checkpoint draws on **Symmetric Cryptography & Mathematical Foundations** (classical ciphers, stream ciphers, block ciphers/AES, hashes & MAC) and **Public-Key Cryptography & Asymmetric Algorithms** (RSA, Diffie-Hellman, ElGamal).",
      },
      {
        id: "covered",
        title: "Lessons Covered",
        content: "The checkpoint draws on:\n- Classical Ciphers & Cryptanalysis — substitution, transposition, frequency analysis, Kerckhoffs's principle.\n- Stream Ciphers & Pseudo-Random Generators — keystreams, LFSRs, and PRNG security.\n- Block Ciphers & Modern AES Mathematics — AES rounds, modes of operation (ECB/CBC/CTR), and the finite-field arithmetic underneath.\n- Hash Functions & Message Authentication — SHA-style compression, avalanche, HMAC.\n- RSA Cryptosystem & Integer Factorization — key generation, encrypt/decrypt, and why factoring is the barrier.\n- Diffie-Hellman Key Exchange & Discrete Logarithms — shared-secret establishment and the discrete-log assumption.\n- ElGamal Cryptosystem & Digital Signatures — probabilistic encryption and signature schemes built on discrete logs.",
      },
      {
        id: "how-it-works",
        title: "How the Test Works",
        content: "The test has **two parts**: a consensus reasoning exercise in the Workspace tab with eight scenes (double the usual three), scored against a gold tree covering all four topics; and a Quiz tab with twelve auto-graded multiple-choice questions with instant feedback and explanations. Your best quiz score is saved, so you can retake it.",
      },
      {
        id: "assessment",
        title: "What Is Being Assessed",
        content: "- **Knowledge** — do you know the definitions and mechanisms from the covered lessons?\n- **Experience** — can you apply them in the reasoning scenes, connecting concepts across lessons?\n- **Insight** — can you explain *why* each construction or proof technique matters?",
      },
      {
        id: "closing",
        title: "Closing",
        content: "This checkpoint covers the symmetric and public-key halves of the course.",
      },
    ],
    summaryTakeaways: [
      "Checkpoint tests cover the modules since the previous checkpoint.",
      "Reasoning scenes build a consensus tree scored against a gold tree.",
      "The quiz gives instant feedback with explanations; best score is saved.",
    ],
  },
  "test-3": {
    slug: "test-3",
    sections: [
      {
        id: "overview",
        title: "Overview",
        content: "This is Test 3, a periodic checkpoint of the course. It assesses the knowledge, experience, and insight you acquired across the modules covered:",
      },
      {
        id: "topics",
        title: "Topics Assessed",
        content: "The checkpoint draws on **Elliptic Curve Cryptography** (curve equations, the group law, ECDH/ECDSA, pairings) and **Advanced & Post-Quantum Cryptography** (lattice-based cryptography & LWE, zero-knowledge proofs, homomorphic encryption & MPC).",
      },
      {
        id: "covered",
        title: "Lessons Covered",
        content: "The checkpoint draws on:\n- Elliptic Curves over Real & Finite Fields — curve equations, the group law, scalar multiplication.\n- ECDH & ECDSA Protocols — key agreement and digital signatures on curves, nonce discipline.\n- Pairing-Based Cryptography & Advanced Curves — bilinear pairings, MOV, BLS aggregation.\n- Lattice-Based Cryptography & LWE — the Learning With Errors problem and lattice hardness.\n- Zero-Knowledge Proofs & Interactive Proof Systems — completeness, soundness, zero-knowledge, sigma protocols.\n- Homomorphic Encryption & Secure Multiparty Computation — FHE, Shamir sharing, and MPC protocols.",
      },
      {
        id: "how-it-works",
        title: "How the Test Works",
        content: "The test has **two parts**: a consensus reasoning exercise in the Workspace tab with eight scenes (double the usual three), scored against a gold tree covering all four topics; and a Quiz tab with twelve auto-graded multiple-choice questions with instant feedback and explanations. Your best quiz score is saved, so you can retake it.",
      },
      {
        id: "assessment",
        title: "What Is Being Assessed",
        content: "- **Knowledge** — do you know the definitions and mechanisms from the covered lessons?\n- **Experience** — can you apply them in the reasoning scenes, connecting concepts across lessons?\n- **Insight** — can you explain *why* each construction or proof technique matters?",
      },
      {
        id: "closing",
        title: "Closing",
        content: "This is the final checkpoint of the course.",
      },
    ],
    summaryTakeaways: [
      "Checkpoint tests cover the modules since the previous checkpoint.",
      "Reasoning scenes build a consensus tree scored against a gold tree.",
      "The quiz gives instant feedback with explanations; best score is saved.",
    ],
  },
}

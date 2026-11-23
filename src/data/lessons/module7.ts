import { DetailedLessonContent } from "./types"

export const module7Lessons: Record<string, DetailedLessonContent> = {
  "cumulative-test": {
    slug: "cumulative-test",
    sections: [
      {
        id: "overview",
        title: "Overview",
        content: "This is the cumulative test lab for the advanced cryptography stretch of the course. It assesses the knowledge, experience, and insight you acquired across the last four lessons:",
      },
      {
        id: "topics",
        title: "Topics Assessed",
        content: "The test draws on four lessons: **Pairing-Based Cryptography & Advanced Curves** (bilinear pairings, the MOV reduction, BLS aggregate signatures), **Lattice-Based Cryptography & LWE** (the Learning With Errors problem, lattice hardness, short-secret constructions), **Zero-Knowledge Proofs & Interactive Proof Systems** (the zero-knowledge property, sigma protocols, soundness), and **Homomorphic Encryption & Secure Multiparty Computation** (homomorphic evaluation, Shamir secret sharing, and MPC).",
      },
      {
        id: "how-it-works",
        title: "How the Test Works",
        content: "The test has **two parts**:",
        callout: {
          type: "tip",
          title: "Part 1 — Workspace (Reasoning)",
          content: "A consensus reasoning exercise with **eight scenes** (double the usual number). Each scene presents a concept from the lessons above; build your reasoning in the tree and commit thoughts as you would in any lesson. The tree is scored against a gold tree covering all four topics.",
        },
      },
      {
        id: "quiz-part",
        title: "Part 2 — Knowledge Check Quiz",
        content: "**Twelve auto-graded multiple-choice questions** covering the same four lessons, appearing in the **Knowledge Check Quiz** section below. Answer all of them; you get instant feedback with an explanation after each answer.",
        callout: {
          type: "warning",
          title: "What Is Being Assessed",
          content: "- **Knowledge** — do you know the mechanisms (pairings, LWE, sigma protocols, homomorphic operations)?\n- **Experience** — can you apply them in the reasoning scenes, connecting concepts across lessons?\n- **Insight** — can you explain *why* each primitive exists (hardness assumptions, zero-knowledge simulation, privacy without trust)?",
        },
      },
    ],
    summaryTakeaways: [
      "The test lab combines an eight-scene consensus reasoning exercise with a twelve-question auto-graded quiz.",
      "It covers pairing-based cryptography, lattice-based cryptography & LWE, zero-knowledge proofs, and homomorphic encryption & MPC.",
      "Knowledge, experience, and insight are assessed through both reasoning and recall."
    ]
  }
}

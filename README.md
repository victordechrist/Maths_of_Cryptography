# Mathematics of Cryptography — Open Courseware

An open-source, interactive web course for **Mathematics of Cryptography**, designed for computer scientists, cybersecurity engineers, and mathematicians.

Mirroring the design language and component structure of modern open courseware platforms, this project provides rigorous mathematical foundations alongside live, client-side interactive cryptography labs.

---

## 🚀 Quickstart & Local Setup

### Prerequisites
- **Node.js**: v18.x or v20.x+
- **npm**: v9.x+

### Setup Commands
```bash
# 1. Clone the repository
git clone https://github.com/organization/mathematics-of-cryptography.x
cd mathematics-of-cryptography

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling & Design**: [Tailwind CSS v4](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)
- **Mathematics Rendering**: [KaTeX](https://katex.org/) (rendered securely via custom `FormattedText` component)
- **Icons**: [Lucide React](https://lucide.react.dev/)
- **Theme Support**: `next-themes` (Dark Mode & Light Mode support)
- **Persistence**: `localStorage` (Client-side lesson completion, quiz scores, and challenge progress)

---

## 🔒 Zero External Dependencies / Backend Requirements

This courseware is completely **self-contained and zero-backend**:
- **No Database**: All course metadata, syllabus structures, lesson content, and quizzes are stored in strongly typed TypeScript modules in `src/data/`.
- **No Environment Variables / API Keys Required**: All interactive cryptographic tools (Caesar cipher, Frequency analysis, Modular arithmetic, Diffie-Hellman key exchange, RSA key generator, and Elliptic curve point addition) are pure client-side algorithms.
- **No Authentication Required**: User progress is stored locally in the browser's `localStorage`.

---

## 📖 Single Source of Truth: The Syllabus

The course content is strictly driven by `src/data/syllabus.ts`. Every module, topic, and lesson directly corresponds to the 6 core modules:

1. **Foundations of Number Theory & Modular Arithmetic**
2. **Abstract Algebra for Cryptography**
3. **Symmetric Cryptography & Information Theory**
4. **Public-Key Cryptography & Hard Problems**
5. **Elliptic Curve Cryptography (ECC)**
6. **Advanced Topics & Modern Cryptography**

---

## ➕ How to Add or Modify a Lesson

1. **Update `src/data/syllabus.ts`**:
   Add a new `Lesson` object to the appropriate `Module` in `syllabusModules`:
   ```ts
   {
     slug: "new-cryptographic-primitive",
     title: "New Cryptographic Primitive",
     order: 4,
     description: "Overview of the new primitive...",
     estimatedTime: "2 Hours",
     keyTopics: ["Topic A", "Topic B"]
   }
   ```

2. **Add Content in `src/data/lessons/`**:
   Create or edit the relevant module file in `src/data/lessons/` (e.g., `module1.ts`):
   ```ts
   export const newLessonDetail: LessonDetail = {
     slug: "new-cryptographic-primitive",
     moduleSlug: "foundations-number-theory",
     sections: [
       {
         id: "overview",
         title: "Overview",
         content: "Mathematical description using LaTeX like $E(m) = m^e \\bmod n$...",
         callout: {
           type: "note",
           title: "Key Takeaway",
           content: "Note content here..."
         }
       }
     ],
     summaryTakeaways: ["Takeaway 1", "Takeaway 2"]
   }
   ```

3. **Export from `src/data/lessons/index.ts`**:
   Include the new `LessonDetail` in `allLessonDetails`.

4. **Static Page Generation**:
   Next.js will automatically detect the new slug during `npm run build` and generate static pages for `/lessons/[slug]` and `/modules/[moduleSlug]/[lessonSlug]`.

---

## 🧪 Build & Lint Checks

```bash
# Run ESLint checks
npm run lint

# Build production static bundle
npm run build
```

---

## 🌐 Deploying to Vercel

1. Push your changes to GitHub.
2. Import the repository in [Vercel](https://vercel.com/).
3. Framework Preset: **Next.js**.
4. Build Command: `npm run build`.
5. Output Directory: `.next`.
6. Click **Deploy** (No environment variables required).

---

## 🧩 Guided Exercises & Reasoning Trees (`moc:v1`)

Two interactive features live alongside the lessons — both fully client-side, persisted in `localStorage` under the `moc:v1` namespace (independent of `crypto_course_progress`):

- **Exercise** — drag-and-drop guided construction: assemble the algorithm one step at a time. Sequential step locking, deterministic shuffle, checks report only "N of M in the right place", free resets, ArrowUp/ArrowDown keyboard reordering.
- **Workspace** — a consensus (reasoning) tree: narrated scenes elicit a committed thought per scene; the tree scores against a hidden gold tree (alignment %, confirmed/error/pruned counts).

### Authoring an exercise

One file per lesson at `src/lib/exercises/lessons/l<M>-<order>.ts` (e.g. `l1-1.ts` = module 1, order 1), registered in `src/lib/exercises/index.ts` keyed by the lesson slug:

```ts
export const l1_1Exercise: LabExercise = {
  labSlug: 'divisibility-euclidean-algorithm', // must match syllabus.ts
  title: 'The Extended Euclidean Algorithm',
  intro: 'One line on what the student builds and why.',
  steps: [{
    id: 'l1-1-s1', order: 1,
    title: 'Extended GCD loop',
    instruction: 'What to assemble and why the order matters.',
    expectedInput: 'a, b (a > b > 0)',
    expectedOutput: '(gcd, x, y) with a·x + b·y = gcd',
    solution: ['b1', 'b2', 'b3'],        // ordered block ids — never rendered
    blocks: [
      { id: 'b1', code: 'def extended_gcd(a, b):', caption: 'signature' },
      // ...
      { id: 'b9', code: '...', caption: 'why it tempts', isDistractor: true },
    ],
  }],
};
```

Invariants: solutions concatenate into valid Python; 1–2 `isDistractor` blocks per step encode the lesson's real misconception; `solution`/`isDistractor` stay out of rendered DOM.

### Authoring a reasoning task

One file per lesson at `src/lib/consensus/tasks/l<M>-<order>.ts`, registered in `src/lib/consensus/index.ts`:

```ts
export const l1_1Task: LabTask = {
  labSlug: 'divisibility-euclidean-algorithm',
  title: '…', brief: '…',
  scenes: [{ id, order, title, narration, goal, goldNodeIds, elicitation: 'code-cell', hints }],
  goldTree: { /* 10 nodes: goal → 3 subgoals → operator/evidence leaves, ≤2 children/node */ },
};
```

Invariants: `error` commits branch as dead-end children (never mutate the parent); repairs add a `repairs` edge and prune the target; the gold tree stays locked until ≥1 commit per scene, then is read-only; matching is token-overlap (threshold 0.4, min 2 hits) — phrasing does not need to be exact.

### Storage contract

- `moc:v1:exercise:{lessonSlug}:{stepId}` → `ExerciseStepProgress` (placed ids, attempts, completedAt)
- `moc:v1:tree:{lessonSlug}` → `ConsensusGraph`
- Bump the `v1` segment only if a persisted shape changes incompatibly.

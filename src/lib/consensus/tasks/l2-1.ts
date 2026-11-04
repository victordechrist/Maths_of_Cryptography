import type { LabTask } from '../types';

// Lesson 2.1 — Group Theory & Cyclic Groups.
export const l2_1Task: LabTask = {
  labSlug: 'group-theory-cyclic-groups',
  title: "Why Cyclic Groups \u2014 and Why Generators Matter",
  brief:
    "Argue the three pillars of group-based crypto: closure plus inverses make exponentiation safe, a generator determines how much keyspace the group really offers, and the order decides whether discrete log is even worth attacking.",
  scenes: [
    {
      id: 'scene-l2-1-1',
      order: 1,
      title: "Axioms buy safety",
      narration:
        "A group guarantees closure, associativity, identity, and inverses. Exponentiation g^e stays inside the set forever, and every element can be undone \u2014 this is why operations in Z*_p or on an elliptic curve never 'leave' the system the implementer planned for.",
      goal: "Commit why the four axioms are exactly what a cryptosystem needs from its carrier set.",
      goldNodeIds: ['s1', 'x1', 'x2'],
      elicitation: 'code-cell',
      hints: [
        "Closure keeps results in-range; inverses let the protocol reverse steps it must.",
        "Associativity is what makes exponentiation well-defined."
      ],
    },
    {
      id: 'scene-l2-1-2',
      order: 2,
      title: "Generators set the keyspace",
      narration:
        "A generator g produces every element of the group by powering. If g's order is small, exponentiation wraps early and the effective keyspace collapses \u2014 DH params with a small-subgroup generator leak keys. The order of g IS the number of distinct secrets available.",
      goal: "Commit the link: order of the generator = size of the reachable keyspace.",
      goldNodeIds: ['s2', 'x3', 'x4'],
      elicitation: 'code-cell',
      hints: [
        "Small order \u21d2 repeated cycle \u21d2 few distinct keys.",
        "ord(g) = \u03c6(m) means full coverage \u2014 a primitive root."
      ],
    },
    {
      id: 'scene-l2-1-3',
      order: 3,
      title: "Order decides hardness",
      narration:
        "Discrete log asks for e given g^e. Pollard-rho attacks run in O(\u221aorder), so security scales with the square root of the subgroup order \u2014 not the modulus size. Prime-order subgroups (safe primes, Pohlig\u2013Hellman resistance) exist precisely to deny the attack cheap factors to exploit.",
      goal: "Commit why cryptographers pick prime-order subgroups: attack cost is driven by the order's largest prime factor.",
      goldNodeIds: ['s3', 'x5', 'x6'],
      elicitation: 'code-cell',
      hints: [
        "Pohlig\u2013Hellman splits the problem along the order's factorization.",
        "\u221aq work for order q \u2014 a 256-bit prime order gives ~128-bit security."
      ],
    },
  ],
  goldTree: {
    labSlug: 'group-theory-cyclic-groups',
    rootId: 'g1',
    version: 1,
    prunedNodeIds: [],
    activePath: ['g1', 's1', 's2', 's3', 'x1', 'x2', 'x3', 'x4', 'x5', 'x6'],
    nodes: [
      { id: 'g1', label: "Justify cyclic groups as crypto's carrier",
        content: "Axioms make exponentiation safe; generator order sets keyspace; prime order defeats cheap factoring of the log problem.",
        kind: 'goal', status: 'confirmed', parentId: null },
      { id: 's1', label: "Axioms \u27f9 safe carrier",
        content: "Closure + inverses keep every protocol step inside the intended set.",
        kind: 'subgoal', status: 'confirmed' },
      { id: 's2', label: "Generator order = keyspace",
        content: "Reachable secrets equal ord(g); small orders collapse coverage.",
        kind: 'subgoal', status: 'confirmed' },
      { id: 's3', label: "Prime order sets attack cost",
        content: "Discrete-log attacks run in ~\u221a(largest prime factor of the order).",
        kind: 'subgoal', status: 'confirmed' },
      { id: 'x1', label: "Closure + inverse",
        content: "Every operation stays in-group and reversible \u2014 required by DH/ECC.",
        kind: 'operator', status: 'confirmed' },
      { id: 'x2', label: "Associativity",
        content: "Exponentiation only makes sense because regrouping is free.",
        kind: 'evidence', status: 'confirmed' },
      { id: 'x3', label: "ord(g) bounds coverage",
        content: "g cycles through at most ord(g) distinct elements \u2014 the effective keyspace.",
        kind: 'evidence', status: 'confirmed' },
      { id: 'x4', label: "Primitive root = full coverage",
        content: "ord(g) = \u03c6(m) \u21d2 every unit is reachable \u2014 maximal keyspace.",
        kind: 'evidence', status: 'confirmed' },
      { id: 'x5', label: "Pohlig\u2013Hellman",
        content: "Composite order splits discrete log into the order's factors \u2014 cheap when all factors are small.",
        kind: 'operator', status: 'confirmed' },
      { id: 'x6', label: "Pollard-rho O(\u221aq)",
        content: "Generic attacks cost \u221aq for prime order q \u2014 sets the security level.",
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

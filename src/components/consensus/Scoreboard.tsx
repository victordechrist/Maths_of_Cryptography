'use client';

import type { OutcomeAssessment, Scene } from '@/lib/consensus/types';
import type { TreeScore } from '@/lib/consensus/tree';
import { cn } from '@/lib/utils';
import { CheckCircle2, Circle, CircleDot, Info, Target } from 'lucide-react';

interface ScoreboardProps {
  score: TreeScore;
  scenes: Scene[];
  /** Scene ids the student has committed at least one thought under. */
  committedSceneIds: ReadonlySet<string>;
  /** False during SSR/first paint — renders the empty state. */
  hydrated: boolean;
  hasCommits: boolean;
  /** Advisory LLM process-rating counts across the student's nodes. */
  processCounts?: { sure: number; maybe: number; impossible: number };
  /** Latest advisory path-level outcome assessment, if any. */
  outcome?: OutcomeAssessment | null;
  /** Manual "Assess my path" handler — absent hides the whole block. */
  onAssessOutcome?: () => void;
  assessingOutcome?: boolean;
}

export function Scoreboard({ score, scenes, committedSceneIds, hydrated, hasCommits, processCounts, outcome, onAssessOutcome, assessingOutcome }: ScoreboardProps) {
  const ordered = [...scenes].sort((a, b) => a.order - b.order);
  const reached = new Set(score.reachedSceneIds);
  const pct = hydrated ? score.goldMatchPct : 0;

  return (
    <section
      aria-label="Scoreboard"
      className="space-y-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-slate-100">
          <Target className="h-4 w-4 text-emerald-500" /> Scoreboard
        </h3>
        <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
          {hydrated ? `${score.goldMatchedCount}/${score.goldTotal}` : `0/${score.goldTotal}`} gold nodes
        </span>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between text-xs font-semibold">
          <span className="text-slate-500 dark:text-slate-400">Official score (gold-tree alignment)</span>
          <span className="font-mono text-emerald-600 dark:text-emerald-400">{pct}%</span>
        </div>
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
          aria-label="Gold-tree alignment"
          className="h-2.5 w-full overflow-hidden rounded-full border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-950"
        >
          <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <dl className="grid grid-cols-3 gap-2 text-center">
        {[
          { label: 'Confirmed', value: score.confirmedCount, tone: 'text-emerald-600 dark:text-emerald-400' },
          { label: 'Errors', value: score.errorCount, tone: 'text-red-600 dark:text-red-400' },
          { label: 'Pruned', value: score.prunedCount, tone: 'text-slate-600 dark:text-slate-300' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg border border-slate-200 p-2 dark:border-slate-800">
            <dt className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {stat.label}
            </dt>
            <dd className={cn('font-mono text-lg font-bold', stat.tone)}>{hydrated ? stat.value : 0}</dd>
          </div>
        ))}
      </dl>

      {processCounts &&
        processCounts.sure + processCounts.maybe + processCounts.impossible > 0 && (
          <div className="rounded-lg border border-slate-200 p-2.5 dark:border-slate-800">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Process signals (advisory)
            </p>
            <p className="mt-1 font-mono text-xs text-slate-600 dark:text-slate-300">
              <span className="text-emerald-600 dark:text-emerald-400">{processCounts.sure} sure</span>
              {' · '}
              <span className="text-amber-600 dark:text-amber-400">{processCounts.maybe} maybe</span>
              {' · '}
              <span className="text-red-600 dark:text-red-400">{processCounts.impossible} impossible</span>
            </p>
            <p className="mt-1 text-[10px] leading-snug text-slate-400 dark:text-slate-500">
              LLM-rated reasoning steps — advisory only, never affects the official score.
            </p>
          </div>
        )}

      {onAssessOutcome && (
        <div className="rounded-lg border border-slate-200 p-2.5 dark:border-slate-800">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Outcome assessment (LLM, advisory)
          </p>
          {outcome ? (
            <p className="mt-1 text-xs leading-snug text-slate-600 dark:text-slate-300">
              <span
                className={cn(
                  'font-semibold',
                  outcome.verdict === 'on-track'
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : outcome.verdict === 'partial'
                      ? 'text-amber-600 dark:text-amber-400'
                      : 'text-red-600 dark:text-red-400',
                )}
              >
                {outcome.verdict}
              </span>
              {' — '}
              {outcome.summary}
            </p>
          ) : (
            <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
              No assessment yet — checks whether your overall path is on track.
            </p>
          )}
          <button
            type="button"
            onClick={onAssessOutcome}
            disabled={assessingOutcome}
            className="mt-2 rounded-md border border-slate-300 px-2.5 py-1 text-[11px] font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {assessingOutcome ? 'Assessing…' : outcome ? 'Re-assess my path' : 'Assess my path'}
          </button>
        </div>
      )}

      <p
        aria-live="polite"
        className="flex items-start gap-2 rounded-lg bg-slate-50 p-3 text-xs font-medium text-slate-700 dark:bg-slate-950 dark:text-slate-300"
      >
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-sky-500" />
        {hydrated && hasCommits
          ? score.feedback
          : 'Awaiting your first thought — commit one to start measuring alignment.'}
      </p>

      <div className="space-y-1.5">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Scene checklist
        </p>
        <ul className="space-y-1">
          {ordered.map((scene) => {
            const isReached = hydrated && reached.has(scene.id);
            const isTouched = hydrated && committedSceneIds.has(scene.id);
            return (
              <li key={scene.id} className="flex items-center gap-2 text-xs">
                {isReached ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" aria-hidden />
                ) : isTouched ? (
                  <CircleDot className="h-4 w-4 text-amber-500" aria-hidden />
                ) : (
                  <Circle className="h-4 w-4 text-slate-300 dark:text-slate-600" aria-hidden />
                )}
                <span
                  className={cn(
                    isReached
                      ? 'text-emerald-700 dark:text-emerald-300'
                      : 'text-slate-600 dark:text-slate-300',
                  )}
                >
                  Scene {scene.order}: {scene.title}
                </span>
                <span className="sr-only">
                  {isReached ? '(goal reached)' : isTouched ? '(in progress)' : '(not started)'}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

import type { Metadata } from 'next';
import { labs } from '@/data/labs';
import { ProgressRow } from '@/components/progress/ProgressRow';
import { ActivityExportButtons } from '@/components/progress/ActivityExportButtons';

export const metadata: Metadata = {
  title: 'My progress',
  description: 'Exercise completion and reasoning-tree alignment across all labs.',
};

export default function ProgressPage() {
  const visible = labs;
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold tracking-tight">My progress</h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Stored locally in your browser — exercise steps completed and consensus-tree
        alignment per lab. A lab counts as complete when all exercise steps are done
        and its tree reaches 80% alignment.
      </p>
      <div className="mt-4">
        <ActivityExportButtons />
      </div>
      <ul className="mt-6 space-y-2">
        {visible.map((lab) => (
          <ProgressRow key={lab.slug} lab={lab} />
        ))}
      </ul>
    </div>
  );
}

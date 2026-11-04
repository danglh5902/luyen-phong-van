import { useEffect, useState } from 'react';
import { getLearned, setLearned } from '../lib/progress';

export default function LearnedButton({ id }: { id: string }) {
  const [on, setOn] = useState(false);
  useEffect(() => setOn(getLearned().has(id)), [id]);
  return (
    <button
      onClick={() => { setLearned(id, !on); setOn(!on); }}
      aria-pressed={on}
      className={`rounded-xl px-5 py-2.5 text-sm font-semibold shadow-sm transition ${
        on
          ? 'bg-emerald-600 text-white hover:bg-emerald-500'
          : 'border border-slate-300 bg-white hover:bg-slate-50 dark:border-white/15 dark:bg-white/5 dark:hover:bg-white/10'
      }`}
    >
      {on ? '✓ Đã thuộc' : 'Đánh dấu đã thuộc'}
    </button>
  );
}

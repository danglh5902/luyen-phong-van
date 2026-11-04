import { useEffect, useState } from 'react';
import { getLearned } from '../lib/progress';

/** ids: danh sách id câu hỏi cần tính tiến độ */
export default function Progress({ ids, label = 'Tiến độ', color }: { ids: string[]; label?: string; color?: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const upd = () => { const l = getLearned(); setN(ids.filter((id) => l.has(id)).length); };
    upd();
    window.addEventListener('lpv:progress', upd);
    return () => window.removeEventListener('lpv:progress', upd);
  }, [ids]);
  const pct = ids.length ? Math.round((n / ids.length) * 100) : 0;
  return (
    <div>
      <div className="mb-1.5 flex justify-between text-xs font-medium text-slate-500"><span>{label}</span><span>{n}/{ids.length} · {pct}%</span></div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: color ? color : 'linear-gradient(90deg,#6366f1,#a855f7)' }}
        />
      </div>
    </div>
  );
}

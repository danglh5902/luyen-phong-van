import { useEffect, useMemo, useRef, useState } from 'react';
import Fuse from 'fuse.js';

interface Item { id: string; title: string; topic: string; tags: string[]; level: string }

export default function Search({ index, base }: { index: Item[]; base: string }) {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const fuse = useMemo(() => new Fuse(index, { keys: ['title', 'tags', 'topic'], threshold: 0.35 }), [index]);
  const results = q.trim() ? fuse.search(q).slice(0, 8) : [];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); ref.current?.focus(); }
      if (e.key === 'Escape') { setOpen(false); ref.current?.blur(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="relative w-full max-w-xs">
      <input
        ref={ref}
        value={q}
        onChange={(e) => { setQ(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        placeholder="Tìm câu hỏi…"
        aria-label="Tìm câu hỏi"
        className="h-9 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-12 text-sm placeholder:text-slate-400 dark:border-white/10 dark:bg-white/5"
      />
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">⌕</span>
      <kbd className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 sm:block">Ctrl K</kbd>
      {open && q.trim() && (
        <ul className="absolute right-0 mt-2 w-96 max-w-[90vw] overflow-hidden rounded-2xl border border-slate-200 bg-white p-1 shadow-2xl dark:border-white/10 dark:bg-[#12161f]">
          {results.length === 0 && <li className="px-3 py-3 text-sm text-slate-500">Không tìm thấy kết quả.</li>}
          {results.map(({ item }) => (
            <li key={item.id}>
              <a href={`${base}/q/${item.id}/`} className="block rounded-xl px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-white/5">
                <span className="font-medium text-slate-900 dark:text-white">{item.title}</span>
                <span className="mt-0.5 block text-xs text-slate-500">{item.topic} · {item.level}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

import { useEffect, useState } from 'react';
import { getLearned, setLearned } from '../lib/progress';

interface Card { id: string; title: string; answer: string; level: string; titleEn?: string; answerEn?: string }

export default function Flashcard({ cards, base, color = '#6366f1' }: { cards: Card[]; base: string; color?: string }) {
  const [i, setI] = useState(0);
  const [shown, setShown] = useState(false);
  const [learned, setL] = useState<Set<string>>(new Set());
  useEffect(() => setL(getLearned()), []);

  const card = cards[i];
  if (!card) return <p>Chưa có câu hỏi.</p>;
  const done = learned.has(card.id);
  const count = cards.filter((c) => learned.has(c.id)).length;
  const go = (d: number) => { setShown(false); setI((i + d + cards.length) % cards.length); };
  const mark = (v: boolean) => { setLearned(card.id, v); setL(getLearned()); go(1); };

  return (
    <div
      className="mx-auto max-w-2xl outline-none"
      tabIndex={0}
      style={{ ['--accent' as string]: color }}
      onKeyDown={(e) => {
        if (e.key === ' ') { e.preventDefault(); setShown((s) => !s); }
        if (e.key === 'ArrowRight') go(1);
        if (e.key === 'ArrowLeft') go(-1);
      }}
    >
      <div className="mb-4 flex items-center justify-between text-sm text-slate-500">
        <span className="font-semibold text-slate-700 dark:text-slate-200">Thẻ {i + 1}/{cards.length}</span>
        <span>Đã thuộc {count}/{cards.length}</span>
      </div>
      <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
        <div className="h-full rounded-full transition-all" style={{ width: `${((i + 1) / cards.length) * 100}%`, background: color }} />
      </div>

      <div className="flip">
        <button
          onClick={() => setShown(!shown)}
          aria-label={shown ? 'Ẩn đáp án' : 'Xem đáp án'}
          className={`flip-inner relative block h-80 w-full text-left ${shown ? 'is-flipped' : ''}`}
        >
          <div className="flip-face card absolute inset-0 flex flex-col justify-between overflow-auto p-8" style={{ borderTop: `4px solid ${color}` }}>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color }}>Câu hỏi{done && ' · ✓ đã thuộc'}</span>
            <div>
              <p className="text-2xl font-bold leading-snug text-slate-900 dark:text-white">{card.title}</p>
              {card.titleEn && <p className="mt-2 text-base text-slate-500">🇬🇧 {card.titleEn}</p>}
            </div>
            <span className="text-sm text-slate-400">Bấm hoặc nhấn Space để lật</span>
          </div>
          <div
            className="flip-face flip-back absolute inset-0 flex flex-col justify-between overflow-auto rounded-2xl p-8 text-white shadow-xl"
            style={{ background: `linear-gradient(135deg, ${color}, color-mix(in srgb, ${color} 50%, #000))` }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-white/70">Trả lời nhanh</span>
            <div>
              <p className="text-lg leading-relaxed">{card.answer}</p>
              {card.answerEn && <p className="mt-3 border-t border-white/25 pt-3 text-base leading-relaxed text-white/90">🇬🇧 {card.answerEn}</p>}
            </div>
            <span className="text-sm text-white/60">Bạn đã nhớ ý này chưa?</span>
          </div>
        </button>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <button onClick={() => go(-1)} aria-label="Thẻ trước" className="rounded-xl border border-slate-300 px-3 py-2 text-sm hover:bg-slate-100 dark:border-white/15 dark:hover:bg-white/10">←</button>
        <button onClick={() => mark(false)} className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-100 dark:border-white/15 dark:hover:bg-white/10">Chưa thuộc</button>
        <button onClick={() => mark(true)} className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-500">Đã thuộc ✓</button>
        <button onClick={() => go(1)} aria-label="Thẻ sau" className="rounded-xl border border-slate-300 px-3 py-2 text-sm hover:bg-slate-100 dark:border-white/15 dark:hover:bg-white/10">→</button>
        <a href={`${base}/q/${card.id}/`} className="ml-auto text-sm font-medium hover:underline" style={{ color }}>Xem chi tiết →</a>
      </div>
      <p className="mt-4 text-xs text-slate-400"><kbd>Space</kbd> lật · <kbd>←</kbd> <kbd>→</kbd> chuyển thẻ</p>
    </div>
  );
}

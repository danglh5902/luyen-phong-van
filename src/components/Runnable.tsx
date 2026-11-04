import { useState } from 'react';
import { transform } from 'sucrase';

/** Chạy JS/TS trong iframe sandbox, có timeout để tránh vòng lặp vô hạn. */
export default function Runnable({ code: initial, lang = 'js' }: { code: string; lang?: 'js' | 'ts' }) {
  const [code, setCode] = useState(initial.trim());
  const [out, setOut] = useState<string[] | null>(null);

  function run() {
    let js = code;
    try {
      if (lang === 'ts') js = transform(code, { transforms: ['typescript'] }).code;
    } catch (e) {
      setOut([`SyntaxError: ${(e as Error).message}`]);
      return;
    }
    const lines: string[] = [];
    const frame = document.createElement('iframe');
    frame.sandbox.add('allow-scripts');
    frame.style.display = 'none';
    const id = Math.random().toString(36).slice(2);
    const finish = () => {
      window.removeEventListener('message', onMsg);
      frame.remove();
      setOut(lines.length ? lines : ['(không có output)']);
    };
    const timer = setTimeout(() => { lines.push('⏱ Timeout (3s)'); finish(); }, 3000);
    function onMsg(e: MessageEvent) {
      if (e.source !== frame.contentWindow || e.data?.id !== id) return;
      if (e.data.type === 'log') lines.push(e.data.text);
      if (e.data.type === 'done') { clearTimeout(timer); finish(); }
    }
    window.addEventListener('message', onMsg);
    const boot = `
      const send = (type, text) => parent.postMessage({ id: ${JSON.stringify(id)}, type, text }, '*');
      const fmt = (v) => typeof v === 'string' ? v : (() => { try { return JSON.stringify(v) ?? String(v); } catch { return String(v); } })();
      console.log = (...a) => send('log', a.map(fmt).join(' '));
      console.error = (...a) => send('log', 'Error: ' + a.map(fmt).join(' '));
      (async () => {
        try { await (async () => { ${js.replace(/<\/script/gi, '<\\/script')}\n })(); }
        catch (e) { send('log', 'Uncaught ' + (e && e.message || e)); }
        setTimeout(() => send('done'), 50);
      })();`;
    frame.srcdoc = `<script>${boot}<\/script>`;
    document.body.appendChild(frame);
  }

  return (
    <div className="not-prose my-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#0f131c]">
      <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-3 py-2 dark:border-white/10 dark:bg-white/5">
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="h-3 w-3 rounded-full bg-rose-400" /><i className="h-3 w-3 rounded-full bg-amber-400" /><i className="h-3 w-3 rounded-full bg-emerald-400" />
        </span>
        <span className="ml-2 font-mono text-xs text-slate-500">{lang === 'ts' ? 'main.ts' : 'main.js'} · sửa được</span>
        <button onClick={run} className="ml-auto rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-3.5 py-1 text-xs font-semibold text-white shadow hover:opacity-90">▶ Chạy</button>
      </div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck={false}
        rows={Math.min(18, code.split('\n').length + 1)}
        aria-label="Code"
        className="block w-full resize-y bg-transparent p-4 font-mono text-[13.5px] leading-relaxed outline-none"
      />
      {out && (
        <div className="border-t border-slate-200 bg-slate-950 dark:border-white/10">
          <p className="px-4 pt-2 font-mono text-[10px] uppercase tracking-widest text-slate-500">Output</p>
          <pre className="m-0 whitespace-pre-wrap p-4 pt-1 font-mono text-[13px] text-emerald-300">{out.join('\n')}</pre>
        </div>
      )}
    </div>
  );
}

const KEY = 'lpv:learned';

export function getLearned(): Set<string> {
  try {
    return new Set(JSON.parse(localStorage.getItem(KEY) ?? '[]'));
  } catch {
    return new Set();
  }
}

export function setLearned(id: string, learned: boolean): void {
  try {
    const s = getLearned();
    learned ? s.add(id) : s.delete(id);
    localStorage.setItem(KEY, JSON.stringify([...s]));
    window.dispatchEvent(new CustomEvent('lpv:progress'));
  } catch {
    /* localStorage không khả dụng */
  }
}

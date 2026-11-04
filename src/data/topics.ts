export type TopicGroup = 'Ngôn ngữ' | 'Framework' | 'Hạ tầng & công cụ' | 'Nền tảng';

export interface Topic {
  id: string;
  name: string;
  icon: string;
  group: TopicGroup;
  desc: string;
  /** Màu nhấn của chủ đề (hex) */
  color: string;
}

export const topics: Topic[] = [
  { id: 'javascript', name: 'JavaScript', icon: 'JS', group: 'Ngôn ngữ', desc: 'Closure, event loop, this, prototype, async', color: '#eab308' },
  { id: 'html-css', name: 'HTML/CSS', icon: 'Cs', group: 'Ngôn ngữ', desc: 'Box model, flex/grid, specificity, responsive', color: '#ec4899' },
  { id: 'web', name: 'Web & Trình duyệt', icon: 'Wb', group: 'Nền tảng', desc: 'HTTP, CORS, cookie, XSS/CSRF, Web Vitals', color: '#8b5cf6' },
  { id: 'soft-skills', name: 'Kỹ năng mềm & HR', icon: 'HR', group: 'Nền tảng', desc: 'Giới thiệu bản thân, teamwork, deadline, lương (có tiếng Anh)', color: '#14b8a6' },
  { id: 'typescript', name: 'TypeScript', icon: 'TS', group: 'Ngôn ngữ', desc: 'Type system, generics, utility types', color: '#3b82f6' },
  { id: 'sql', name: 'SQL', icon: 'DB', group: 'Ngôn ngữ', desc: 'JOIN, index, transaction, tối ưu truy vấn', color: '#06b6d4' },
  { id: 'react', name: 'React', icon: 'Re', group: 'Framework', desc: 'Hooks, render, concurrent, performance', color: '#22d3ee' },
  { id: 'nextjs', name: 'Next.js', icon: 'Nx', group: 'Framework', desc: 'App Router, RSC, caching, SSR/SSG, middleware', color: '#64748b' },
  { id: 'nodejs', name: 'Node.js', icon: 'No', group: 'Framework', desc: 'Event loop, stream, worker, bảo mật API', color: '#22c55e' },
  { id: 'nestjs', name: 'NestJS', icon: 'Ne', group: 'Framework', desc: 'DI, guard, pipe, interceptor, microservice', color: '#e11d48' },
  { id: 'docker', name: 'Docker', icon: 'Dk', group: 'Hạ tầng & công cụ', desc: 'Image, container, volume, network', color: '#0ea5e9' },
  { id: 'git', name: 'Git', icon: 'Gt', group: 'Hạ tầng & công cụ', desc: 'Merge, rebase, workflow', color: '#f97316' },
  { id: 'system-design', name: 'System Design', icon: 'SD', group: 'Nền tảng', desc: 'Scale, cache, queue, CAP', color: '#a855f7' },
];

export const topicMap = Object.fromEntries(topics.map((t) => [t.id, t]));

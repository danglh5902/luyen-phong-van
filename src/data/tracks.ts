import type { CollectionEntry } from 'astro:content';
import { topicMap } from './topics';

export type Level = 'junior' | 'mid' | 'senior';
export type Tier = 'core' | 'plus' | 'bonus';
type Question = CollectionEntry<'questions'>;

export const levels: { id: Level; name: string; sub: string }[] = [
  { id: 'junior', name: 'Junior', sub: '0–2 năm · nắm vững nền tảng' },
  { id: 'mid', name: 'Mid', sub: '2–5 năm · làm chủ công việc hằng ngày' },
  { id: 'senior', name: 'Senior', sub: '5+ năm · thiết kế, đánh đổi, dẫn dắt' },
];

export const tierInfo: Record<Tier, { label: string; hint: string; cls: string }> = {
  core: { label: 'Bắt buộc', hint: 'Phải trả lời trôi chảy', cls: 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300' },
  plus: { label: 'Nên biết', hint: 'Hay được hỏi thêm', cls: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300' },
  bonus: { label: 'Cộng điểm', hint: 'Biết thêm càng tốt', cls: 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300' },
};

/**
 * Với mỗi cấp độ mục tiêu và mỗi tier, lấy câu hỏi level nào.
 * main = học kỹ, review = chỉ ôn nhanh lại.
 */
const rules: Record<Level, Record<Tier, { main: Level[]; review: Level[] }>> = {
  junior: {
    core: { main: ['junior'], review: [] },
    plus: { main: ['junior'], review: [] },
    bonus: { main: [], review: [] },
  },
  mid: {
    core: { main: ['junior', 'mid'], review: [] },
    plus: { main: ['mid'], review: ['junior'] },
    bonus: { main: ['junior'], review: [] },
  },
  senior: {
    core: { main: ['mid', 'senior'], review: ['junior'] },
    plus: { main: ['senior'], review: ['mid'] },
    bonus: { main: ['mid'], review: [] },
  },
};

type TierSpec = Tier | Partial<Record<Level, Tier>>;

/** Danh sách chủ đề theo vị trí, theo thứ tự nên ôn. Thiếu level nghĩa là không ôn ở level đó. */
export const roleTopics: Record<string, { topic: string; tier: TierSpec }[]> = {
  frontend: [
    { topic: 'html-css', tier: 'core' },
    { topic: 'javascript', tier: 'core' },
    { topic: 'typescript', tier: { junior: 'plus', mid: 'core', senior: 'core' } },
    { topic: 'react', tier: 'core' },
    { topic: 'nextjs', tier: { junior: 'bonus', mid: 'core', senior: 'core' } },
    { topic: 'web', tier: { junior: 'plus', mid: 'core', senior: 'core' } },
    { topic: 'git', tier: { junior: 'plus', mid: 'plus', senior: 'bonus' } },
    { topic: 'nodejs', tier: { mid: 'bonus', senior: 'plus' } },
    { topic: 'system-design', tier: { mid: 'bonus', senior: 'plus' } },
    { topic: 'soft-skills', tier: 'core' },
  ],
  backend: [
    { topic: 'javascript', tier: { junior: 'plus', mid: 'plus', senior: 'bonus' } },
    { topic: 'typescript', tier: 'core' },
    { topic: 'nodejs', tier: 'core' },
    { topic: 'nestjs', tier: 'core' },
    { topic: 'sql', tier: 'core' },
    { topic: 'web', tier: { junior: 'plus', mid: 'core', senior: 'core' } },
    { topic: 'docker', tier: { junior: 'plus', mid: 'core', senior: 'core' } },
    { topic: 'git', tier: { junior: 'plus', mid: 'plus', senior: 'bonus' } },
    { topic: 'system-design', tier: { junior: 'bonus', mid: 'plus', senior: 'core' } },
    { topic: 'soft-skills', tier: 'core' },
  ],
  fullstack: [
    { topic: 'html-css', tier: { junior: 'core', mid: 'plus', senior: 'bonus' } },
    { topic: 'javascript', tier: 'core' },
    { topic: 'typescript', tier: 'core' },
    { topic: 'react', tier: 'core' },
    { topic: 'nextjs', tier: 'core' },
    { topic: 'nodejs', tier: 'core' },
    { topic: 'nestjs', tier: { junior: 'plus', mid: 'core', senior: 'core' } },
    { topic: 'sql', tier: { junior: 'plus', mid: 'core', senior: 'core' } },
    { topic: 'web', tier: 'core' },
    { topic: 'docker', tier: { mid: 'plus', senior: 'plus' } },
    { topic: 'git', tier: { junior: 'plus', mid: 'plus', senior: 'bonus' } },
    { topic: 'system-design', tier: { mid: 'plus', senior: 'core' } },
    { topic: 'soft-skills', tier: 'core' },
  ],
  devops: [
    { topic: 'git', tier: 'core' },
    { topic: 'docker', tier: 'core' },
    { topic: 'web', tier: { junior: 'plus', mid: 'core', senior: 'core' } },
    { topic: 'sql', tier: { junior: 'bonus', mid: 'plus', senior: 'plus' } },
    { topic: 'system-design', tier: { junior: 'plus', mid: 'core', senior: 'core' } },
    { topic: 'soft-skills', tier: 'core' },
  ],
};

/** Kỳ vọng của nhà tuyển dụng ở từng vị trí + cấp độ. */
export const goals: Record<string, Record<Level, string[]>> = {
  frontend: {
    junior: [
      'Viết được HTML/CSS đúng semantic, responsive với Flexbox/Grid',
      'Hiểu JavaScript cốt lõi: scope, closure, this, async/await',
      'Dùng React thành thạo ở mức cơ bản: state, props, effect, list/key',
      'Biết dùng Git hằng ngày và hiểu HTTP, cookie, CORS ở mức khái niệm',
    ],
    mid: [
      'Giải thích được vì sao component re-render và biết tối ưu có đo đạc',
      'Dùng TypeScript chắc tay: generics, narrowing, utility types',
      'Hiểu rendering của Next.js: Server/Client Components, caching, Server Actions',
      'Nắm bảo mật và hiệu năng web: XSS/CSRF, CSP, Core Web Vitals, accessibility',
      'Quản lý state/server state hợp lý (React Query, Context) và test với RTL',
    ],
    senior: [
      'Giải thích cơ chế bên trong: Fiber, concurrent rendering, event loop, hydration',
      'Thiết kế kiến trúc FE: cấu trúc project, state, caching, chiến lược render (SSR/ISR/PPR)',
      'Phân tích và cải thiện hiệu năng: bundle, virtualization, Web Vitals, critical path',
      'Quyết định đánh đổi có lý do (Server vs Client, thư viện state, micro-frontend)',
      'Hiểu đủ về BE/hạ tầng để phối hợp: API design, auth, CDN, deploy',
    ],
  },
  backend: {
    junior: [
      'Nắm Node.js cơ bản: event loop, module, async, Express middleware',
      'Viết được SQL cơ bản: JOIN, GROUP BY, index, transaction',
      'Hiểu REST, status code, JWT/session ở mức dùng được',
      'Biết cấu trúc NestJS: module, controller, provider, DI, pipe validate',
    ],
    mid: [
      'Nắm vòng đời request trong NestJS: guard, interceptor, pipe, filter',
      'Thiết kế API đúng chuẩn: validation, pagination, idempotency, lỗi nhất quán',
      'Tối ưu truy vấn: index, EXPLAIN, N+1, transaction và isolation level',
      'Đóng gói và chạy dịch vụ bằng Docker/Compose, quản lý config và secret',
      'Test được service/controller (Jest, Supertest) và logging có request id',
    ],
    senior: [
      'Thiết kế hệ thống: scale, cache, queue, sharding, consistency, idempotency',
      'Xử lý sự cố Node: memory leak, blocking event loop, graceful shutdown',
      'Chọn kiến trúc có lý do: monolith vs microservices, CQRS, event-driven, saga',
      'Bảo mật và vận hành: auth flow, rate limit, observability, container security',
      'Tối ưu hiệu năng nền tảng: connection pool, keep-alive, provider scope, Fastify',
    ],
  },
  fullstack: {
    junior: [
      'HTML/CSS/JS vững, dựng được giao diện responsive bằng React',
      'Tự viết được API cơ bản với Node/Express và truy vấn SQL đơn giản',
      'Hiểu luồng request từ trình duyệt đến server và dữ liệu về lại',
    ],
    mid: [
      'Làm trọn một tính năng từ UI (React/Next.js) đến API (NestJS) và DB',
      'Hiểu rendering Next.js và vòng đời request NestJS để debug được cả hai phía',
      'Dùng TypeScript chung cho FE/BE, validate dữ liệu ở biên',
      'Biết bảo mật web, auth (JWT/cookie), CORS và triển khai bằng Docker',
    ],
    senior: [
      'Thiết kế end-to-end: chọn render strategy, API contract, cache, auth, deploy',
      'Phân tích hiệu năng toàn tuyến: Web Vitals, bundle, truy vấn DB, caching',
      'Cân nhắc đánh đổi giữa các kiến trúc và giải thích được cho team',
      'Xử lý sự cố sản xuất và có tư duy vận hành (log, metrics, graceful shutdown)',
    ],
  },
  devops: {
    junior: [
      'Dùng Git thành thạo: branch, merge, rebase, xử lý conflict',
      'Hiểu Docker: image, container, volume, network, Dockerfile cơ bản',
      'Hiểu nền tảng web và hệ thống: HTTP, DNS, load balancer',
    ],
    mid: [
      'Viết Dockerfile tối ưu (multi-stage, cache) và Compose có healthcheck',
      'Quản lý secret, config, logging và debug container',
      'Thiết kế quy trình branching/release và dùng reflog, bisect khi sự cố',
      'Hiểu scaling, load balancer, CDN, observability cơ bản',
    ],
    senior: [
      'Bảo mật container, giới hạn tài nguyên, nắm Kubernetes cơ bản',
      'Thiết kế hệ thống chịu lỗi: circuit breaker, retry, idempotency, saga',
      'Chiến lược deploy, rollback, observability (log/metrics/trace)',
      'Đánh đổi chi phí, độ tin cậy và độ phức tạp khi thiết kế hạ tầng',
    ],
  },
};

export interface TrackSection {
  topicId: string;
  tier: Tier;
  main: Question[];
  review: Question[];
}

const order: Record<Level, number> = { junior: 0, mid: 1, senior: 2 };
const sortQ = (a: Question, b: Question) => order[a.data.level] - order[b.data.level] || a.data.title.localeCompare(b.data.title);

function matchesRole(q: Question, role: string) {
  const r = q.data.roles;
  if (r.length === 0) return true;
  if (role === 'fullstack') return r.some((x) => ['frontend', 'backend', 'fullstack'].includes(x));
  return r.includes(role);
}

export function resolveTier(spec: TierSpec, level: Level): Tier | null {
  return typeof spec === 'string' ? spec : (spec[level] ?? null);
}

export function buildTrack(role: string, level: Level, all: Question[]): TrackSection[] {
  const sections: TrackSection[] = [];
  for (const { topic, tier: spec } of roleTopics[role] ?? []) {
    const tier = resolveTier(spec, level);
    if (!tier || !topicMap[topic]) continue;
    const rule = rules[level][tier];
    const pool = all.filter((q) => q.data.topic === topic && matchesRole(q, role));
    const main = pool.filter((q) => rule.main.includes(q.data.level)).sort(sortQ);
    const review = pool.filter((q) => rule.review.includes(q.data.level)).sort(sortQ);
    if (main.length || review.length) sections.push({ topicId: topic, tier, main, review });
  }
  // chủ đề Bắt buộc lên trước, sau đó Nên biết, Cộng điểm (giữ thứ tự gốc trong cùng tier)
  const rank: Record<Tier, number> = { core: 0, plus: 1, bonus: 2 };
  return sections.map((s, i) => ({ s, i })).sort((a, b) => rank[a.s.tier] - rank[b.s.tier] || a.i - b.i).map((x) => x.s);
}

export const trackCount = (sections: TrackSection[]) => sections.reduce((n, s) => n + s.main.length, 0);

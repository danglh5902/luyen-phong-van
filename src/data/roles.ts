export interface Role {
  id: string;
  name: string;
  icon: string;
  desc: string;
  color: string;
  /** Thứ tự topic nên ôn */
  roadmap: string[];
}

export const roles: Role[] = [
  { id: 'frontend', name: 'Frontend', icon: '🎨', desc: 'UI, trình duyệt, React, Next.js', color: '#6366f1', roadmap: ['html-css', 'javascript', 'typescript', 'react', 'nextjs', 'web', 'git', 'system-design'] },
  { id: 'backend', name: 'Backend', icon: '⚙️', desc: 'Node.js, NestJS, database, kiến trúc', color: '#e11d48', roadmap: ['nodejs', 'nestjs', 'typescript', 'sql', 'docker', 'web', 'system-design'] },
  { id: 'fullstack', name: 'Fullstack', icon: '🧩', desc: 'Cả FE lẫn BE', color: '#14b8a6', roadmap: ['html-css', 'javascript', 'typescript', 'react', 'nextjs', 'web', 'nodejs', 'nestjs', 'sql', 'docker', 'git'] },
  { id: 'devops', name: 'DevOps', icon: '🚀', desc: 'CI/CD, container, hạ tầng', color: '#f59e0b', roadmap: ['git', 'docker', 'sql', 'system-design'] },
];

export const roleMap = Object.fromEntries(roles.map((r) => [r.id, r]));

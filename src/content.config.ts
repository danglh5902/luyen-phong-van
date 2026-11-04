import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const questions = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/questions' }),
  schema: z.object({
    title: z.string(),
    topic: z.string(),
    roles: z.array(z.string()).default([]),
    level: z.enum(['junior', 'mid', 'senior']),
    tags: z.array(z.string()).default([]),
    answer: z.string().max(400),
    // Bản tiếng Anh (dùng cho câu hỏi HR/kỹ năng mềm)
    titleEn: z.string().optional(),
    answerEn: z.string().max(400).optional(),
  }),
});

export const collections = { questions };

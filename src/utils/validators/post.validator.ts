import { z } from 'zod';

export const createPostSchema = z.object({
  title: z
    .string()
    .min(5, 'O título deve ter pelo menos 5 caracteres')
    .max(200, 'O título deve ter no máximo 200 caracteres'),
  author: z
    .string()
    .min(3, 'O nome do autor deve ter pelo menos 3 caracteres')
    .max(100, 'O nome do autor deve ter no máximo 100 caracteres'),
  content: z
    .string()
    .min(50, 'O conteúdo deve ter pelo menos 50 caracteres')
    .max(10000, 'O conteúdo deve ter no máximo 10000 caracteres'),
});

export type CreatePostFormData = z.infer<typeof createPostSchema>;

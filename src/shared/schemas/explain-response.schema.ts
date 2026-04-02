import { z } from 'zod';

export const explainResponseSchema = z.object({
  summary: z.string(),
  responsibilities: z.array(z.string()),
  keyDependencies: z.array(z.string()),
  risks: z.array(z.string()),
  improvements: z.array(z.string()),
});

export type ExplainResponse = z.infer<typeof explainResponseSchema>;

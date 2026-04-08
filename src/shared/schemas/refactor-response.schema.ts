import { z } from 'zod';

export const refactorResponseSchema = z.object({
  summary: z.string(),
  changes: z.array(z.string()),
  risks: z.array(z.string()),
  refactoredCode: z.string(),
});

export type RefactorResponse = z.infer<typeof refactorResponseSchema>;

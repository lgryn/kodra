import { z } from 'zod';

const schema = z.object({
  OPENAI_API_KEY: z.string().min(1),
  OPENAI_MODEL: z.string().min(1),
});

const env = schema.parse(process.env);

export const config = {
  openAI: {
    apiKey: env.OPENAI_API_KEY,
    model: env.OPENAI_MODEL,
  },
};

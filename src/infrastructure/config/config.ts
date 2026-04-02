import { z } from 'zod';

const schema = z.object({
  OPENAI_API_KEY: z.string().min(1),
  OPENAI_MODEL: z.string().min(1),
});

type Env = z.infer<typeof schema>;

export type AppConfig = {
  openAI: {
    apiKey: string;
    model: string;
  };
};

let cachedConfig: AppConfig | null = null;

function parseEnv(env: Env): AppConfig {
  return {
    openAI: {
      apiKey: env.OPENAI_API_KEY,
      model: env.OPENAI_MODEL,
    },
  };
}

export function getConfig(): AppConfig {
  if (cachedConfig) {
    return cachedConfig;
  }

  const env = schema.parse(process.env);
  cachedConfig = parseEnv(env);

  return cachedConfig;
}

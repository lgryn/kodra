import { loadEnvFile } from 'node:process';
import { z } from 'zod';

const schema = z.object({
  OPENAI_API_KEY: z.string().trim().min(1, 'OPENAI_API_KEY is required.'),
  OPENAI_MODEL: z.string().trim().min(1).default('gpt-4o-mini'),
});

type Env = z.infer<typeof schema>;

export type AppConfig = {
  openAI: {
    apiKey: string;
    model: string;
  };
};

let cachedConfig: AppConfig | null = null;
let envLoaded = false;

function ensureEnvLoaded(): void {
  if (envLoaded) {
    return;
  }

  loadEnvFile();
  envLoaded = true;
}

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

  ensureEnvLoaded();
  const parsedEnv = schema.safeParse(process.env);

  if (!parsedEnv.success) {
    const issues = parsedEnv.error.issues.map((issue) => issue.message).join('\n');
    throw new Error(`Invalid environment variables.\n${issues}`);
  }

  const env = parsedEnv.data;
  cachedConfig = parseEnv(env);

  return cachedConfig;
}

import OpenAI from 'openai';
import { zodTextFormat } from 'openai/helpers/zod';
import { z } from 'zod';
import { getConfig } from '@config/config';

let openAI: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (openAI) {
    return openAI;
  }

  const config = getConfig();
  openAI = new OpenAI({
    apiKey: config.openAI.apiKey,
  });

  return openAI;
}

export async function requestStructuredResponse<T>(
  schema: z.ZodType<T>,
  instructions: string,
  input: string,
): Promise<T> {
  const config = getConfig();
  const client = getOpenAIClient();
  const response = await client.responses.parse({
    model: config.openAI.model,
    instructions,
    input: [
      {
        role: 'user',
        content: input,
      },
    ],
    text: {
      format: zodTextFormat(schema, 'structured_response'),
    },
  });

  if (!response.output_parsed) {
    throw new Error('OpenAI client. API returned no parsed structured response.');
  }

  return response.output_parsed;
}

import OpenAI from 'openai';
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
  const response = await client.responses.create({
    model: config.openAI.model,
    instructions,
    input: [
      {
        role: 'user',
        content: input,
      },
    ],
  });

  let json: unknown;

  try {
    json = JSON.parse(response.output_text);
  } catch {
    throw new Error('OpenAI client. API returned invalid JSON for structured response request.');
  }

  const parsedResponse = schema.safeParse(json);

  if (!parsedResponse.success) {
    throw new Error(
      `OpenAI client. API returned invalid structured response: ${parsedResponse.error.message}`,
    );
  }

  return parsedResponse.data;
}

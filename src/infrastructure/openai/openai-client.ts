import OpenAI from 'openai';
import { config } from '@config/config';

const openAi = new OpenAI({
  apiKey: config.openAI.apiKey,
});

export async function requestJsonResponse(
  instructions: string,
  input: string,
): Promise<unknown> {
  const response = await openAi.responses.create({
    model: config.openAI.model,
    instructions,
    input: [
      {
        role: 'user',
        content: input,
      },
    ],
  });

  try {
    return JSON.parse(response.output_text);
  } catch {
    throw new Error('OpenAI client. API returned invalid JSON.');
  }
}

import { openAi } from '@infra/openai/openai-client';
import { config } from '@config/config';
import { explainSystemPrompt } from '@app/prompts/explain.prompt';

export async function explainCode(code: string) {
  const response = await openAi.responses.create({
    model: config.openAI.model,
    instructions: explainSystemPrompt,
    input: [
      {
        role: 'user',
        content: code,
      },
    ],
  });

  return response.output_text;
}

import { requestJsonResponse } from '@infra/openai/openai-client';
import { explainSystemPrompt } from '@app/prompts/explain.prompt';
import {
  explainResponseSchema,
  type ExplainResponse,
} from '@shared/schemas/explain-response.schema';

export async function explainCode(code: string): Promise<ExplainResponse> {
  if (!code.trim()) {
    throw new Error('Explain command. Input code is empty.');
  }

  const json = await requestJsonResponse(explainSystemPrompt, code);
  const parsedResponse = explainResponseSchema.safeParse(json);

  if (!parsedResponse.success) {
    throw new Error(
      `Explain command. Invalid response format from OpenAI API: ${parsedResponse.error.message}`,
    );
  }

  return parsedResponse.data;
}

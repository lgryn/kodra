import { requestStructuredResponse } from '@infra/openai/openai-client';
import { explainSystemPrompt } from '@app/prompts/explain.prompt';
import {
  explainResponseSchema,
  type ExplainResponse,
} from '@shared/schemas/explain-response.schema';

export async function explainCode(code: string): Promise<ExplainResponse> {
  if (!code.trim()) {
    throw new Error('Explain command. Input code is empty.');
  }

  return requestStructuredResponse(
    explainResponseSchema,
    explainSystemPrompt,
    `Analyze this code and return the required JSON:\\n\\n${code}`,
  );
}

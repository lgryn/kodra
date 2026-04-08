import { refactorSystemPrompt } from '@app/prompts/refactor.prompt';
import { requestStructuredResponse } from '@infra/openai/openai-client';
import {
  refactorResponseSchema,
  type RefactorResponse,
} from '@shared/schemas/refactor-response.schema';

export async function refactorCode(code: string, goal: string): Promise<RefactorResponse> {
  if (!code.trim()) {
    throw new Error('Refactor command. Input code is empty.');
  }

  if (!goal.trim()) {
    throw new Error('Refactor command. Refactor goal is empty.');
  }

  return requestStructuredResponse(
    refactorResponseSchema,
    refactorSystemPrompt,
    `Refactor this code to achieve the following goal:\n${goal}\n\nReturn the required JSON with the complete refactored file content.\n\nCode:\n${code}`,
  );
}

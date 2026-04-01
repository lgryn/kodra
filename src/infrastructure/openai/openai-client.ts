import OpenAI from 'openai';
import { config } from '@config/config';

export const openAi = new OpenAI({
  apiKey: config.openAI.apiKey,
});

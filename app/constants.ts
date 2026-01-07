import { Model } from './types';

export const AVAILABLE_MODELS: Model[] = [
  { id: 'anthropic/claude-3.5-sonnet', name: 'Claude 3.5 Sonnet' },
  { id: 'openai/gpt-4o', name: 'GPT-4o' },
  { id: 'google/gemini-2.0-flash-exp:free', name: 'Gemini 2.0 Flash' },
  { id: 'meta-llama/llama-3.1-70b-instruct', name: 'Llama 3.1 70B' },
  { id: 'anthropic/claude-3-haiku', name: 'Claude 3 Haiku' },
  { id: 'openai/gpt-3.5-turbo', name: 'GPT-3.5 Turbo' },
  { id: 'mistralai/mistral-7b-instruct', name: 'Mistral 7B' },
];

export const DEFAULT_MODEL_1 = AVAILABLE_MODELS[0].id;
export const DEFAULT_MODEL_2 = AVAILABLE_MODELS[1].id;


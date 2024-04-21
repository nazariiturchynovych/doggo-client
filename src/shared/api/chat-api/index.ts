import { ChatApi } from '@/shared/api/chat-api/chat-api.ts';

export * from './models/requests.ts';

export const chatApi = new ChatApi();

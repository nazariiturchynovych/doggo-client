import { SignalRService } from '@/widgets/chat/chat-box/lib/SignalR';

export * from './ui/ChatBox.tsx';
export const signalRService = new SignalRService();

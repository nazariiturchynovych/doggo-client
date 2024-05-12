import React from 'react';
import { ChatItemSkeleton } from '@/widgets/chat/chat-list/ui/ChatItemSkeleton.tsx';

export const ChatListSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col p-1">
      <ChatItemSkeleton />
      <ChatItemSkeleton />
      <ChatItemSkeleton />
      <ChatItemSkeleton />
    </div>
  );
};

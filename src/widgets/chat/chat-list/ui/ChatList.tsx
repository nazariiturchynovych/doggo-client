import ChatItem from './ChatItem.tsx';
import React from 'react';
import { useUserStore } from '@/entities/user';
import { formatTimeDifference } from '@/widgets/chat/chat-list/lib/utils.ts';
import { useGetChats } from '@/shared/hooks';
import { ChatListSkeleton } from '@/widgets/chat/chat-list/ui/ChatListSkeleton.tsx';

type ChatListProps = {
  setSelectedChat: (id: string) => void;
  selectedChat: string | null;
};

export const ChatList: React.FC<ChatListProps> = ({ setSelectedChat, selectedChat }) => {
  const user = useUserStore((state) => state.user);

  const { data: chats } = useGetChats({ chatOwnerId: user.id });
  if (!chats) {
    return <ChatListSkeleton />;
  }

  console.log(chats);

  return (
    <div className="flex flex-col p-1">
      {chats.data.length > 0 &&
        chats.data.map((item) => (
          <button onClick={() => setSelectedChat(item.chatId)}>
            <ChatItem
              message={item.messages.length > 0 ? item.messages[0].value : ''}
              time={
                item.messages.length > 0 ? formatTimeDifference(item.messages[0].createDate) : ''
              }
              name={item.name}
              active={selectedChat == item.chatId}
            />
          </button>
        ))}
    </div>
  );
};

export default ChatList;

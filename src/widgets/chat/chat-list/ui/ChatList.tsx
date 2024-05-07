import ChatItem from './ChatItem.tsx';
import React from 'react';
import { useUserStore } from '@/entities/user';
import { Loader } from '@/shared/ui';
import { formatTimeDifference } from '@/widgets/chat/chat-list/lib/utils.ts';
import { useGetChats } from '@/shared/hooks';

type ChatListProps = {
  setSelectedChat: (id: string) => void;
  selectedChat: string | null;
};

export const ChatList: React.FC<ChatListProps> = ({ setSelectedChat, selectedChat }) => {
  const user = useUserStore((state) => state.user);

  const { data: chats } = useGetChats({ chatOwnerId: user.id });
  if (!chats) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col p-1">
      {chats.data.map((item) => (
        <button onClick={() => setSelectedChat(item.chatId)}>
          <ChatItem
            message={item.messages[0].value}
            time={formatTimeDifference(item.messages[0].createDate)}
            name={item.name}
            active={selectedChat == item.chatId}
          />
        </button>
      ))}
    </div>
  );
};

export default ChatList;

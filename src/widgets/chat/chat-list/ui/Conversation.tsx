import ConversationItem from './ConversationItem.tsx';
import React from 'react';
import { useUserStore } from '@/entities/user';
import { useGetChats } from '@/widgets/chat/chat-list/lib/hooks';
import { Loader } from '@/shared/ui';

type ChatListProps = {
  setSelectedChat: (id: string) => void;
  selectedChat: string | null;
};

export function formatTimeDifference(timestamp: string) {
  const currentTime = new Date();
  const pastTime = new Date(timestamp + 'Z');
  const timeDifference = currentTime.getTime() - pastTime.getTime();

  // Convert milliseconds to seconds
  const seconds = Math.floor(timeDifference / 1000);

  // Calculate time differences
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 1) {
    return `${days} days ago`;
  } else if (hours > 1) {
    return `${hours} hours ago`;
  } else if (minutes > 1) {
    return `${minutes} minutes ago`;
  } else {
    return 'just now';
  }
} //move to utils

const Conversation: React.FC<ChatListProps> = ({ setSelectedChat, selectedChat }) => {
  const user = useUserStore((state) => state.user);

  const { data: chats } = useGetChats({ chatOwnerId: user.id });
  if (!chats) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col p-1">
      {chats.data.map((item) => (
        <button onClick={() => setSelectedChat(item.chatId)}>
          <ConversationItem
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

export default Conversation;

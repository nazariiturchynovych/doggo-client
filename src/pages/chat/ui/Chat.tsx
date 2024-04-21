import React, { useEffect, useState } from 'react';
import $api from '@/shared/lib/config/axios.ts';
import { useUserStore } from '@/entities/user';
import { ChatList } from '@/widgets/chat/chat-list';
import { ChatBox } from '@/widgets/chat/chat-box';

export const Chat: React.FC = () => {
  const user = useUserStore((state) => state.user);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  useEffect(() => {
    const getChats = async () => {
      const result = await $api.get(`Chat/chats/${user.id}`);
      console.log(result);
    };

    getChats();
  }, [user]);

  console.log('dsada  ', selectedChat);

  return (
    <div className="rounded-md border-2 p-2">
      <div className="flex h-full overflow-hidden">
        <ChatList setSelectedChat={setSelectedChat} />
        <ChatBox chatId={selectedChat} />
      </div>
    </div>
  );
};

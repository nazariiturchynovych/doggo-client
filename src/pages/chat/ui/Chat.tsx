import Conversation from '../../../widgets/chat/chat-list/ui/Conversation.tsx';
import React, { useState } from 'react';
import { useUserStore } from '@/entities/user';
import Messages from '@/widgets/chat/chat-box/ui/Messages.tsx';

const Chat: React.FC = () => {
  const user = useUserStore((state) => state.user);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  return (
    <div className="">
      <div className="flex bg-white dark:bg-gray-900">
        <div className="hidden h-screen w-80 bg-gray-100 p-2 dark:bg-gray-800 md:block">
          <div className="h-full overflow-y-auto">
            <div className="p-3 text-xl font-extrabold text-gray-600 dark:text-gray-200">
              Chikaa
            </div>
            <div className="search-chat flex p-3">
              <input
                className="input w-full rounded-l-md bg-gray-200 p-3 text-sm text-gray-700 focus:outline-none  dark:bg-gray-700 dark:text-gray-200"
                type="text"
                placeholder="Search Messages"
              />
              <div className="flex items-center justify-center rounded-r-md bg-gray-200 pr-3 text-gray-400 dark:bg-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="font-semibol p-3 text-lg text-gray-600 dark:text-gray-200">Recent</div>
            <Conversation selectedChat={selectedChat} setSelectedChat={setSelectedChat} />
          </div>
        </div>
        <div className="h-screen w-full rounded-md p-2">
          <Messages chatId={selectedChat} />
        </div>
      </div>
    </div>
  );
};

export default Chats;

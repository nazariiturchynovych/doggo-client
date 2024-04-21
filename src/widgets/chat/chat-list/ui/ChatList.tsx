import React from 'react';
import { Loader } from '@/shared/ui';
import { useGetChats } from '@/widgets/chat/chat-list/lib/hooks';
import { useUserStore } from '@/entities/user';

type ChatListProps = {
  setSelectedChat: (id: string) => void;
};

export const ChatList: React.FC<ChatListProps> = ({ setSelectedChat }) => {
  const user = useUserStore((state) => state.user);

  const { data } = useGetChats({ chatOwnerId: user.id });
  if (!data) {
    return <Loader />;
  }

  return (
    <div className="w-1/4 border-r border-gray-300 bg-white">
      <div className="mb-9 h-screen w-full overflow-y-auto p-3 pb-20">
        {data &&
          data.data.map((chat) => (
            <button
              key={chat.chatId}
              onClick={() => setSelectedChat(chat.chatId)}
              className={'w-full'}>
              <div className="mb-4 flex w-full cursor-pointer items-center rounded-md p-2 hover:bg-gray-100">
                <div className="mr-3 h-12 w-12 rounded-full bg-gray-300">
                  <img
                    src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                    alt="User Avatar"
                    className="h-12 w-12 rounded-full"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{chat.name}</h2>
                  <p className="text-gray-600">{chat.chatId}</p>
                </div>
              </div>
            </button>
          ))}
      </div>
    </div>
  );
};

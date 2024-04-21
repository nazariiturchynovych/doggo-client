import React, { useEffect, useState } from 'react';
import { Input, Loader } from '@/shared/ui';
import { useGetChat } from '@/widgets/chat/chat-box/lib/hooks';
import { signalRService } from '@/widgets/chat/chat-box';
import { useUserStore } from '@/entities/user';
import { cn } from '@/shared/lib/utils.ts';
import { useQueryClient } from '@tanstack/react-query';

type ChatBoxProps = {
  chatId: string | null;
};

export const ChatBox: React.FC<ChatBoxProps> = ({ chatId }) => {
  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);
  const { data } = useGetChat({ id: chatId || '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    signalRService.startConnection();

    signalRService.onReceiveMessage((message) => {
      // Handle incoming message
      console.log('Received Message:', message);
    });

    return () => {
      // Cleanup if needed
    };
  }, []);

  const sendMessage = (message: string) => {
    setMessage('');
    signalRService.joinChat(chatId || '');
    // Example: send message to SignalR hub
    signalRService.sendMessage(chatId || '', message);

    queryClient.invalidateQueries({
      queryKey: [chatId],
    });
  };

  if (!data) {
    return <Loader />;
  }

  console.log(data);

  return (
    <div className="flex w-full flex-col border-b-[1px]">
      <header className="bg-white p-4 text-gray-700">
        <h1 className="text-2xl font-semibold">{data.data.name}</h1>
      </header>

      <div className="h-full overflow-y-auto p-4">
        {data &&
          data.data.messages.length > 0 &&
          data.data.messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'mb-4 flex cursor-pointer',
                message.userId == user.id ? ' justify-end' : '',
              )}>
              {message.userId != user.id && (
                <div className="mr-2 flex h-9 w-9 items-center justify-center rounded-full">
                  <img
                    src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                    alt="User Avatar"
                    className="h-8 w-8 rounded-full"
                  />
                </div>
              )}
              <div className={'flex max-w-96 gap-3 rounded-lg bg-primary/20 p-3'}>
                {message.userId != user.id && (
                  <p className="text-lg font-bold">{message.userName}</p>
                )}
                <p className="w-full break-words text-gray-700">{message.value}</p>
              </div>
            </div>
          ))}
      </div>

      <div className="border-t border-gray-300 bg-white p-4">
        <div className="flex items-center">
          <Input
            type="text"
            placeholder="Type a message..."
            className="w-full rounded-md border border-gray-400 p-2 focus:border-blue-500 focus:outline-none"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          <button
            onClick={() => sendMessage(message)}
            className="ml-2 rounded-md bg-indigo-500 px-4 py-2 text-white">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

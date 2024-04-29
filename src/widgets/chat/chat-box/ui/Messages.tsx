import React, { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useUserStore } from '@/entities/user';
import { useGetChat } from '@/widgets/chat/chat-box/lib/hooks';
import { signalRService } from '@/widgets/chat/chat-box';
import { Input, Loader } from '@/shared/ui';
import { cn } from '@/shared/lib/utils.ts';
import { formatTimeDifference } from '@/widgets/chat/chat-list/ui/Conversation.tsx';

type ChatBoxProps = {
  chatId: string | null;
};
const Messages: React.FC<ChatBoxProps> = ({ chatId }) => {
  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);
  console.log('messages', chatId);
  const { data } = useGetChat({ id: chatId || '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    signalRService.startConnection();

    signalRService.onReceiveMessage((message) => {
      // Handle incoming message
      console.log('Received Message:', message); //TODO invalidatequery to recieve message
    });

    return () => {
      // Cleanup if needed
    };
  }, []);
  const sendMessage = (message: string) => {
    setMessage('');
    signalRService.joinChat(chatId || '');
    // Example: send message to SignalR hub
    signalRService.sendMessage(chatId || '', message); //TODO invalidate query nad get new messages

    queryClient.invalidateQueries({
      queryKey: [chatId],
    });
  };

  if (!data || !chatId) {
    return <Loader />;
  }

  return (
    <div className="flex h-full w-full flex-col">
      <div className="h-15 w-full rounded-xl rounded-bl-none rounded-br-none bg-primary p-1 shadow-md dark:bg-gray-800">
        <div className="flex items-center justify-between p-2 align-middle">
          <div className="flex items-center gap-2">
            <div className="mr-1 rounded-full p-2 text-white hover:bg-purple-500 md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </div>
            <div className="p-1/2 rounded-full border border-white">
              <img
                className="h-14 w-14 rounded-full"
                src="https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_960_720.png"
                alt="avatar"
              />
            </div>
            <div className="§p-2">
              <div className="text-md font-semibold text-gray-50">Rey Jhon A. Baquirin</div>
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-300"></div>
                <div className="ml-1 text-xs text-gray-50">Online</div>
              </div>
            </div>
          </div>
          <div className="cursor-pointer rounded-full p-2 text-white hover:bg-purple-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="my-2 flex w-full flex-col overflow-y-auto bg-gray-100 p-2 dark:bg-gray-900">
        {data &&
          data.data.messages.length > 0 &&
          data.data.messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'mb-4 flex cursor-pointer',
                message.userId == user.id ? ' justify-end' : '',
              )}>
              {message.userId == user.id ? (
                <div className="flex justify-end break-words">
                  <div className="w-auto max-w-[350px] items-end rounded-xl rounded-br-none bg-white md:max-w-[280px]">
                    <p className={'break-words p-2 text-black'}>{message.value}</p>
                    <div className="ml-1 p-1 text-xs text-gray-400">
                      {formatTimeDifference(message.createDate)}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center break-words">
                  <img
                    className="m-3 h-8 w-8 rounded-full"
                    src="https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_960_720.png"
                    alt="avatar"
                  />
                  <div className="w-auto max-w-[350px] items-end rounded-xl rounded-bl-none bg-blue-600 md:max-w-[280px]">
                    <p className={'break-words p-2 text-gray-200'}>{message.value}</p>
                    <div className="ml-1 p-1 text-xs text-gray-400">
                      {formatTimeDifference(message.createDate)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
      <div className="h-15  rounded-xl rounded-tl-none rounded-tr-none bg-gray-100 p-3 dark:bg-gray-800">
        <div className="flex w-full items-center p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="m-2 mx-4 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <Input
            className="w-full rounded-l-md bg-gray-100 p-5 text-sm text-gray-700 focus:outline-none  dark:bg-gray-800 dark:text-gray-200"
            type="text"
            placeholder="Type your message ..."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          <button
            onClick={() => sendMessage(message)}
            className="m-2 mx-4 flex items-center justify-center  rounded-r-md bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Messages;

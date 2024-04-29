import React from 'react';

type ConversationItemProps = { active: boolean; time: string; name: string; message: string };

export const ChatItem: React.FC<ConversationItemProps> = ({ active, time, name, message }) => {
  const _class = active ? 'bg-gray-200' : 'bg-white';
  return (
    <div className={'w-full'}>
      <div
        className={
          'conversation-item m-1 rounded-md p-1 hover:bg-gray-200 dark:bg-gray-700 ' + _class
        }>
        <div className={'flex cursor-pointer items-center  p-2  '}>
          <div className="m-1 h-7 w-7">
            <img
              className="rounded-full"
              src="https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_960_720.png"
              alt="avatar"
            />
          </div>
          <div className="flex-grow p-2">
            <div className="text-md flex justify-between ">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-200">{name}</div>
            </div>
            <div className={'flex justify-between gap-5'}>
              <div className="truncate text-sm text-gray-500 dark:text-gray-400">{message}</div>
              <div className="text-xs text-gray-400 dark:text-gray-300">{time}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatItem;

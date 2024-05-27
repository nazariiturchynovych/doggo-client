import React, { useState } from 'react';
import { Calendar, Popover, PopoverContent, PopoverTrigger } from '@/shared/ui';
import { useUserStore } from '@/entities/user';
import { ScheduleTabs } from '@/pages/schedule/ui/ScheduleTabs.tsx';
import { DividerHorizontal } from '@/shared/ui/divider-horizontal.tsx';
import { WalkerJobs } from '@/pages/schedule/ui/WalkerJobs.tsx';
import { DogJobRequests } from '@/pages/schedule/ui/DogJobRequests.tsx';

export const Schedule: React.FC = () => {
  const user = useUserStore((state) => state.user);
  const [date, setDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState('Walk');
  const [dogId, setDogId] = useState('');

  return (
    <div className="flex h-full flex-1 sm:h-screen sm:p-5">
      <div className=" flex w-full flex-1 flex-col overflow-y-scroll border border-t-0 bg-white sm:rounded-md sm:border-t">
        <div className="flex content-center items-center justify-between px-6 py-4">
          <div>
            <p className=" font-semibold leading-6">
              {date.toLocaleDateString('en-UK', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <p className="mt-1 text-sm leading-tight text-gray-500">
              {date.toLocaleDateString('en-UK', {
                weekday: 'long',
              })}
            </p>
          </div>
          <Popover>
            <PopoverTrigger className={'rounded-full p-3 hover:bg-gray-100'}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                />
              </svg>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar selected={date} onDayClick={(day) => setDate(day)} />
            </PopoverContent>
          </Popover>
        </div>
        <DividerHorizontal />
        <ScheduleTabs activeTab={activeTab} setActiveTab={setActiveTab} setDogId={setDogId} />
        <DividerHorizontal />
        <div className={'flex h-full'}>
          {activeTab == 'Walk' ? <WalkerJobs id={user.walkerId!} /> : <DogJobRequests id={dogId} />}
        </div>
      </div>
    </div>
  );
};

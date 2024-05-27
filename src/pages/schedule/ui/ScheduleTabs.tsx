import { FC } from 'react';
import { cn } from '@/shared/lib/utils.ts';
import { ChooseDog } from '@/pages/schedule/ui/ChooseDog.tsx';

const tabs = ['Walk', 'Dog'];

type ScheduleTabsProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setDogId: (id: string) => void;
};

export const ScheduleTabs: FC<ScheduleTabsProps> = ({ activeTab, setActiveTab, setDogId }) => {
  return (
    <div className={'flex w-full items-center justify-between p-2'}>
      <div className="relative flex h-10 min-w-48 items-center rounded-full p-2 shadow">
        {tabs.map((tab) => (
          <div
            className={cn(
              'flex w-full justify-center',
              activeTab == tab ? 'rounded-full bg-indigo-600 p-1 text-white shadow transition' : '',
            )}>
            <button onClick={() => setActiveTab(tab)}>{tab}</button>
          </div>
        ))}
      </div>
      {activeTab == 'Dog' && <ChooseDog setDogId={setDogId} />}
    </div>
  );
};

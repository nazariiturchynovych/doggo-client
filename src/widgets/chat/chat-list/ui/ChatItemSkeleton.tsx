import React from 'react';
import { Skeleton } from '@/shared/ui';

export const ChatItemSkeleton: React.FC = () => {
  return (
    <div className={'m-1 flex w-full justify-between gap-2 rounded-md bg-white p-2'}>
      <div className={'flex gap-2'}>
        <div>
          <Skeleton className={'h-8 w-8 rounded-full'} />
        </div>
        <div className={'flex flex-col gap-1'}>
          <Skeleton className={'h-6 w-20'} />
          <Skeleton className={'h-6 w-16'} />
        </div>
      </div>
      <div>
        <Skeleton className={'h-6 w-12'} />
      </div>
    </div>
  );
};

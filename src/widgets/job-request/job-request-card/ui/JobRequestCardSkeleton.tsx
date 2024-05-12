import React from 'react';
import { Skeleton } from '@/shared/ui';
import { cn } from '@/shared/lib/utils.ts';

type JobRequestCardSkeletonProps = {
  buttonsOn?: boolean;
};

export const JobRequestCardSkeleton: React.FC<JobRequestCardSkeletonProps> = ({ buttonsOn }) => {
  return (
    <div className="flex flex-col rounded-md border bg-white">
      <div className={'flex'}>
        <div className={'w-full p-2'}>
          <Skeleton className={'h-32 w-[144px] rounded-xl'} />
        </div>
        <div className={'p-2 '}>
          <Skeleton className={'m-1 h-7 w-16'} />
          <Skeleton className={'m-1 h-6 w-20'} />
          <Skeleton className={'m-1 h-4 w-24'} />
        </div>
      </div>
      <div className={cn('flex', buttonsOn ? 'hidden' : '')}>
        <div className={'w-full border-t px-2 py-4'}>
          <Skeleton className={'m-auto h-6 w-[128px]'} />
        </div>
        <div className={'w-full border-l border-t px-2 py-4'}>
          <Skeleton className={'m-auto h-6 w-[166px]'} />
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Skeleton } from '@/shared/ui';

export const DogOwnerCardSkeleton: React.FC = () => {
  return (
    <div className="flex w-full justify-between">
      <div className={'flex flex-col gap-1'}>
        <Skeleton className={'h-6 w-32'} />

        <Skeleton className={'h-6 w-40'} />

        <Skeleton className={'h-6 w-48'} />
      </div>
      <div>
        <Skeleton className={'h-10 w-16'} />
      </div>
    </div>
  );
};

import React from 'react';
import { Skeleton } from '@/shared/ui';

export const DogCardSkeleton: React.FC = () => {
  return (
    <div className="flex h-52 w-full min-w-56 max-w-80 flex-col justify-between rounded-md border p-4">
      <div>
        <Skeleton className={'h-full max-h-32 min-h-32 w-full'} />
      </div>
      <div className={'flex justify-between'}>
        <Skeleton className={'h-6 w-20'} />
        <Skeleton className={'h-6 w-12'} />
      </div>
    </div>
  );
};

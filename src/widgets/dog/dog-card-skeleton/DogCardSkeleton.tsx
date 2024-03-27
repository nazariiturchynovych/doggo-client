import React from 'react';
import { Skeleton } from '@/shared/ui';

export const DogCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-5 rounded-md border p-4 shadow-md">
      <Skeleton className="h-[236px] max-h-60 w-full" />
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-5 w-32" />
        </div>
        <div className="flex flex-col justify-between">
          <Skeleton className="h-5 w-10 self-end" />
          <Skeleton className="h-5 w-12" />
        </div>
      </div>
    </div>
  );
};

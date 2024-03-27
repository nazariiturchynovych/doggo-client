import React from 'react';
import { Skeleton } from '@/shared/ui';

export const DogOwnerCardSkeleton: React.FC = () => {
  return (
    <div className="flex gap-5 rounded-md border p-4 shadow-md">
      <Skeleton className="h-[80px] w-[80px] rounded-full" />
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-24" />
          <Skeleton className=" h-[80px] w-[250px]" />
          <Skeleton className=" h-[60px] w-[300px]" />
        </div>
        <Skeleton className="h-5 w-16" />
      </div>
    </div>
  );
};

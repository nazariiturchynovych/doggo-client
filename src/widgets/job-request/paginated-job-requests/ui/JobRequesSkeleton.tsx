import React from 'react';
import { Skeleton } from '@/shared/ui';

export const JobRequestSkeleton: React.FC = () => {
  return (
    <div className="flex justify-between gap-5 rounded-md border p-4 shadow-md">
      <div className="flex gap-2">
        <Skeleton className="h-[100px] w-[150px]" />
        <div className="flex flex-col gap-1">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-14 w-36" />
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <Skeleton className="h-5 w-10 self-end" />
        <Skeleton className="h-5 w-12" />
      </div>
    </div>
  );
};

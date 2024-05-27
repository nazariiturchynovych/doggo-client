import React from 'react';
import { useGetWalkerJobs } from '@/shared/hooks';
import JobCard from '@/widgets/job/job-card/ui/JobCard.tsx';
import { cn } from '@/shared/lib/utils.ts';

type WalkerJobsProps = { id: string };

export const WalkerJobs: React.FC<WalkerJobsProps> = ({ id }) => {
  const { data } = useGetWalkerJobs({ id });

  return (
    <div className={'flex h-full gap-2'}>
      <div
        className={cn(
          'flex h-full w-full flex-col overflow-scroll p-2 dark:bg-gray-900',
          data && data.data.length > 0 ? 'flex-row' : '',
        )}>
        {data && data.data && data.data.map((job) => <JobCard job={job} />)}
      </div>
    </div>
  );
};

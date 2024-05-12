import React from 'react';
import { ScrollArea, ScrollBar } from '@/shared/ui';
import { JobRequestCardSkeleton } from '@/widgets/job-request/job-request-card/ui/JobRequestCardSkeleton.tsx';
import { AddJobRequestButton } from '@/widgets/job-request/paginated-job-requests/ui/AddJobRequestButton.tsx';

export const PaginatedJobRequestsSkeleton: React.FC = () => {
  return (
    <div className={'relative p-2 sm:px-5'}>
      <h4 className="p-2 pb-6 text-center text-xl font-bold">Job Requests</h4>
      <ScrollArea className="w-full lg:h-72">
        <div className="w-maw flex gap-5  pb-3 lg:grid lg:grid-cols-2 xl:grid-cols-2">
          {Array.from({ length: 4 }, (_, index) => ({ id: index })).map((item) => (
            <JobRequestCardSkeleton buttonsOn={true} key={item.id} />
          ))}
        </div>
        <ScrollBar className={'mt-2 lg:hidden'} orientation="horizontal" />
      </ScrollArea>
      <AddJobRequestButton />
    </div>
  );
};

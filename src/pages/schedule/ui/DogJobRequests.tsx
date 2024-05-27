import React from 'react';
import { useGetDogJobRequests } from '@/shared/hooks';
import { cn } from '@/shared/lib/utils.ts';
import JobRequestCard from '@/widgets/job-request/job-request-card/ui/JobRequestCard.tsx';

type DogJobRequestsProps = {
  id: string;
};

export const DogJobRequests: React.FC<DogJobRequestsProps> = ({ id }) => {
  const { data } = useGetDogJobRequests({ id });

  console.log('data   ', data);
  console.log('dogId   ', id);

  return (
    <div
      className={cn(
        'flex h-full w-full flex-col gap-2 overflow-scroll p-2 dark:bg-gray-900',
        data && data.data.length > 0 ? '' : "flex-row'",
      )}>
      {data &&
        data.data &&
        data.data.map((jobRequest) => <JobRequestCard jobRequest={jobRequest} />)}
    </div>
  );
};

import React from 'react';
import { useGetJobRequest } from '@/widgets/job-request/job-request-info/lib/hooks';
import { Guid } from 'typescript-guid';
import { Loader, Popover, PopoverContent, PopoverTrigger } from '@/shared/ui';
import { useUserStore } from '@/entities/user';
import { DogCard } from '@/widgets/dog';
import { DogOwnerCard } from '@/widgets/dog-owner/dog-owner-card/ui/DogOnwnerCard.tsx';
import JobForm from '@/features/create-job/ui/JobRequestForm.tsx';

export const JobRequestInfo: React.FC = () => {
  const user = useUserStore((state) => state.user);
  const { data } = useGetJobRequest({ id: Guid.parse('8a85e3f3-b98a-483b-bffa-366e5bf058f1') });

  if (!data) {
    return <Loader />;
  }
  //add see count
  console.log(data);

  const jobRequest = data.data;

  return (
    <div className="my-5 flex w-full flex-col gap-5">
      <DogCard id={jobRequest.dogId} />
      <div className="flex flex-col justify-between rounded-md bg-white p-4 shadow-md">
        <div className="font-bold">Description</div>
        <div>{jobRequest.description}</div>
        <div>Payment: {jobRequest.paymentTo}$</div>
        <div>user</div>
        <div>location</div>
        <div>other requests</div>
      </div>
      <Popover>
        <PopoverTrigger className="rounded-md bg-primary p-4 text-white transition hover:bg-primary/90">
          Apply for job
        </PopoverTrigger>
        <PopoverContent>
          <JobForm jobRequestId={jobRequest.id} />
        </PopoverContent>
      </Popover>
      <DogOwnerCard id={user.dogOwnerId!} />
      <div className="flex flex-col justify-between rounded-md p-4 shadow-md">
        <div>dsadas</div>
      </div>
      <div className="flex flex-col justify-between rounded-md p-4 shadow-md">
        <div>dsadas</div>
      </div>
    </div>
  );
};

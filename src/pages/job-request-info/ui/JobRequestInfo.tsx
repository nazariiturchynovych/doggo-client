import React from 'react';
import { useGetJobRequest } from '@/pages/job-request-info/lib/hooks';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Loader,
} from '@/shared/ui';
import { DogCard } from '@/widgets/dog';
import { DogOwnerCard } from '@/widgets/dog-owner/dog-owner-card/ui/DogOnwnerCard.tsx';
import JobForm from '@/features/create-job/ui/JobForm.tsx';
import { useParams } from 'react-router-dom';

export const JobRequestInfo: React.FC = () => {
  const { id } = useParams();

  const { data } = useGetJobRequest({ id: id });

  if (!data) {
    return <Loader />;
  }
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
      <Dialog>
        <DialogTrigger className="w-full rounded-md bg-primary p-3 text-white shadow-md hover:bg-primary/90">
          Apply for job
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>
          <JobForm jobRequestId={jobRequest.id} />
        </DialogContent>
      </Dialog>
      <DogOwnerCard id={jobRequest.dogOwnerId!} />
    </div>
  );
};

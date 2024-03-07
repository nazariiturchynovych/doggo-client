import React from 'react';
import { JobRequest } from '@/entities/jobRequest/model/models.ts';
import { Button, Popover, PopoverContent, PopoverTrigger } from '@/shared/ui';
import JobForm from '@/features/create-job/ui/JobRequestForm.tsx';

type JobRequestCardProps = {
  jobRequest: JobRequest;
};

const JobRequestCard: React.FC<JobRequestCardProps> = ({ jobRequest }) => {
  console.log(jobRequest.isPersonalIdentifierRequired);
  return (
    <div className="center relative flex w-full flex-col items-center justify-center gap-3 border p-5 px-10 shadow-md">
      <div className="w-full p-2">{jobRequest.description}</div>
      {jobRequest.hasAcceptedJob && <div className="w-full p-2">{jobRequest.hasAcceptedJob}</div>}
      <div className="w-full p-2">{jobRequest.paymentTo}</div>
      {jobRequest.isPersonalIdentifierRequired && (
        <div className="w-full p-2">it`s required to have personal identifier</div>
      )}
      <div className="w-full p-2">{jobRequest.requiredAge}</div>
      <div className="w-full p-2">{jobRequest.requiredSchedule.from.toString()}</div>
      <Popover>
        <PopoverTrigger>
          <Button>Apply for job</Button>
        </PopoverTrigger>
        <PopoverContent className="w-full">
          <JobForm jobRequestId={jobRequest.id} />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default JobRequestCard;

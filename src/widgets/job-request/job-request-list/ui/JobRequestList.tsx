import React from 'react';
import { JobRequest } from '@/entities/jobRequest/model/models.ts';
import JobRequestCard from '@/widgets/job-request/job-request-card/ui/JobRequestCard.tsx';

type JobRequestListProps = {
  jobRequests: JobRequest[];
};

const JobRequestList: React.FC<JobRequestListProps> = ({ jobRequests }) => {
  return (
    <div className="flex w-full flex-col items-center gap-5">
      {jobRequests.map((item) => (
        <JobRequestCard key={item.id.toString()} jobRequest={item} />
      ))}
    </div>
  );
};

export default JobRequestList;

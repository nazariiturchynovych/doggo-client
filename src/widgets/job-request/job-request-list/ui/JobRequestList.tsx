import React from 'react';
import { JobRequest } from '@/entities/jobRequest/model/models.ts';
import JobRequestCard from '@/widgets/job-request/job-request-card/ui/JobRequestCard.tsx';

type JobRequestListProps = {
  jobRequests: JobRequest[];
};

const JobRequestList: React.FC<JobRequestListProps> = ({ jobRequests }) => {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:p-4 sm:px-8">
      {jobRequests.map((item) => (
        <JobRequestCard key={item.id.toString()} jobRequest={item} />
      ))}
    </div>
  );
};

export default JobRequestList;

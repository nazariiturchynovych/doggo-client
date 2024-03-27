import React from 'react';
import { Job } from '@/entities/job/model/models.ts';
import JobCard from '@/widgets/job/job-card/ui/JobCard.tsx';

type JobRequestListProps = {
  jobs: Job[];
};

const JobList: React.FC<JobRequestListProps> = ({ jobs }) => {
  return (
    <div className="flex w-full flex-col items-center gap-5">
      {jobs.map((item) => (
        <JobCard key={item.id.toString()} job={item} />
      ))}
    </div>
  );
};

export default JobList;

import React from 'react';
import { Link } from 'react-router-dom';
import { Job } from '@/entities/job/model/models.ts';
import { formatDateRange } from '@/shared/lib/utils.ts';

type JobCardProps = {
  job: Job;
};

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const startDate = new Date(job.jobRequest.requiredSchedule.from);
  const endDate = new Date(job.jobRequest.requiredSchedule.to);

  return (
    <Link className="w-full" to={`/job-info/${job.id}`}>
      <div className="center relative flex w-full justify-between gap-3 rounded-md border bg-white p-5 shadow-md">
        <div className="flex gap-2">
          <div className="border">
            <img
              src="/src/shared/assets/images/dog-image-mock.jpg"
              height={150}
              width={150}
              alt=""
            />
          </div>
          <div className="flex h-full flex-col">
            <div>Doggo</div>
            <div>{formatDateRange(startDate, endDate)}</div>
            <div>{job.comment}</div>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div>{job.jobRequest.paymentTo}$</div>
          <div className="justify-self-end">@</div>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;

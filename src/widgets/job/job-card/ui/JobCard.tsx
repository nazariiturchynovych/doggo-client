import React from 'react';
import { Link } from 'react-router-dom';
import { Job } from '@/entities/job/model/models.ts';
import { formatDateRange } from '@/shared/lib/utils.ts';
import { getRandomIntInclusive } from '@/widgets/job-request/job-request-card/ui/JobRequestCard.tsx';

type JobCardProps = {
  job: Job;
};

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const startDate = new Date(job.jobRequest.requiredSchedule.from);
  const endDate = new Date(job.jobRequest.requiredSchedule.to);

  console.log(job);

  return (
    <Link className="w-full border-b last:border-b-0" to={`/job-info/${job.id}`}>
      <div className="flex h-[150px] w-full flex-col justify-between bg-white p-2 hover:bg-gray-100 ">
        <div className={'flex h-full'}>
          <div className={'flex w-full p-2'}>
            <img
              className={'rounded-3xl'}
              src={`/src/shared/assets/images/dogmock${getRandomIntInclusive(1, 5)}.jpg`}
              alt=""
            />
          </div>
          <div className={'h-full w-full p-2 text-end'}>
            <div className={'text-xl font-semibold'}>{job.dog.name}</div>
            <div className={'text-'}>{job.jobRequest.paymentTo}$</div>
            <div className={'text-xs'}>{formatDateRange(startDate, endDate)}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

// <div className={'flex w-full content-center justify-center gap-2 border-t  p-4'}>
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     stroke-width="1.5"
//     stroke="currentColor"
//     className="h-6 w-6">
//     <path
//       stroke-linecap="round"
//       stroke-linejoin="round"
//       d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
//     />
//   </svg>
//   Message
// </div>
export default JobCard;

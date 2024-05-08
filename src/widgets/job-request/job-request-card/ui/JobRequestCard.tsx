import React from 'react';
import { JobRequest } from '@/entities/jobRequest/model/models.ts';
import { Link } from 'react-router-dom';
import { formatDateRange } from '@/shared/lib/utils.ts';
import { useGetDog } from '@/shared/hooks';

type JobRequestCardProps = {
  jobRequest: JobRequest;
};

export function getRandomIntInclusive(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

const JobRequestCard: React.FC<JobRequestCardProps> = ({ jobRequest }) => {
  const startDate = new Date(jobRequest.requiredSchedule.from);
  const endDate = new Date(jobRequest.requiredSchedule.to);

  const { data } = useGetDog({ id: jobRequest.dogId });

  return (
    <>
      {data && (
        <div className="flex max-h-[200px] min-h-[200px] w-full flex-col justify-between rounded-md border bg-white drop-shadow-sm">
          <Link className={'h-full'} to={`/job-request-info/${jobRequest.id}`}>
            <div className={'flex h-full min-h-[144px]'}>
              <div className={'flex max-h-[144px] w-full p-2'}>
                <img
                  className={'rounded-3xl'}
                  height={144}
                  width={144}
                  src={`/src/shared/assets/images/dogmock${getRandomIntInclusive(1, 5)}.jpg`}
                  alt=""
                />
              </div>
              <div className={'w-full p-2 text-end'}>
                <div className={'text-xl font-semibold'}>{data.data.name}</div>
                <div className={'text-'}>{jobRequest.paymentTo}$</div>
                <div className={'text-xs'}>{formatDateRange(startDate, endDate)}</div>
              </div>
            </div>
          </Link>
          <div className={'flex'}>
            <div
              className={
                'flex w-full content-center justify-center gap-2 border-r border-t p-4 text-green-600'
              }>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              Apply
            </div>
            <div className={'flex w-full content-center justify-center gap-2 border-t  p-4'}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
              Message
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default JobRequestCard;

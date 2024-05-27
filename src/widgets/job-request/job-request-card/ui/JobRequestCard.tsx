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
        <div className="flex h-[144px] w-full min-w-64 flex-col justify-between rounded-md border bg-white ">
          <Link className={'h-full'} to={`/job-request-info/${jobRequest.id}`}>
            <div className={'flex h-full min-h-[144px]'}>
              <div className={'flex max-h-[144px] w-full p-2'}>
                <img
                  className={'rounded-xl'}
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
        </div>
      )}
    </>
  );
};
export default JobRequestCard;

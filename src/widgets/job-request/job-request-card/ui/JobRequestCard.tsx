import React from 'react';
import { JobRequest } from '@/entities/jobRequest/model/models.ts';
import { Link } from 'react-router-dom';
import { formatDateRange } from '@/shared/lib/utils.ts';
import { useGetDog } from '@/widgets/dog/dog-card/lib/hooks';

type JobRequestCardProps = {
  jobRequest: JobRequest;
};

const JobRequestCard: React.FC<JobRequestCardProps> = ({ jobRequest }) => {
  const startDate = new Date(jobRequest.requiredSchedule.from);
  const endDate = new Date(jobRequest.requiredSchedule.to);

  const { data } = useGetDog({ id: jobRequest.dogId });

  return (
    <>
      {data && (
        <Link className="w-full" to={`/job-request-info/${jobRequest.id}`}>
          <div className="relative flex w-full justify-between gap-3 rounded-md border bg-white p-5 shadow-md">
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
                <div>{data.data.name}</div>
                <div>{formatDateRange(startDate, endDate)}</div>
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <div>{jobRequest.paymentTo}$</div>
              <div className="justify-self-end">@</div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default JobRequestCard;

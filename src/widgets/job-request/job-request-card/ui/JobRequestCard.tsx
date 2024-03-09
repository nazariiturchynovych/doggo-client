import React from 'react';
import { JobRequest } from '@/entities/jobRequest/model/models.ts';
import { Link } from 'react-router-dom';

type JobRequestCardProps = {
  jobRequest: JobRequest;
};

function formatDateRange(startDate: Date, endDate: Date): string {
  // Format start date
  const startDay = startDate.getDate().toString().padStart(2, '0');
  const startMonth = (startDate.getMonth() + 1).toString().padStart(2, '0');
  const startHour = startDate.getHours().toString().padStart(2, '0');
  const startMinute = startDate.getMinutes().toString().padStart(2, '0');

  // Format end date
  const endHour = endDate.getHours().toString().padStart(2, '0');
  const endMinute = endDate.getMinutes().toString().padStart(2, '0');

  // Construct the formatted string
  const formattedStartDate = `${startDay}.${startMonth} ${startHour}:${startMinute}`;
  const formattedEndDate = `${endHour}:${endMinute}`;

  return `${formattedStartDate}-${formattedEndDate}`;
}

const JobRequestCard: React.FC<JobRequestCardProps> = ({ jobRequest }) => {
  // Convert jobRequest.requiredSchedule.from and jobRequest.requiredSchedule.to to Date objects
  const startDate = new Date(jobRequest.requiredSchedule.from);
  const endDate = new Date(jobRequest.requiredSchedule.to);

  return (
    <Link className="w-full" to={`/job-request-info/${jobRequest.id}`}>
      <div className="center relative flex w-full items-center justify-between gap-3 rounded-md border bg-white p-5 shadow-md">
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
          </div>
        </div>
        <div className="flex h-full flex-col items-end justify-between">
          <div>{jobRequest.paymentTo}$</div>
          <div className="justify-self-end">@</div>
        </div>
      </div>
    </Link>
  );
};

export default JobRequestCard;

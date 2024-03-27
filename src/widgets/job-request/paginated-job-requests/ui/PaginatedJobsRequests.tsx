import React, { useState } from 'react';
import { Pagination } from '@/shared/ui';
import { getPageFromArray } from '@/shared/lib/utils.ts';
import { JobRequest } from '@/entities/jobRequest/model/models.ts';
import JobRequestList from '@/widgets/job-request/job-request-list/ui/JobRequestList.tsx';
import { AddJobRequestButton } from '@/widgets/job-request/paginated-job-requests/ui/AddJobRequestButton.tsx';
import { JobRequestSkeleton } from '@/widgets/job-request/paginated-job-requests/ui/JobRequesSkeleton.tsx';

type PaginatedJobRequestsProps = {
  jobRequests: JobRequest[];
  isLoading?: boolean;
};

export const PaginatedJobsRequests: React.FC<PaginatedJobRequestsProps> = ({
  jobRequests,
  isLoading,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="relative rounded border shadow-md">
      <div className="p-2 text-center text-xl font-bold">Job Requests</div>
      <div className="flex flex-col items-center justify-center">
        <div className="max-h-96 w-full overflow-scroll p-5">
          {isLoading && <JobRequestSkeleton />}
          {jobRequests.length > 0 && (
            <JobRequestList jobRequests={getPageFromArray<JobRequest>(jobRequests, currentPage)} />
          )}
          {!isLoading && jobRequests.length == 0 && (
            <div className="text-center text-lg text-slate-500">
              <p>You don't have any job requests, create one if you want</p>
            </div>
          )}
        </div>
        <Pagination
          pagesCount={Math.trunc(jobRequests.length / 10 + 1)}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
        {<AddJobRequestButton />}
      </div>
    </div>
  );
};

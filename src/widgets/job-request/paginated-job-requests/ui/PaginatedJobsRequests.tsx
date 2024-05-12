import React, { useState } from 'react';
import { Pagination, ScrollArea, ScrollBar } from '@/shared/ui';
import { getPageFromArray } from '@/shared/lib/utils.ts';
import { JobRequest } from '@/entities/jobRequest/model/models.ts';
import { AddJobRequestButton } from '@/widgets/job-request/paginated-job-requests/ui/AddJobRequestButton.tsx';
import { useGetDogOwnerJobRequests } from '@/shared/hooks';
import JobRequestCard from '@/widgets/job-request/job-request-card/ui/JobRequestCard.tsx';
import { PaginatedJobRequestsSkeleton } from '@/widgets/job-request/paginated-job-requests/ui/PaginatedJobRequestsSkeleton.tsx';

type PaginatedJobRequestsProps = {
  dogOwnerId: string;
};

export const PaginatedJobsRequests: React.FC<PaginatedJobRequestsProps> = ({ dogOwnerId }) => {
  const { data: jobRequestsResponse, isLoading } = useGetDogOwnerJobRequests({ id: dogOwnerId });
  const [currentPage, setCurrentPage] = useState(1);

  if (!jobRequestsResponse || isLoading) {
    return <PaginatedJobRequestsSkeleton />;
  }

  const jobRequests = jobRequestsResponse.data;
  const pageOfJobRequests = getPageFromArray<JobRequest>(jobRequests, currentPage);

  console.log(jobRequestsResponse);

  return (
    <div className={'relative p-2 sm:px-5'}>
      <h4 className="p-2 pb-6 text-center text-xl font-bold">Job Requests</h4>
      <ScrollArea className="w-full lg:h-72">
        <div className="flex gap-5  pb-3 lg:grid lg:grid-cols-2 xl:grid-cols-2">
          {jobRequests.length > 0 &&
            pageOfJobRequests.map((item) => (
              <JobRequestCard key={item.id.toString()} jobRequest={item} />
            ))}
        </div>
        {!isLoading && jobRequests.length == 0 && (
          <div className="text-center text-lg text-slate-500">
            <p>You don't have any job requests, create one if you want</p>
          </div>
        )}
        <ScrollBar className={'mt-2 lg:hidden'} orientation="horizontal" />
      </ScrollArea>
      <Pagination
        pagesCount={Math.trunc(jobRequests.length / 10 + 1)}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
      <AddJobRequestButton />
    </div>
  );
};

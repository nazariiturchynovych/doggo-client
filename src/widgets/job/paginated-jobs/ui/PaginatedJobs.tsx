import React, { useState } from 'react';
import { Job } from '@/entities/job/model/models.ts';
import { Pagination } from '@/shared/ui';
import { getPageFromArray } from '@/shared/lib/utils.ts';
import JobList from '@/widgets/job/job-list/ui/JobList.tsx';
import { JobSkeleton } from '@/widgets/job/paginated-jobs/ui/JobSkeleton.tsx';

type PaginatedJobsProps = {
  jobs: Job[];
  isLoading: boolean;
};

export const PaginatedJobs: React.FC<PaginatedJobsProps> = ({ jobs, isLoading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className="rounded-b-md border-t bg-white">
      <div className="p-2 text-center text-xl font-bold">Jobs</div>
      <div className="flex flex-col items-center justify-center">
        <div className="max-h-[470px] w-full overflow-scroll p-5">
          {isLoading && <JobSkeleton />}
          {jobs.length > 0 && <JobList jobs={getPageFromArray<Job>(jobs, currentPage)} />}
        </div>
        <Pagination
          pagesCount={Math.trunc(jobs.length / 10 + 1)}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/shared/ui';
import { JobRequestListSkeleton } from '@/widgets/job-request/job-request-list/ui/JobRequestListSkeleton.tsx';
import { JobRequestFilter } from '@/widgets/job-request/job-request-scroll/ui/JobRequestFilter.tsx';

export const JobRequestScrollSkeleton: React.FC = () => {
  return (
    <div className={'flex flex-1 flex-col'}>
      <div className={'flex justify-between border-b p-4 sm:p-8'}>
        <Link to={'/add-job-request'}>
          <Button>Add request</Button>
        </Link>
        <JobRequestFilter
          setFilterValue={(x) => x}
          filterValue={{ sortColumn: '', sortOrder: '' }}
        />
      </div>
      <JobRequestListSkeleton />
    </div>
  );
};

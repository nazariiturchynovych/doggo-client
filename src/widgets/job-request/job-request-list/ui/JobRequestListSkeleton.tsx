import React from 'react';
import { JobRequestCardSkeleton } from '@/widgets/job-request/job-request-card/ui/JobRequestCardSkeleton.tsx';

export const JobRequestListSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-5 p-4 sm:grid-cols-2 sm:p-8">
      <JobRequestCardSkeleton />
      <JobRequestCardSkeleton />
      <JobRequestCardSkeleton />
      <JobRequestCardSkeleton />
    </div>
  );
};

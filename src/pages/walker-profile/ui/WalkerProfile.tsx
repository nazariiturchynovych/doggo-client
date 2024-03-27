import React from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { PaginatedJobs } from '@/widgets/job/paginated-jobs/ui/PaginatedJobs.tsx';
import { PaginatedJobsRequests } from '@/widgets/job-request/paginated-job-requests/ui/PaginatedJobsRequests.tsx';
import { useGetWalkerJobRequests, useGetWalkerJobs } from '@/pages/walker-profile/lib/hooks';
import { useGetWalker } from '@/widgets/walker/walker-card/lib/hooks';
import { WalkerCard } from '@/widgets/walker/walker-card/ui/WalkerCard.tsx';

export const WalkerProfile: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  if (!id) {
    navigate('/');
  }

  const { data: walkerResponse, isLoading: isWalkerLoading } = useGetWalker({ id: id! });

  const { data: jobRequestsResponse, isLoading: isJobRequestsLoading } = useGetWalkerJobRequests({
    id: id!,
  });
  const { data: dogOwnerJobsResponse, isLoading: isJobsLoading } = useGetWalkerJobs({
    id: id!,
  });

  if (walkerResponse?.isFailure) {
    return <Navigate to={'create-walker'} />;
  }

  const jobRequests = jobRequestsResponse?.data;
  const jobs = dogOwnerJobsResponse?.data;

  return (
    <div className="flex h-full w-full flex-col gap-5 pt-5">
      <WalkerCard walker={walkerResponse?.data} isLoading={isWalkerLoading} />
      <div className="flex flex-col gap-5 bg-white">
        <PaginatedJobs jobs={jobs ?? []} isLoading={isJobsLoading} />
        <PaginatedJobsRequests jobRequests={jobRequests ?? []} isLoading={isJobRequestsLoading} />
      </div>
    </div>
  );
};

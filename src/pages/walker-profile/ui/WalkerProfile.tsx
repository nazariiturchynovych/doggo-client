import React from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { PaginatedJobs } from '@/widgets/job/paginated-jobs/ui/PaginatedJobs.tsx';
import { useGetWalkerJobs } from '@/pages/walker-profile/lib/hooks';
import { useGetWalker } from '@/widgets/walker/walker-card/lib/hooks';
import { WalkerCard } from '@/widgets/walker/walker-card/ui/WalkerCard.tsx';

export const WalkerProfile: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  if (!id) {
    navigate('/');
  }

  const { data: walkerResponse, isLoading: isWalkerLoading } = useGetWalker({ id: id! });

  const { data: dogOwnerJobsResponse, isLoading: isJobsLoading } = useGetWalkerJobs({
    id: id!,
  });

  if (walkerResponse?.isFailure) {
    return <Navigate to={'create-walker'} />;
  }

  const jobs = dogOwnerJobsResponse?.data;

  return (
    <div className="flex h-full w-full flex-col rounded-md border bg-white pt-5 shadow-sm">
      <WalkerCard walker={walkerResponse?.data} isLoading={isWalkerLoading} />
      <PaginatedJobs jobs={jobs ?? []} isLoading={isJobsLoading} />
    </div>
  );
};

import React from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { DogOwnerCard } from '@/widgets/dog-owner/dog-owner-card/ui/DogOnwnerCard.tsx';
import { useGetDogOwnerJobRequests, useGetDogOwnerJobs } from '@/pages/dog-owner-profile/lib/hooks';
import { useGetDogOwnerDogs } from '@/features/create-job-request';
import { DogGrid } from '@/widgets/dog/dog-grid/ui/DogGrid.tsx';
import { PaginatedJobs } from '@/widgets/job/paginated-jobs/ui/PaginatedJobs.tsx';
import { PaginatedJobsRequests } from '@/widgets/job-request/paginated-job-requests/ui/PaginatedJobsRequests.tsx';
import { useGetDogOwner } from '@/widgets/dog-owner/dog-owner-card/lib/hooks';

export const DogOwnerProfile: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  if (!id) {
    console.log('its id');
    navigate('/');
  }

  const { data: dogOwnerResponse, isLoading: isDogOwnerLoading } = useGetDogOwner({ id: id! });

  const { data: jobRequestsResponse, isLoading: isJobRequestsLoading } = useGetDogOwnerJobRequests({
    id: id!,
  });
  const { data: dogOwnerDogsResponse, isLoading: isJobsLoading } = useGetDogOwnerDogs({
    id: id!,
  });
  const { data: dogOwnerJobsResponse, isLoading: isDogsLoading } = useGetDogOwnerJobs({
    id: id!,
  });

  if (dogOwnerResponse?.isFailure) {
    return <Navigate to={'create-dog-owner'} />;
  }

  const jobRequests = jobRequestsResponse?.data;
  const jobs = dogOwnerJobsResponse?.data;
  const dogs = dogOwnerDogsResponse?.data;

  return (
    <div className="flex h-full w-full flex-col gap-5 pt-5">
      <DogOwnerCard dogOwner={dogOwnerResponse?.data} isLoading={isDogOwnerLoading} />
      <div className="flex flex-col gap-5 bg-white">
        <PaginatedJobs jobs={jobs ?? []} isLoading={isJobsLoading} />
        <PaginatedJobsRequests jobRequests={jobRequests ?? []} isLoading={isJobRequestsLoading} />
        <DogGrid dogs={dogs ?? []} isLoading={isDogsLoading} />
      </div>
    </div>
  );
};

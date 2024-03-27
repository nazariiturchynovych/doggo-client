import { useQuery } from '@tanstack/react-query';
import { GetDogOwnerJobRequestsRequestProps, jobRequestApi } from '@/shared/api/job-request-api';
import { GetDogOwnerJobsRequestProps, jobApi } from '@/shared/api/job-api';

export const useGetDogOwnerJobRequests = (props: GetDogOwnerJobRequestsRequestProps) => {
  return useQuery({
    queryKey: ['GetDogOwnerJobRequests'],
    queryFn: async () => await jobRequestApi.getDogOwnerJobRequests(props),
  });
};

export const useGetDogOwnerJobs = (props: GetDogOwnerJobsRequestProps) => {
  return useQuery({
    queryKey: ['GetDogOwnerJobs'],
    queryFn: async () => await jobApi.getDogOwnerJobs(props),
  });
};

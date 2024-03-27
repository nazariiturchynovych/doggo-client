import { useQuery } from '@tanstack/react-query';
import { GetDogOwnerJobRequestsRequestProps, jobRequestApi } from '@/shared/api/job-request-api';
import { GetDogOwnerJobsRequestProps, jobApi } from '@/shared/api/job-api';

export const useGetWalkerJobRequests = (props: GetDogOwnerJobRequestsRequestProps) => {
  return useQuery({
    queryKey: ['GetWalkerJobRequests'],
    queryFn: async () => await jobRequestApi.getWalkerJobRequests(props),
  });
};

export const useGetWalkerJobs = (props: GetDogOwnerJobsRequestProps) => {
  return useQuery({
    queryKey: ['GetWalkerJobs'],
    queryFn: async () => await jobApi.getWalkerJobs(props),
  });
};

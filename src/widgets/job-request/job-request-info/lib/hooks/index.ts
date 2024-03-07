import { GetJobRequestRequestProps, jobRequestApi } from '@/shared/api/job-request-api';
import { useQuery } from '@tanstack/react-query';

export const useGetJobRequest = (props: GetJobRequestRequestProps) => {
  return useQuery({
    queryKey: ['GetJobRequest'],
    queryFn: async () => await jobRequestApi.getJobRequest(props),
  });
};

import { useMutation, useQuery } from '@tanstack/react-query';
import { CreateJobRequestProps, jobApi } from '@/shared/api/job-api';
import { GetWalkerRequestProps } from '@/shared/api/walker-api';

export const useCreateJob = () => {
  return useMutation({
    mutationFn: async (props: CreateJobRequestProps) => await jobApi.createJob(props),
    onError: (error) => console.error(JSON.stringify(error)),
  });
};

export const useGetWalkerJobs = (props: GetWalkerRequestProps) => {
  return useQuery({
    queryKey: [props.id],
    queryFn: async () => await jobApi.getWalkerJobs(props),
  });
};

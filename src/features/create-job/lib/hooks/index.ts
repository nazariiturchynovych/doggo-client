import { useMutation } from '@tanstack/react-query';
import { CreateJobRequestProps, jobApi } from '@/shared/api/job-api';

export const useCreateJob = () => {
  return useMutation({
    mutationFn: async (props: CreateJobRequestProps) => await jobApi.createJob(props),
    onError: (error) => console.error(JSON.stringify(error)),
  });
};

import { useMutation, useQuery } from '@tanstack/react-query';
import { CreateJobRequestRequestProps, jobRequestApi } from '@/shared/api/job-request-api';
import { dogApi, GetDogOwnerDogsRequestProps } from '@/shared/api/dog-api';

export const useCreateJobRequest = () => {
  return useMutation({
    mutationFn: async (props: CreateJobRequestRequestProps) => await jobRequestApi.createJobRequest(props),
    onError: (error) => console.error(JSON.stringify(error)),
  });
};

export const useGetDogOwnerDogs = (props: GetDogOwnerDogsRequestProps) => {
  return useQuery({
    queryKey: ['GetDogOwnerDogs'],
    queryFn: async () => await dogApi.getDogOwnerDogs(props),
  });
};
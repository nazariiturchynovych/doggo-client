import { CreateDogRequestProps, dogApi, GetDogRequestProps } from '@/shared/api/dog-api';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useCreateDog = () => {
  return useMutation({
    mutationFn: async (props: CreateDogRequestProps) => await dogApi.createDog(props),
    onError: (error) => console.error(JSON.stringify(error)),
  });
};

export const useGetDog = (props: GetDogRequestProps) => {
  return useQuery({
    queryKey: [props.id.toString()],
    queryFn: async () => await dogApi.getDog(props),
  });
};

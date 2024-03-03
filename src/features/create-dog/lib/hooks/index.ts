import { useMutation } from '@tanstack/react-query';
import { CreateDogRequestProps, dogApi } from '@/shared/api/dog-api';

export const useCreateDog = () => {

  return useMutation({
    mutationFn: async (props: CreateDogRequestProps) => await dogApi.createDog(props),
    onError: (error) => console.error(JSON.stringify(error)),
  });
};
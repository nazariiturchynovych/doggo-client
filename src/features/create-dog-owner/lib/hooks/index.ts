import { useMutation } from '@tanstack/react-query';
import { CreateDogOwnerRequestProps, dogOwnerApi } from '@/shared/api/dog-owner-api';

export const useCreateDogOwner = () => {
  return useMutation({
    mutationFn: async (props: CreateDogOwnerRequestProps) => await dogOwnerApi.createDogOwner(props),
    onError: (error) => console.error(JSON.stringify(error)),
  });
};
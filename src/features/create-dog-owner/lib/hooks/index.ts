import { useMutation } from '@tanstack/react-query';
import { CreateDogOwnerRequestProps } from '@/shared/api/dog-owner-api';
import { useDogOwnerStore } from '@/entities/dogOwner/model/store.ts';

export const useCreateDogOwner = () => {
  const func = useDogOwnerStore(state => state.createDogOwner)

  return useMutation({
    mutationFn: async (props: CreateDogOwnerRequestProps) => await func(props),
    onError: (error) => console.error(JSON.stringify(error)),
  });
};
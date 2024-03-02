import { useMutation } from '@tanstack/react-query';
import { CreateWalkerRequestProps, walkerApi } from '@/shared/api/walker-api';

export const useCreateWalker = () => {
  return useMutation({
    mutationFn: async (props: CreateWalkerRequestProps) => await walkerApi.createWalker(props),
    onError: (error) => console.error(JSON.stringify(error)),
  });
};
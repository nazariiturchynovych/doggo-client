import { useMutation } from '@tanstack/react-query';
import { CreateWalkerRequestProps } from '@/shared/api/walker-api';
import { useWalkerStore } from '@/entities/walker/model/store.ts';

export const useCreateWalker = () => {
  const func = useWalkerStore(state => state.createWalker)

  return useMutation({
    mutationFn: async (props: CreateWalkerRequestProps) => await func(props),
    onError: (error) => console.error(JSON.stringify(error)),
  });
};
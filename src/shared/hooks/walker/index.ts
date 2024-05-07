import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useWalkerStore } from '@/entities/walker/model/store.ts';
import {
  CreateWalkerRequestProps,
  UpdateWalkerRequestProps,
  walkerApi,
} from '@/shared/api/walker-api';
import { GetDogOwnerRequestProps } from '@/shared/api/dog-owner-api';

export const useCreateWalker = () => {
  const func = useWalkerStore((state) => state.createWalker);

  return useMutation({
    mutationFn: async (props: CreateWalkerRequestProps) => await func(props),
    onError: (error) => console.error(JSON.stringify(error)),
  });
};

export const useGetWalker = (props: GetDogOwnerRequestProps) => {
  return useQuery({
    queryKey: ['GetWalker'],
    queryFn: async () => await walkerApi.getWalker(props),
  });
};

export const useUpdateWalker = (walkerId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [walkerId],
    mutationFn: async (props: UpdateWalkerRequestProps) => await walkerApi.updateWalker(props),
    onSuccess: (data) => {
      if (data.isSuccess)
        queryClient.invalidateQueries({
          queryKey: [walkerId],
        });
    },
  });
};

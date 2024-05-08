import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useWalkerStore } from '@/entities/walker/model/store.ts';
import {
  CreateWalkerRequestProps,
  UpdateWalkerRequestProps,
  walkerApi,
} from '@/shared/api/walker-api';
import { GetDogOwnerRequestProps } from '@/shared/api/dog-owner-api';
import { getTokens, setTokens } from '@/shared/lib/utils.ts';
import { authenticationApi } from '@/shared/api/auth-api';

export const useCreateWalker = () => {
  const func = useWalkerStore((state) => state.createWalker);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (props: CreateWalkerRequestProps) => {
      const data = await func(props);
      if (data.isSuccess) {
        const props = getTokens();

        const data = await authenticationApi.refreshToken(props);
        if (data.isSuccess) {
          setTokens(data.data.token, data.data.refreshToken);
          queryClient.invalidateQueries({ queryKey: ['getUser'] }); //TODO change query keys
        }
      }
      return data;
    },
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

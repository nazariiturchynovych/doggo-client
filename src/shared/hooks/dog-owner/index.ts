import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useDogOwnerStore } from '@/entities/dogOwner/model/store.ts';
import {
  CreateDogOwnerRequestProps,
  dogOwnerApi,
  GetDogOwnerRequestProps,
  UpdateDogOwnerRequestProps,
} from '@/shared/api/dog-owner-api';
import { dogApi, GetDogOwnerDogsRequestProps } from '@/shared/api/dog-api';
import { GetUserRequestProps, userApi } from '@/shared/api/user-api';

export const useCreateDogOwner = () => {
  const func = useDogOwnerStore((state) => state.createDogOwner);

  return useMutation({
    mutationFn: async (props: CreateDogOwnerRequestProps) => await func(props),
    onError: (error) => console.error(JSON.stringify(error)),
  });
};

export const useGetDogOwnerDogs = (props: GetDogOwnerDogsRequestProps) => {
  return useQuery({
    queryKey: ['GetDogOwnerDogs'],
    queryFn: async () => await dogApi.getDogOwnerDogs(props),
  });
};

export const useGetDogOwner = (props: GetDogOwnerRequestProps) => {
  return useQuery({
    queryKey: ['GetDogs'],
    queryFn: async () => await dogOwnerApi.getDogOwner(props),
  });
};

export const useGetUser = (props: GetUserRequestProps) => {
  return useQuery({
    queryKey: [`GetUser-${props.id}`],
    queryFn: async () => await userApi.getUser(props),
  });
};

export const useUpdateDogOwner = (dogOwnerId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [dogOwnerId],
    mutationFn: async (props: UpdateDogOwnerRequestProps) =>
      await dogOwnerApi.updateDogOwner(props),
    onSuccess: (data) => {
      if (data.isSuccess)
        queryClient.invalidateQueries({
          queryKey: [dogOwnerId],
        });
    },
  });
}; //TODO maybe change keys

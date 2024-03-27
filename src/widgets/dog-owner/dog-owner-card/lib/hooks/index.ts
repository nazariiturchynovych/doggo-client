import { useQuery } from '@tanstack/react-query';
import { dogOwnerApi, GetDogOwnerRequestProps } from '@/shared/api/dog-owner-api';
import { GetUserRequestProps, userApi } from '@/shared/api/user-api';

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

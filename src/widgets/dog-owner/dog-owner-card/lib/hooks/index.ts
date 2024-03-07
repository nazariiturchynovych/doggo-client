import { useQuery } from '@tanstack/react-query';
import { dogOwnerApi, GetDogOwnerRequestProps } from '@/shared/api/dog-owner-api';

export const useGetDogOwner = (props: GetDogOwnerRequestProps) => {
  return useQuery({
    queryKey: ['GetDogOwner'],
    queryFn: async () => await dogOwnerApi.getDogOwner(props),
  });
};

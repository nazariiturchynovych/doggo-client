import { useQuery } from '@tanstack/react-query';
import { dogApi, GetDogRequestProps } from '@/shared/api/dog-api';

export const useGetDog = (props: GetDogRequestProps) => {
  return useQuery({
    queryKey: ['GetDogOwner'],
    queryFn: async () => await dogApi.getDog(props),
  });
};
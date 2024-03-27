import { useQuery } from '@tanstack/react-query';
import { GetDogOwnerRequestProps } from '@/shared/api/dog-owner-api';
import { walkerApi } from '@/shared/api/walker-api';

export const useGetWalker = (props: GetDogOwnerRequestProps) => {
  return useQuery({
    queryKey: ['GetWalker'],
    queryFn: async () => await walkerApi.getWalker(props),
  });
};

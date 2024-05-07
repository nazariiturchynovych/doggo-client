import { useUserStore } from '@/entities/user';
import { useMutation } from '@tanstack/react-query';

export const useGetCurrentUser = () => {
  const func = useUserStore((state) => state.getCurrentUser);
  return useMutation({
    mutationFn: async () => await func(),
  });
};

import { useMutation } from '@tanstack/react-query';
import { authenticationApi, SignUpRequestProps } from '@/shared/api/auth-api';


export const useSignUp = () => {
  return useMutation({
    mutationFn: async (props: SignUpRequestProps) => await authenticationApi.signUp(props),
    onError: (error) => console.error(JSON.stringify(error)),
  });
};
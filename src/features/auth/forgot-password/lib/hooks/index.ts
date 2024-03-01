import { useMutation } from '@tanstack/react-query';
import {
  authenticationApi,
  SendResetPasswordConfirmationTokenRequestProps,
} from '@/shared/api/auth-api';

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (props: SendResetPasswordConfirmationTokenRequestProps) => await authenticationApi.sendResetPasswordConfirmationToken(props),
    onError: (error) => console.error(JSON.stringify(error)),
  });
};
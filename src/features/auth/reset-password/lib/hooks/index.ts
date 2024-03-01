import { useMutation } from '@tanstack/react-query';
import {
  authenticationApi, ConfirmResetPasswordRequestProps,
} from '@/shared/api/auth-api';

export const useConfirmForgotPassword = () => {
  return useMutation({
    mutationFn: async (props: ConfirmResetPasswordRequestProps) => await authenticationApi.confirmResetPassword(props),
    onError: (error) => console.error(JSON.stringify(error)),
  });
};
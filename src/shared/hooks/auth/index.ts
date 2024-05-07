import {
  authenticationApi,
  ConfirmResetPasswordRequestProps,
  SendResetPasswordConfirmationTokenRequestProps,
  SignInFacebookRequestProps,
  SignInGoogleRequestProps,
  SignInRequestProps,
} from '@/shared/api/auth-api';
import { useMutation } from '@tanstack/react-query';
import { useUserStore } from '@/entities/user';

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (props: SendResetPasswordConfirmationTokenRequestProps) =>
      await authenticationApi.sendResetPasswordConfirmationToken(props),
    onError: (error) => console.error(JSON.stringify(error)),
  });
};

export const useConfirmForgotPassword = () => {
  return useMutation({
    mutationFn: async (props: ConfirmResetPasswordRequestProps) =>
      await authenticationApi.confirmResetPassword(props),
    onError: (error) => console.error(JSON.stringify(error)),
  });
};

export const useSignInUser = () => {
  const func = useUserStore((state) => state.signIn);
  return useMutation({
    mutationFn: async (props: SignInRequestProps) => await func(props),
    onError: (error) => console.error(JSON.stringify(error)),
  });
};

export const useSignInUserFacebook = () => {
  const func = useUserStore((state) => state.signInFacebook);
  return useMutation({
    mutationFn: async (props: SignInFacebookRequestProps) => await func(props),
  });
};

export const useSignInUserGoogle = () => {
  const func = useUserStore((state) => state.signInGoogle);
  return useMutation({
    mutationFn: async (props: SignInGoogleRequestProps) => await func(props),
  });
};

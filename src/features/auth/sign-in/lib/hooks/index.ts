import { useMutation } from '@tanstack/react-query';
import { useUserStore } from '@/entities/user';
import { SignInFacebookRequestProps, SignInGoogleRequestProps, SignInRequestProps } from '@/shared/api/auth-api';

export const useSignInUser = () => {
  const func = useUserStore(state => state.signIn);
  return useMutation({
    mutationFn: async (props: SignInRequestProps) => await func(props),
    onError: (error) => console.error(JSON.stringify(error)),
  });
};

export const useSignInUserFacebook = () => {
  const func = useUserStore(state => state.signInFacebook);
  return useMutation({
    mutationFn: async (props: SignInFacebookRequestProps) => await func(props),
  });
};

export const useSignInUserGoogle = () => {
  const func = useUserStore(state => state.signInGoogle);
  return useMutation({
    mutationFn: async (props: SignInGoogleRequestProps) => await func(props),
  });
};

export const useGetCurrentUser = () => {
  const func = useUserStore(state => state.getCurrentUser);
  return useMutation({
    mutationFn: async () => await func(),
  });
};
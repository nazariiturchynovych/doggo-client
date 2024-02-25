import { create } from 'zustand';
import {
  SignInFacebookRequestProps,
  SignInGoogleRequestProps,
  SignInRequestProps,
} from '@/shared/api/auth-api/models/requests.ts';
import { BaseResultWithData } from '@/shared/api/result';
import { SignInDto } from '@/shared/api/auth-api/models/dtos.ts';
import { authenticationService } from '@/shared/api/auth-api';
import { User } from '@/shared/entities/user/model/models.ts';
import { Guid } from 'typescript-guid';

type UserState = {
  user: User;
  setUser: (user: User) => void;
  isAuth: boolean;
  signIn: (props: SignInRequestProps) => Promise<BaseResultWithData<SignInDto>>;
  signInGoogle: (props: SignInGoogleRequestProps) => Promise<BaseResultWithData<SignInDto>>;
  signInFacebook: (props: SignInFacebookRequestProps) => Promise<BaseResultWithData<SignInDto>>;
  signOut: () => void
};

export const useUserStore = create<UserState>()((set) => ({
      user: {
        age: 0,
        id: Guid.EMPTY,
        firstName: '',
        lastName: '',
        email: '',
        dogOwnerId: null,
        walkerId: null,
      },
      setUser: (user) =>
        set(() => {
          return { user: user };
        }),
      isAuth: false,
      signIn: async (props) => {
        const response = await authenticationService.signIn(props);
        if (response.isSuccess) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('refreshToken', response.data.refreshToken);
          set(() => ({
            isAuth: response.isSuccess,
          }));
        }
        return response;
      },
      signInGoogle: async (props) => {
        const response = await authenticationService.signInGoogle(props);
        if (response.isSuccess) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('refreshToken', response.data.refreshToken);
          set(() => ({
            isAuth: response.isSuccess,
          }));
        }
        return response;
      },

      signInFacebook: async (props) => {
        const response = await authenticationService.signInFacebook(props);
        if (response.isSuccess) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('refreshToken', response.data.refreshToken);
          set(() => ({
            isAuth: response.isSuccess,
          }));
        }
        return response;
      },
      signOut: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        set(() => ({
          isAuth: false,
        }));
      },
    }),
  )
;

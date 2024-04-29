import { create } from 'zustand';
import {
  SignInFacebookRequestProps,
  SignInGoogleRequestProps,
  SignInRequestProps,
} from '@/shared/api/auth-api/models/requests.ts';
import { BaseResponseWithData } from '@/shared/api/result';
import { SignInDto } from '@/shared/api/auth-api/models/dtos.ts';
import { authenticationApi } from '@/shared/api/auth-api';
import { User } from '@/entities/user/model/models.ts';
import { GetUserRequestProps, userApi } from '@/shared/api/user-api';
import { devtools } from 'zustand/middleware';

type UserState = {
  user: User;
  setUser: (user: User) => void;
  getCurrentUser: () => Promise<BaseResponseWithData<User>>;
  isAuth: boolean;
  setIsAuth: (state: boolean) => void;
  signIn: (props: SignInRequestProps) => Promise<BaseResponseWithData<SignInDto>>;
  signInGoogle: (props: SignInGoogleRequestProps) => Promise<BaseResponseWithData<SignInDto>>;
  signInFacebook: (props: SignInFacebookRequestProps) => Promise<BaseResponseWithData<SignInDto>>;
  signOut: () => void;
};

export const useUserStore = create<UserState>()(
  devtools((set) => ({
    user: {
      age: 0,
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      dogOwnerId: null,
      walkerId: null,
    }, //TODO add phone number
    setUser: (user) =>
      set(() => {
        return { user: user };
      }),
    getCurrentUser: async () => {
      const reqProps: GetUserRequestProps = {
        id: '',
      };
      const response = await userApi.getUser(reqProps);

      if (response.isSuccess) {
        set(() => ({
          user: response.data,
          isAuth: true,
        }));
      }
      return response;
    },
    isAuth: false,

    setIsAuth: (state) =>
      set(() => {
        return { isAuth: state };
      }),
    signIn: async (props) => {
      const response = await authenticationApi.signIn(props);
      if (response.isSuccess) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        set(() => ({
          isAuth: true,
        }));
      }
      return response;
    },

    signInGoogle: async (props) => {
      console.log(props);

      const response = await authenticationApi.signInGoogle(props);
      if (response.isSuccess) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        set(() => ({
          isAuth: true,
        }));
      }
      return response;
    },

    signInFacebook: async (props) => {
      const response = await authenticationApi.signInFacebook(props);
      if (response.isSuccess) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        set(() => ({
          isAuth: true,
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
  })),
);

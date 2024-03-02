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
import { Guid } from 'typescript-guid';
import { GetUserRequestProps, userApi } from '@/shared/api/user-api';

type UserState = {
  user: User;
  setUser: (user: User) => void;
  getCurrentUser: () => Promise<BaseResponseWithData<User>>
  isAuth: boolean;
  signIn: (props: SignInRequestProps) => Promise<BaseResponseWithData<SignInDto>>;
  signInGoogle: (props: SignInGoogleRequestProps) => Promise<BaseResponseWithData<SignInDto>>;
  signInFacebook: (props: SignInFacebookRequestProps) => Promise<BaseResponseWithData<SignInDto>>;
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
      }, //TODO add phone number
      setUser: (user) =>
        set(() => {
          return { user: user };
        }),
      getCurrentUser: async () => {
        const reqProps: GetUserRequestProps = {
          id: undefined,
        };
        const response = await userApi.getUser(reqProps);

        if (response.isSuccess) {
          set(() => ({
            user: response.data,
          }));
        }
        return response;

      },
      isAuth: false,
      signIn: async (props) => {
        const response = await authenticationApi.signIn(props);
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
        const response = await authenticationApi.signInGoogle(props);
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
        const response = await authenticationApi.signInFacebook(props);
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

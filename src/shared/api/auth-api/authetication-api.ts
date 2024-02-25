import $api from '@/shared/lib/config/axios.ts';
import { BaseResponse, BaseResponseWithData } from '@/shared/api/result';
import { SignInDto } from '@/shared/api/auth-api/models/dtos.ts';
import {
  ConfirmEmailRequestProps,
  ConfirmResetPasswordRequestProps,
  RefreshTokenRequestProps,
  SendEmailVerificationTokenRequestProps,
  SendResetPasswordConfirmationTokenRequestProps,
  SignInFacebookRequestProps,
  SignInGoogleRequestProps,
  SignInRequestProps,
  SignUpRequestProps,
} from '@/shared/api/auth-api/models/requests.ts';

export interface AuthenticationAPI {
  signUp: (props: SignUpRequestProps) => Promise<BaseResponse>;
  sendEmailVerificationToken: (props: SendEmailVerificationTokenRequestProps) => Promise<BaseResponse>;
  confirmEmail: (props: ConfirmEmailRequestProps) => Promise<BaseResponse>;
  signIn: (props: SignInRequestProps) => Promise<BaseResponseWithData<SignInDto>>;
  signInGoogle: (props: SignInGoogleRequestProps) => Promise<BaseResponseWithData<SignInDto>>;
  signInFacebook: (props: SignInFacebookRequestProps) => Promise<BaseResponseWithData<SignInDto>>;
  refreshToken: (props: RefreshTokenRequestProps) => Promise<BaseResponseWithData<SignInDto>>;
  sendResetPasswordConfirmationToken: (props: SendResetPasswordConfirmationTokenRequestProps) => Promise<BaseResponse>;
  confirmResetPassword: (props: ConfirmResetPasswordRequestProps) => Promise<BaseResponse>;
}

export class AuthenticationService implements AuthenticationAPI {

  async signUp(props: SignUpRequestProps) {
    const signInQuery = '/Authentication/sign-up';
    const { data } = await $api.post<BaseResponseWithData<SignInDto>>(signInQuery, props);
    return data;
  }

  async sendEmailVerificationToken(props: SendEmailVerificationTokenRequestProps) {
    const signInQuery = '/Authentication/sign-up/send-token';
    const { data } = await $api.post<BaseResponseWithData<SignInDto>>(signInQuery, props);
    return data;
  }

  async confirmEmail(props: ConfirmEmailRequestProps) {
    const signInQuery = '/Authentication/sign-up/confirm-email';
    const { data } = await $api.post<BaseResponseWithData<SignInDto>>(signInQuery, props);
    return data;
  }

  async signIn(props: SignInRequestProps) {
    const signInQuery = '/Authentication/sign-in';
    const { data } = await $api.post<BaseResponseWithData<SignInDto>>(signInQuery, props);
    return data;
  }

  async signInGoogle(props: SignInGoogleRequestProps) {
    const signInQuery = '/Authentication/sign-in-google';
    const { data } = await $api.post<BaseResponseWithData<SignInDto>>(signInQuery, props);
    return data;
  }

  async signInFacebook(props: SignInFacebookRequestProps) {
    const signInQuery = '/Authentication/sign-in-facebook';
    const { data } = await $api.post<BaseResponseWithData<SignInDto>>(signInQuery, props);
    return data;
  }

  async refreshToken(props: RefreshTokenRequestProps) {
    const signInQuery = '/Authentication/refresh-token';
    const { data } = await $api.post<BaseResponseWithData<SignInDto>>(signInQuery, props);
    return data;
  }

  async sendResetPasswordConfirmationToken(props: SendResetPasswordConfirmationTokenRequestProps) {
    const signInQuery = '/Authentication/password';
    const { data } = await $api.post<BaseResponse>(signInQuery, props);
    return data;
  }

  async confirmResetPassword(props: ConfirmResetPasswordRequestProps) {
    const signInQuery = '/Authentication/password/token';
    const { data } = await $api.put<BaseResponse>(signInQuery, props);
    return data;
  }

}
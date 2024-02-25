import $api from '@/shared/lib/config/axios.ts';
import { BaseResult, BaseResultWithData } from '@/shared/api/result';
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
  signUp: (props: SignUpRequestProps) => Promise<BaseResult>;
  sendEmailVerificationToken: (props: SendEmailVerificationTokenRequestProps) => Promise<BaseResult>;
  confirmEmail: (props: ConfirmEmailRequestProps) => Promise<BaseResult>;
  signIn: (props: SignInRequestProps) => Promise<BaseResultWithData<SignInDto>>;
  signInGoogle: (props: SignInGoogleRequestProps) => Promise<BaseResultWithData<SignInDto>>;
  signInFacebook: (props: SignInFacebookRequestProps) => Promise<BaseResultWithData<SignInDto>>;
  refreshToken: (props: RefreshTokenRequestProps) => Promise<BaseResultWithData<SignInDto>>;
  sendResetPasswordConfirmationToken: (props: SendResetPasswordConfirmationTokenRequestProps) => Promise<BaseResult>;
  confirmResetPassword: (props: ConfirmResetPasswordRequestProps) => Promise<BaseResult>;
}

export class AuthenticationService implements AuthenticationAPI {

  async signUp(props: SignUpRequestProps) {
    const signInQuery = '/Authentication/sign-up';
    const { data } = await $api.post<BaseResultWithData<SignInDto>>(signInQuery, props);
    return data;
  }

  async sendEmailVerificationToken(props: SendEmailVerificationTokenRequestProps) {
    const signInQuery = '/Authentication/sign-up/send-token';
    const { data } = await $api.post<BaseResultWithData<SignInDto>>(signInQuery, props);
    return data;
  }

  async confirmEmail(props: ConfirmEmailRequestProps) {
    const signInQuery = '/Authentication/sign-up/confirm-email';
    const { data } = await $api.post<BaseResultWithData<SignInDto>>(signInQuery, props);
    return data;
  }

  async signIn(props: SignInRequestProps) {
    const signInQuery = '/Authentication/sign-in';
    const { data } = await $api.post<BaseResultWithData<SignInDto>>(signInQuery, props);
    return data;
  }

  async signInGoogle(props: SignInGoogleRequestProps) {
    const signInQuery = '/Authentication/sign-in-google';
    const { data } = await $api.post<BaseResultWithData<SignInDto>>(signInQuery, props);
    return data;
  }

  async signInFacebook(props: SignInFacebookRequestProps) {
    const signInQuery = '/Authentication/sign-in-facebook';
    const { data } = await $api.post<BaseResultWithData<SignInDto>>(signInQuery, props);
    return data;
  }

  async refreshToken(props: RefreshTokenRequestProps) {
    const signInQuery = '/Authentication/refresh-token';
    const { data } = await $api.post<BaseResultWithData<SignInDto>>(signInQuery, props);
    return data;
  }

  async sendResetPasswordConfirmationToken(props: SendResetPasswordConfirmationTokenRequestProps) {
    const signInQuery = '/Authentication/password';
    const { data } = await $api.post<BaseResult>(signInQuery, props);
    return data;
  }

  async confirmResetPassword(props: ConfirmResetPasswordRequestProps) {
    const signInQuery = '/Authentication/password/token';
    const { data } = await $api.put<BaseResult>(signInQuery, props);
    return data;
  }

}
import { Guid } from 'typescript-guid';

export type SignUpRequestProps = {
  email: string,
  password: string
  firstName: string,
  lastName: string,
  age: number,
  phoneNumber: string
};

export type SendEmailVerificationTokenRequestProps = {
  email: string;
};

export type ConfirmEmailRequestProps = {
  userId: Guid,
  token: string
};

export type SignInRequestProps = {
  email: string,
  password: string
};

export type SignInGoogleRequestProps = {
  credential: string,
};

export type SignInFacebookRequestProps = {
  accessToken: string,
};

export type RefreshTokenRequestProps = {
  token: string,
  refreshToken: string,
};

export type SendResetPasswordConfirmationTokenRequestProps = {
  email: string,
};

export type ConfirmResetPasswordRequestProps = {
  email: string,
  token: string,
  newPassword: string,
};

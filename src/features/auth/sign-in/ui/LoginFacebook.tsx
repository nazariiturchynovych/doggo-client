import React from 'react';
import { LoginSocialFacebook } from 'reactjs-social-login';
import { useSignInUserFacebook } from '../lib/hooks/index.ts';


export const LoginFacebook: React.FC = () => {
  const { mutateAsync } = useSignInUserFacebook();
  const onSuccess = async (loginResponse: any) => {
    const response = await mutateAsync(loginResponse);

    if (response?.data) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('token', response.data.refreshToken);
    }
  };

  return (
    <LoginSocialFacebook
      appId={'743599117671426'}
      onResolve={onSuccess}
      onReject={(err: any) => console.log(err)}>
      <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-primary transition duration-200 ease-in-out hover:bg-primary/70 hover:shadow-lg ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto h-3.5 w-3.5"
          fill="currentColor"
          viewBox="0 0 24 24">
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
        </svg>
      </div>
    </LoginSocialFacebook>
  );
};

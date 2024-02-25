import React from 'react';
import SignInForm from '@/features/auth/sign-in/ui/SignInForm.tsx';

export const SignIn: React.FC = () => {
  return (
    <div className='flex w-full items-center justify-center'>
      <div className='max-w-screen-md w-full'>
        <SignInForm />
      </div>
    </div>);
};

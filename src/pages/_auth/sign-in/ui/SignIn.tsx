import React from 'react';
import SignInForm from '@/features/auth/sign-in/ui/SignInForm.tsx';

export const SignIn: React.FC = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="w-full max-w-screen-md">
        <SignInForm />
      </div>
    </div>
  );
};

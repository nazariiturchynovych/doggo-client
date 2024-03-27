import React from 'react';
import SignUpForm from '@/features/auth/sign-up/ui/SignUpForm.tsx';

export const SignUp: React.FC = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="w-full max-w-screen-md">
        <SignUpForm />
      </div>
    </div>
  );
};

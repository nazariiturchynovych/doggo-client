import { ForgotPasswordForm } from '@/features/auth/forgot-password';
import React from 'react';

export const ForgotPassword: React.FC = () => {
  return (
    <div className=" flex h-screen w-full items-center justify-center">
      <div className=" w-full max-w-screen-md">
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

import React from 'react';
import { ResetPasswordForm } from '@/features/auth/reset-password';

export const ResetPassword: React.FC = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="w-full max-w-screen-md">
        <ResetPasswordForm />
      </div>
    </div>
  );
};

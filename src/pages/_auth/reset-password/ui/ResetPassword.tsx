import React from 'react'
import { ResetPasswordForm } from '@/features/auth/reset-password';

export const ResetPassword: React.FC = () => {
  return (
    <div className='flex w-full items-center justify-center'>
      <div className='max-w-screen-md w-full'>
        <ResetPasswordForm />
      </div>
    </div>);
}

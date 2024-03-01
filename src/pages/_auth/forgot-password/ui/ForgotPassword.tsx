import { ForgotPasswordForm } from '@/features/auth/forgot-password';
import React from 'react'


export const ForgotPassword: React.FC = () => {
  return (
    <div className='flex w-full items-center justify-center'>
      <div className='max-w-screen-md w-full'>
        <ForgotPasswordForm />
      </div>
    </div>);
}

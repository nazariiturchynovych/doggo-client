import React from 'react'
import SignUpForm from '@/features/auth/sign-up/ui/SignUpForm.tsx';

export const SignUp: React.FC = () => {
  return (
    <div className='flex w-full items-center justify-center'>
      <div className='max-w-screen-md w-full'>
        <SignUpForm />
      </div>
    </div>);
}

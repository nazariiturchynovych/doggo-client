import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/widgets/layouts';

export const PageLayout: React.FC = () => {
  return <div className='w-full flex flex-col items-center'>
    <Header />
    <div className='w-full h-full flex justify-center'>
      <section className='flex h-full flex-1 w-full max-w-6xl px-10'>
        <Outlet />
      </section>

    </div>

  </div>;
};

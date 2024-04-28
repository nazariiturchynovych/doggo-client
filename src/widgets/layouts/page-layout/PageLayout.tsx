import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/widgets/layouts';

export const PageLayout: React.FC = () => {
  return (
    <div className="flex h-full w-full flex-col items-center">
      <Header />
      <div className="w-full max-w-screen-xl p-5 md:p-8">
        <Outlet />
      </div>
    </div>
  );
};

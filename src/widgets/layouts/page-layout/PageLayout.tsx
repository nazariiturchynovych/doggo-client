import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/widgets/layouts';

export const PageLayout: React.FC = () => {
  return (
    <div className="flex w-full flex-col items-center">
      <Header />
      <div className="w-full max-w-screen-xl">
        <Outlet />
      </div>
    </div>
  );
};

import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/widgets/layouts';

export const PageLayout: React.FC = () => {
  return (
    <div className="flex w-full flex-col items-center">
      <Header />
      <div className="flex w-full justify-center">
        <section className="flex h-full w-full flex-1 px-5">
          <Outlet />
        </section>
      </div>
    </div>
  );
};

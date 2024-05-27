import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavMenu } from '@/widgets/layouts';

export const PageLayout: React.FC = () => {
  return (
    <div className="relative flex max-h-screen min-h-screen w-full flex-col lg:max-h-none lg:flex-row">
      <NavMenu />
      <Outlet />
    </div>
  );
};

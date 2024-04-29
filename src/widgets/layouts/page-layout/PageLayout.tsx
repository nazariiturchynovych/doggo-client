import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavMenu } from '@/widgets/layouts';

export const PageLayout: React.FC = () => {
  return (
    <div className="relative flex w-full flex-col lg:flex-row">
      <NavMenu />
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

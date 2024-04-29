import React from 'react';
import { Outlet } from 'react-router-dom';

export const PageLayout: React.FC = () => {
  return (
    <div className="relative flex w-full">
      <element />
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

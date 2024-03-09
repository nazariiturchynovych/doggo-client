import React from 'react';

type LoaderProps = { size?: number };

export const Loader: React.FC<LoaderProps> = ({ size }) => {
  return (
    <div className="flex w-full items-center justify-center">
      <img
        src="/src/shared/assets/icons/loader.svg"
        alt="loader"
        width={size ?? 24}
        height={size ?? 24}
        className="animate-spin fill-white"
      />
    </div>
  );
};

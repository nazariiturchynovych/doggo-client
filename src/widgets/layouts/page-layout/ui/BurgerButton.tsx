import React from 'react';

export interface BurgerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const BurgerButton: React.FC<BurgerButtonProps> = ({ open, setOpen }) => {
  return (
    <button
      onClick={() => {
        setOpen(!open);
      }}
      className="group relative  md:hidden">
      <div className="relative z-20 flex h-[50px] w-[50px] transform items-center justify-center overflow-hidden rounded-full bg-white shadow-xl transition-all duration-200">
        <div className="flex h-[20px] w-[20px] origin-center transform flex-col justify-between overflow-hidden transition-all duration-300">
          <div
            className={`h-[2px] w-7 origin-left transform bg-primary  transition-all duration-300 ${open ? 'rotate-[42deg]' : ''}`}></div>
          <div
            className={`h-[2px] w-1/2 transform rounded bg-primary  transition-all duration-300 ${open ? '-translate-x-10' : ''}`}></div>
          <div
            className={`h-[2px] w-7 origin-left transform bg-primary  transition-all duration-300 ${open ? '-rotate-[42deg]' : ''}`}></div>
        </div>
      </div>
    </button>
  );
};

export default BurgerButton;

import React, { useState } from 'react';

export interface BurgerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: React.MouseEventHandler<HTMLButtonElement>
}
const BurgerButton: React.FC<BurgerButtonProps> = ({...props}) => {

  const [open, setOpen] = useState(false);

  return (<button onClick={event => {
    setOpen(!open)
    props.onClick(event);

  }} className='relative group sm:hidden z-[100]'>
    <div
      className='relative flex overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all bg-primary ring-0 ring-gray-300 hover:ring-8 group-focus:ring-4 ring-opacity-30 duration-200 shadow-xl'>
      <div
        className='flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden'>
        <div
          className={`bg-white h-[2px] w-7 transform transition-all duration-300 origin-left ${open ? 'rotate-[42deg]' : ''}`}></div>
        <div
          className={`bg-white h-[2px] w-1/2 rounded transform transition-all duration-300 ${open ? '-translate-x-10' : ''}`}></div>
        <div
          className={`bg-white h-[2px] w-7 transform transition-all duration-300 origin-left ${open ? '-rotate-[42deg]' : ''}`}></div>
      </div>
    </div>
  </button>);
};

export default BurgerButton;
import React, { useState } from 'react';
import { Button } from '@/shared/ui';
import BurgerButton from '@/widgets/layouts/page-layout/ui/BurgerButton.tsx';


export const Header: React.FC = () => {

  const [openBurgerMenu, setOpenBurgerMenu] = useState(false);
  const onClick = () => {
    setOpenBurgerMenu(!openBurgerMenu);
  };

  return <div className='flex w-full p-4 bg-primary justify-between text-white items-center'>
    <div className='h-full'>
      <img src='/src/shared/assets/images/loggo.svg' height={56} width={56} alt='' />
    </div>
    <div
      className={openBurgerMenu ? 'absolute h-screen w-full top-0 left-0 z-50 text-black flex items-center justify-center flex-col gap-20 text-xl bg-white' : 'hidden sm:flex gap-8 justify-center items-center'}>
      <div>Explore</div>
      <div>User Profile</div>
      <div>Schedule</div>
    </div>
    <Button variant='outline' className='hidden sm:block sm:text-black sm:shadow-lg'>Sign In</Button>
    <BurgerButton onClick={onClick} />
  </div>;
};
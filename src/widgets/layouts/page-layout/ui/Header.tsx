import React, { useState } from 'react';
import { Button } from '@/shared/ui';
import BurgerButton from '@/widgets/layouts/page-layout/ui/BurgerButton.tsx';
import { Link } from 'react-router-dom';


export const Header: React.FC = () => {

  const [openBurgerMenu, setOpenBurgerMenu] = useState(false);
  const onClick = () => {
    setOpenBurgerMenu(!openBurgerMenu);
  };

  return <div className='flex w-full p-4 bg-primary justify-between text-white items-center'>
    <div className='h-full'>
      <Link to={'/'}>
        <img src='/src/shared/assets/images/loggo.svg' height={56} width={56} alt='' />
      </Link>
    </div>
    <div
      className={openBurgerMenu ? 'absolute h-screen w-full top-0 left-0 z-50 text-black flex items-center justify-center flex-col gap-20 text-xl bg-white' : 'hidden sm:flex gap-8 justify-center items-center'}>
      <Link to={'/explore'}>
        <div>Explore</div>
      </Link>
      <Link to={'/user-profile'}>
        <div>Profile</div>
      </Link>
      <Link to={'/schedule'}>
        <div>Schedule</div>
      </Link>
    </div>
    <Button variant='outline' className='hidden sm:block sm:text-black sm:shadow-lg'>
      <Link to={'sign-in'}>
        Sign In
      </Link>
    </Button>
    <BurgerButton onClick={onClick} />
  </div>;
};
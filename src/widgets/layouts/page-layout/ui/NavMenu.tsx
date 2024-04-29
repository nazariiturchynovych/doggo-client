import React, { useState } from 'react';
import { Button } from '@/shared/ui';
import BurgerButton from '@/widgets/layouts/page-layout/ui/BurgerButton.tsx';
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '@/entities/user';

export const NavMenu: React.FC = () => {
  // const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const isAuth = useUserStore((state) => state.isAuth);
  const user = useUserStore((state) => state.user);
  const signOut = useUserStore((state) => state.signOut);
  const [openBurgerMenu, setOpenBurgerMenu] = useState(false);

  const onClickSignOut = () => {
    signOut();
    navigate('/sign-in');
  };

  return (
    <div className="sticky top-0 flex h-screen w-full max-w-72 flex-col gap-8 border-r bg-white p-4 pl-10">
      <div>
        <Link to={'/'}>
          <img src="/src/shared/assets/images/loggo.svg" height={56} width={56} alt="" />
        </Link>
      </div>
      <div
        className={
          openBurgerMenu
            ? 'absolute left-0 top-0 z-50 flex h-screen flex-col items-center justify-center gap-20 bg-gray-50 text-xl text-black'
            : 'hidden gap-8 sm:flex sm:flex-col'
        }>
        {isAuth && (
          <>
            <Link to={'/chat'}>
              <div>Chats</div>
            </Link>

            <Link to={'/explore'}>
              <div>Explore</div>
            </Link>

            <Link to={'/schedule'}>
              <div>Schedule</div>
            </Link>
            <Link
              className={'sm:hidden'}
              to={user.walkerId ? `/walker-profile/${user.walkerId.toString()}` : '/create-walker'}>
              Walker
            </Link>
            <Link
              className={'sm:hidden'}
              to={
                user.dogOwnerId
                  ? `/dog-owner-profile/${user.dogOwnerId.toString()}`
                  : '/create-dog-owner'
              }>
              DogOwner
            </Link>
            {isAuth ? (
              <>
                <Link
                  to={
                    user.walkerId ? `/walker-profile/${user.walkerId.toString()}` : '/create-walker'
                  }>
                  Walker
                </Link>
                <Link
                  to={
                    user.dogOwnerId
                      ? `/dog-owner-profile/${user.dogOwnerId.toString()}`
                      : '/create-dog-owner'
                  }>
                  DogOwner
                </Link>
                <button className="flex gap-2 text-red-600" onClick={onClickSignOut}>
                  <p>Sign Out</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="h-6 w-6">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                    />
                  </svg>
                </button>
              </>
            ) : (
              <Button variant="outline" className="hidden sm:block sm:text-black sm:shadow-lg">
                <Link to={'sign-in'}>Sign In</Link>
              </Button>
            )}
          </>
        )}
      </div>

      <BurgerButton open={openBurgerMenu} setOpen={(open) => setOpenBurgerMenu(open)} />
    </div>
  );
};

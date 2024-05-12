import React, { useEffect, useState } from 'react';
import BurgerButton from '@/widgets/layouts/page-layout/ui/BurgerButton.tsx';
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '@/entities/user';

export const NavMenu: React.FC = () => {
  const navigate = useNavigate();
  const isAuth = useUserStore((state) => state.isAuth);
  const user = useUserStore((state) => state.user);
  const signOut = useUserStore((state) => state.signOut);
  const [openBurgerMenu, setOpenBurgerMenu] = useState(false);

  const onClickSignOut = () => {
    signOut();
    navigate('/sign-in');
  };

  useEffect(() => {
    if (openBurgerMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [openBurgerMenu]);

  return (
    <div className="top-0 flex w-full min-w-52 items-center justify-between gap-8 border-b bg-white p-4 pl-10 lg:sticky lg:h-screen lg:max-w-60 lg:flex-col lg:items-start lg:justify-start lg:border-r">
      <div>
        <Link to={'/'}>
          <img src="/src/shared/assets/images/loggo.svg" height={56} width={56} alt="" />
        </Link>
      </div>
      <div
        className={
          openBurgerMenu
            ? 'absolute left-0 top-0 z-50 flex h-screen w-screen flex-col items-center justify-center gap-16 overflow-hidden bg-gray-50 text-xl text-black  md:flex-row lg:flex-col'
            : 'hidden flex-row content-start justify-between gap-8 md:flex lg:flex-col'
        }>
        {isAuth ? (
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
            <Link to={`/user/${user.id}`}>
              <div>User`</div>
            </Link>
            <button className="flex gap-2 text-red-600" onClick={onClickSignOut}>
              <p>Sign Out</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                />
              </svg>
            </button>
          </>
        ) : (
          <button className="flex gap-2 text-black">
            <Link to={'sign-in'}>Sign In</Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </button>
        )}
      </div>

      <BurgerButton open={openBurgerMenu} setOpen={(open) => setOpenBurgerMenu(open)} />
    </div>
  );
};

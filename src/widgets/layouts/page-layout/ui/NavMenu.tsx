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

  const links = ['chats', 'Explore', 'Schedule'];

  return (
    <div className="top-0 flex w-full min-w-52 items-center justify-between gap-8 border-b bg-white p-4 py-2 sm:py-4 lg:sticky lg:h-screen lg:max-w-60 lg:flex-col lg:items-start lg:justify-start lg:border-r">
      <div>
        <Link to={'/'}>
          <img src="/src/shared/assets/images/loggo.svg" height={56} width={56} alt="" />
        </Link>
      </div>
      <div
        className={
          openBurgerMenu
            ? 'absolute left-0 top-0 z-10 flex h-screen w-screen flex-col items-center justify-center gap-16 overflow-hidden bg-gray-50 text-xl text-black  md:flex-row lg:flex-col'
            : 'hidden flex-row content-start justify-between gap-8 md:flex lg:flex-col'
        }>
        {isAuth ? (
          <>
            {links.map((link, index) => (
              <Link key={index} to={`/${link}`} onClick={() => setOpenBurgerMenu(false)}>
                {link}
              </Link>
            ))}
            <Link to={`/user/${user.id}`} onClick={() => setOpenBurgerMenu(false)}>
              User
            </Link>
            <button className="flex gap-2 text-red-600" onClick={onClickSignOut}>
              <img src="/src/shared/assets/icons/signOut.svg" />
              <p>Sign Out</p>
            </button>
          </>
        ) : (
          <Link to={'sign-in'} className={'flex gap-2'} onClick={() => setOpenBurgerMenu(false)}>
            <img src="/src/shared/assets/icons/signOut.svg" />
            Sign In
          </Link>
        )}
      </div>

      <BurgerButton open={openBurgerMenu} setOpen={(open) => setOpenBurgerMenu(open)} />
    </div>
  );
};

import React, { useState } from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/ui';
import BurgerButton from '@/widgets/layouts/page-layout/ui/BurgerButton.tsx';
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '@/entities/user';
import { createAvatarFallback } from '@/shared/lib/utils.ts';

export const Header: React.FC = () => {
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
    <div className="flex w-full items-center justify-between border-b-2 p-4">
      <div className="h-full">
        <Link to={'/'}>
          <img src="/src/shared/assets/images/loggo.svg" height={56} width={56} alt="" />
        </Link>
      </div>
      <div
        className={
          openBurgerMenu
            ? 'absolute left-0 top-0 z-50 flex h-screen w-full flex-col items-center justify-center gap-20 bg-gray-50 text-xl text-black'
            : 'hidden items-center justify-center gap-8 sm:flex'
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
          </>
        )}
      </div>
      {isAuth ? (
        <Popover>
          <PopoverTrigger className={'hidden sm:block '}>
            <Avatar className="h-10 w-10 bg-white">
              <AvatarImage
                src="/src/shared/assets/images/avatar.svg"
                alt="avatar"
                height={40}
                width={40}
              />
              <AvatarFallback>{createAvatarFallback(user.firstName, user.lastName)}</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col gap-2 rounded-md">
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
              <Button
                variant="outline"
                className="hidden sm:block sm:text-black sm:shadow-lg"
                onClick={onClickSignOut}>
                Sign Out
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        <Button variant="outline" className="hidden sm:block sm:text-black sm:shadow-lg">
          <Link to={'sign-in'}>Sign In</Link>
        </Button>
      )}

      <BurgerButton open={openBurgerMenu} setOpen={(open) => setOpenBurgerMenu(open)} />
    </div>
  );
};

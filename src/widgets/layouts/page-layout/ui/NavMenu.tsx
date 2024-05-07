import React, { useState } from 'react';
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
    <div className="top-0 flex w-full items-center justify-between gap-8 border-b bg-white p-4 pl-10 lg:sticky lg:h-screen lg:max-w-60 lg:flex-col lg:items-start lg:justify-start lg:border-r">
      <div>
        <Link to={'/'}>
          <img src="/src/shared/assets/images/loggo.svg" height={56} width={56} alt="" />
        </Link>
      </div>
      <div
        className={
          openBurgerMenu
            ? 'absolute left-0 top-0 z-50 flex h-screen gap-20 bg-gray-50 text-xl text-black lg:flex-col'
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
            <Link to={'/mock/f349351c-6b2b-4c67-9afd-acfccbdf14c3'}>
              <div>Mock`</div>
            </Link>
            <Link
              className={'flex gap-2 sm:hidden'}
              to={user.walkerId ? `/walker-profile/${user.walkerId.toString()}` : '/create-walker'}>
              Walker
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-6 w-6"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.5002 2.75C11.5337 2.75 10.7502 3.5335 10.7502 4.5C10.7502 5.4665 11.5337 6.25 12.5002 6.25C13.4667 6.25 14.2502 5.4665 14.2502 4.5C14.2502 3.5335 13.4667 2.75 12.5002 2.75ZM9.25016 4.5C9.25016 2.70507 10.7052 1.25 12.5002 1.25C14.2951 1.25 15.7502 2.70507 15.7502 4.5C15.7502 6.29493 14.2951 7.75 12.5002 7.75C10.7052 7.75 9.25016 6.29493 9.25016 4.5ZM13.528 10.7532C13.4899 10.7505 13.4422 10.75 13.27 10.75H12.1789L12.0877 11.6615C11.9137 13.4019 11.8532 14.1013 12.0087 14.7631C12.1641 15.4248 12.5298 16.024 13.4607 17.5048L16.0355 21.6008C16.256 21.9515 16.1504 22.4145 15.7997 22.635C15.449 22.8554 14.986 22.7498 14.7656 22.3992L12.1907 18.3031C12.1662 18.2642 12.142 18.2256 12.118 18.1875C11.2832 16.8599 10.768 16.0407 10.5484 15.1061C10.3288 14.1715 10.4253 13.2086 10.5816 11.6482C10.5861 11.6034 10.5906 11.5581 10.5952 11.5123L10.6713 10.7509C10.1702 10.7535 9.79942 10.7632 9.50011 10.7995C9.1229 10.8453 8.94697 10.925 8.82234 11.0249C8.69772 11.1249 8.58178 11.2794 8.45526 11.6377C8.32194 12.0153 8.20712 12.526 8.03624 13.295L7.7323 14.6627C7.64245 15.067 7.24181 15.322 6.83746 15.2321C6.43311 15.1423 6.17816 14.7417 6.26802 14.3373L6.58172 12.9256C6.74022 12.2123 6.87365 11.6118 7.04085 11.1382C7.21828 10.6357 7.45997 10.1948 7.88375 9.85489C8.30754 9.51494 8.79038 9.37465 9.3194 9.31045C9.81792 9.24995 10.4331 9.24997 11.1638 9.25L13.27 9.25C13.2783 9.25 13.2865 9.25 13.2946 9.25C13.4307 9.24997 13.5364 9.24995 13.6353 9.25704C14.7493 9.33691 15.7043 10.0826 16.052 11.1439C16.0828 11.2381 16.1084 11.3407 16.1414 11.4726L16.1474 11.4966C16.2035 11.7211 16.2202 11.7848 16.2357 11.8293C16.4459 12.4354 17.0808 12.7839 17.705 12.6359C17.7509 12.6251 17.8136 12.6049 18.0331 12.5318L18.763 12.2885C19.1559 12.1575 19.5807 12.3699 19.7117 12.7628C19.8427 13.1558 19.6303 13.5805 19.2373 13.7115L18.5075 13.9548C18.4965 13.9584 18.4857 13.9621 18.4751 13.9656C18.3031 14.023 18.171 14.067 18.0511 14.0955C16.6779 14.4211 15.2811 13.6543 14.8185 12.321C14.7781 12.2045 14.7444 12.0695 14.7005 11.8935C14.6977 11.8827 14.695 11.8716 14.6922 11.8604C14.6504 11.6934 14.6384 11.6472 14.6265 11.6109C14.4685 11.1285 14.0344 10.7895 13.528 10.7532ZM10.4162 16.876C10.7608 17.1057 10.854 17.5714 10.6242 17.916L7.6242 22.416C7.39443 22.7607 6.92878 22.8538 6.58414 22.624C6.23949 22.3943 6.14636 21.9286 6.37612 21.584L9.37612 17.084C9.60589 16.7393 10.0715 16.6462 10.4162 16.876Z"
                  fill="#1C274C"
                />
              </svg>
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
            <Link
              to={user.walkerId ? `/walker-profile/${user.walkerId.toString()}` : '/create-walker'}>
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

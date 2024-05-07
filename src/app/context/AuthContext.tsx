import React, { ReactNode, useLayoutEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserStore } from '@/entities/user';
import { useGetCurrentUser } from 'src/shared/hooks/user';

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext: React.FC<AuthProviderProps> = ({ children }) => {
  const isAuth = useUserStore((state) => state.isAuth);
  const { mutateAsync: getCurrentUser } = useGetCurrentUser();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const getUser = async () => {
      try {
        await getCurrentUser();
      } catch (error) {
        // Handle any error during data fetching
        console.error('Error fetching user data:', error);
      }
    };

    if (localStorage.getItem('token')) {
      getUser();
    }
    if (!isAuth) {
      navigate('/sign-in');
    } else if (
      pathname === '/sign-in' ||
      pathname === '/sign-up' ||
      pathname === '/forgot-password' ||
      pathname === '/reset-password'
    ) {
      navigate('/');
    }

    // eslint-disable-next-line no-use-before-define
  }, [isAuth]);

  return <>{children}</>;
};

export default AuthContext;

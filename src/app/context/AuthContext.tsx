import React, { ReactNode, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/entities/user';
import { useGetCurrentUser } from '@/shared/lib/hooks/user';

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext: React.FC<AuthProviderProps> = ({ children }) => {
  const isAuth = useUserStore((state) => state.isAuth);
  const setUser = useUserStore((state) => state.setUser);
  const { mutateAsync: getCurrentUser } = useGetCurrentUser();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const getUser = async () => {
      try {
        const result = await getCurrentUser();
        if (result.data) {
          console.log(result.data);
          setUser(result.data);
        }
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
    }
    console.log('in auth context');

  }, [isAuth]);

  return <>{children}</>;
};

export default AuthContext;

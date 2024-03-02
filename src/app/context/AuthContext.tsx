import React, { ReactNode, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/entities/user';
import { useGetCurrentUser } from '@/shared/lib/hooks/user';

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext: React.FC<AuthProviderProps> = ({ children }) => {
  const isAuth = useUserStore((state) => state.isAuth);
  const setIsAuth = useUserStore((state) => state.setIsAuth);
  const setUser = useUserStore((state) => state.setUser);
  const { mutateAsync: getCurrentUser } = useGetCurrentUser();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const getUser = async () => {
      try {
        const result = await getCurrentUser();
        if (result.isSuccess) {
          setIsAuth(true)
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

  }, [isAuth]);

  return <>{children}</>;
};

export default AuthContext;

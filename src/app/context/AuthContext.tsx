import React, { ReactNode } from 'react';

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

  return <>{children}</>;
};

export default AuthProvider;

import { AuthContext } from '@/context/AuthContext';
import { useContext } from 'react';

export const useAuthContext = () => {
  const { user, login, logout } = useContext(AuthContext);

  return { user, login, logout };
};

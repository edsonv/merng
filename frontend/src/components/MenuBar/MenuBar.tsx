import { Outlet } from 'react-router';
import { MenuLink } from '../MenuLink/MenuLink';
import { useAuthContext } from '@/hooks/useAuthContext';

export const MenuBar = () => {
  const { user, logout } = useAuthContext();

  return (
    <nav className='border-b-4 pb-2'>
      {user ? (
        <ul className='flex justify-between'>
          <li>
            <MenuLink label={user.username} to='/' />
          </li>
          <div className='flex gap-4'>
            <li>
              <MenuLink label='Logout' to='/login' onClick={logout} />
            </li>
          </div>
        </ul>
      ) : (
        <ul className='flex justify-between'>
          <li>
            <MenuLink label='Home' to='/' />
          </li>
          <div className='flex gap-4'>
            <li>
              <MenuLink label='Login' to='/login' />
            </li>
            <li>
              <MenuLink label='Register' to='/register' />
            </li>
          </div>
        </ul>
      )}
      <Outlet />
    </nav>
  );
};

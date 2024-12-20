import { Outlet } from 'react-router';
import { MenuLink } from '../MenuLink/MenuLink';

export const MenuBar = () => {
  return (
    <nav className='border-b-4 pb-2'>
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
      <Outlet />
    </nav>
  );
};

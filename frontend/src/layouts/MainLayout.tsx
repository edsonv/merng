import { MenuBar } from '@/components/MenuBar/MenuBar';
import { ReactNode } from 'react';

type Children = {
  children: ReactNode;
};

export const MainLayout = ({ children }: Children) => {
  return (
    <div className='mx-8 my-4'>
      <MenuBar />
      <main className='mt-6'>{children}</main>
    </div>
  );
};

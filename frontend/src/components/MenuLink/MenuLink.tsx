import { NavLink, NavLinkProps } from 'react-router';

type MenuLink = NavLinkProps & {
  label: string;
};

export const MenuLink = ({ label, ...props }: MenuLink) => {
  return (
    <NavLink
      {...props}
      to={props.to}
      className={({ isActive }) =>
        isActive
          ? 'p-4 pb-[0.6rem] border-b-blue-500 border-b-4 no-underline font-bold'
          : 'p-4 pb-[0.6rem] no-underline'
      }
    >
      {label}
    </NavLink>
  );
};

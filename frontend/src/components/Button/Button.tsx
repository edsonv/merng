import { ButtonHTMLAttributes, ReactNode } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export const Button = ({ children, ...props }: Props) => {
  return (
    <button
      {...props}
      className={`bg-blue-500 py-3 px-6 text-white font-bold rounded ${
        props.disabled ? 'disabled:bg-slate-400 disabled' : ''
      }`}
    >
      {children}
    </button>
  );
};

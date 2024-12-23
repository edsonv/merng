import { ButtonHTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames'


type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  bgColor?: string;
};

export const Button = ({
  children,
  bgColor = 'bg-blue-500',
  ...props
}: Props) => {
  return (
    <button
      {...props}
      className={classNames(props.className,
        `${bgColor} py-3 px-6 text-white font-bold rounded ${
          props.disabled ? 'disabled:bg-slate-400 disabled' : ''
        }`
      )}
    >
      {children}
    </button>
  );
};

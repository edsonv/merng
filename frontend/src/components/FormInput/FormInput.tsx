import { InputHTMLAttributes, ReactNode } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  children: ReactNode;
  error?: boolean;
};

export const FormInput = ({ children, error, ...props }: Props) => {
  return (
    <div className='flex flex-col gap-2 w-full'>
      <label
        htmlFor={props.id}
        className={`font-bold ${error ? 'text-red-600' : ''}`}
      >
        {children}
      </label>
      <input
        type={props.type}
        name={props.id}
        id={props.id}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        className={`border rounded px-4 py-2 focus-visible:outline outline-1 outline-blue-600 ${
          error ? 'bg-red-50 outline outline-red-600' : ''
        }`}
      />
    </div>
  );
};

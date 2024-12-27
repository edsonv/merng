import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  children?: ReactNode;
  error?: boolean;
};

export const FormInput = forwardRef<HTMLInputElement, Props>(function FormInput(
  { children, error, ...props },
  ref
) {
  return (
    <div className='flex flex-col gap-2 w-full'>
      {children && (
        <label
          htmlFor={props.id}
          className={`font-bold ${error ? 'text-red-600' : ''}`}
        >
          {children}
        </label>
      )}
      <input
        {...props}
        name={props.id}
        className={`border rounded px-4 py-2 focus-visible:outline outline-1 outline-blue-600 ${
          error ? 'bg-red-50 outline outline-red-600' : ''
        }`}
        ref={ref}
      />
    </div>
  );
});

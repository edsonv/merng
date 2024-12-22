import { ChangeEventHandler, FormEventHandler, useState } from 'react';

export const useForm = (callback: () => void, initialValues = {}) => {
  const [values, setValues] = useState<Record<string, string>>(initialValues);

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    callback();
  };

  return {
    onSubmit,
    onChange,
    values,
  };
};

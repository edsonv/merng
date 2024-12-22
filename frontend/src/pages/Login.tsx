import { Button } from '@/components/Button/Button';
import { FormInput } from '@/components/FormInput/FormInput';
import { LOGIN_USER } from '@/graphql/User/loginUser';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useForm } from '@/hooks/useForm';
import { useMutation } from '@apollo/client';
import { GraphQLFormattedErrorExtensions } from 'graphql';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export const Login = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<
    GraphQLFormattedErrorExtensions | undefined
  >({});
  const { onSubmit, onChange, values } = useForm(loginUserCallback, {
    username: '',
    password: '',
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_proxy, { data: { login: userData } }) {
      login(userData);

      navigate('/');
    },
    onError(error) {
      setErrors(error.graphQLErrors[0].extensions);
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <div className='flex flex-col gap-3 mx-auto max-w-[30vw]'>
      <h1 className='text-[2rem] font-bold text-left'>Login</h1>

      <form
        onSubmit={onSubmit}
        noValidate
        className='flex flex-col gap-5 items-start'
      >
        <FormInput
          type='text'
          id='username'
          placeholder='Username...'
          onChange={onChange}
          value={values.username}
          error={!!errors!.username}
        >
          Username
        </FormInput>

        <FormInput
          type='password'
          name='password'
          id='password'
          placeholder='Password...'
          value={values.password}
          onChange={onChange}
          error={!!errors!.password}
        >
          Password
        </FormInput>

        <Button type='submit' disabled={loading}>
          Login
        </Button>
      </form>
      {errors && Object.keys(errors).length > 0 && (
        <div className='border border-red-600 rounded bg-red-50 p-4'>
          <ul className='text-red-600 list-disc ml-6'>
            {Object.keys(values).map((key, index) => {
              if (!Object.hasOwn(errors, key)) return null;

              return (
                <li key={`${index}-${key}`}>
                  <div></div>
                  {errors[key] as string}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

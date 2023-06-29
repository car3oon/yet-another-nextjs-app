import { useSaleorAuthContext } from '@saleor/auth-sdk/react';
import { FormEvent, useState } from 'react';

type FormValues = {
  email: string;
  password: string;
};

const DefaultValues: FormValues = { email: '', password: '' };

export default function LoginForm() {
  const [formValues, setFormValues] = useState<FormValues>(DefaultValues);
  const [errors, setErrors] = useState<string[]>([]);
  const { signIn } = useSaleorAuthContext();

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { data } = await signIn(formValues);

    if (data.tokenCreate.errors) {
      setErrors(data.tokenCreate.errors.map((error) => error.message));
      setFormValues(DefaultValues);
    }
  };

  const changeHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setFormValues((prev) => ({ ...prev, [name]: value }));

    if (errors.length > 0) setErrors([]);
  };

  return (
    <div className='w-full max-w-lg mx-auto'>
      <form className='bg-white shadow-md rounded p-8' onSubmit={submitHandler}>
        <div className='mb-2'>
          <label className='block'>
            <span className='block text-sm font-medium text-slate-700'>
              Email
            </span>
            <input
              className='border rounded bg-gray-50 px-4 py-2 w-full'
              name='email'
              placeholder='Enter email address'
              type='email'
              value={formValues.email}
              onChange={changeHandler}
            />
          </label>
        </div>
        <div className='mb-4'>
          <label className='block'>
            <span className='block text-sm font-medium text-slate-700'>
              Password
            </span>
            <input
              className='border rounded bg-gray-50 px-4 py-2 w-full'
              name='password'
              placeholder='Enter password'
              type='password'
              value={formValues.password}
              onChange={changeHandler}
            />
          </label>
        </div>
        <div className='w-full text-right'>
          <button className='bg-emerald-500 text-white hover:bg-emerald-600 rounded px-4 py-2'>
            Log In
          </button>
        </div>
      </form>
      <div>
        {errors.map((error) => (
          <p key={error} className='text-red-500'>
            {error}
          </p>
        ))}
      </div>
    </div>
  );
}

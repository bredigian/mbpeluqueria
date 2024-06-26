'use client';

import { IoEyeOff, IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';

import { Button } from './ui/button';
import Cookies from 'js-cookie';
import { IUser } from '@/types/users.types';
import { Input } from './ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { userStore } from '@/store/user.store';

type TPassword = 'text' | 'password';

export const SigninForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IUser>();

  const [passwordType, setPasswordType] = useState<TPassword>('password');

  const handlePasswordVisibility = () =>
    setPasswordType((prev) => (prev === 'password' ? 'text' : 'password'));

  const { push } = useRouter();
  const { signin } = userStore();

  const onSubmit = async (values: IUser) => {
    try {
      const { access_token, exp } = await signin(values);
      if (!access_token)
        throw new Error('Ocurrió un error al iniciar la sesión.');

      Cookies.set('token', access_token, { expires: exp });
      toast.success('Sesión iniciada exitosamente.');

      push('/dashboard');
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex w-full flex-col gap-6'
    >
      <div className='flex flex-col gap-4'>
        <Label htmlFor='username'>Usuario</Label>
        <Input
          {...register('username', {
            required: {
              value: true,
              message: 'El atributo es requerido.',
            },
          })}
        />
        {errors.username && (
          <small className='text-red-500'>{errors.username.message}</small>
        )}
      </div>
      <div className='flex flex-col gap-4'>
        <Label htmlFor='password'>Contraseña</Label>
        <div className='relative w-full'>
          <Input
            {...register('password', {
              required: {
                value: true,
                message: 'El atributo es requerido.',
              },
            })}
            type={passwordType}
          />
          <Button
            type='button'
            variant='ghost'
            size='icon'
            onClick={handlePasswordVisibility}
            className='absolute right-0 top-0'
          >
            {passwordType === 'password' ? (
              <IoEyeOffOutline size={20} />
            ) : (
              <IoEyeOutline size={20} />
            )}
          </Button>
        </div>
        {errors.password && (
          <small className='text-red-500'>{errors.password.message}</small>
        )}
      </div>
      <Button type='submit' disabled={isSubmitting} className='mt-6'>
        {!isSubmitting ? 'Iniciar sesión' : 'Iniciando sesión'}
      </Button>
    </form>
  );
};

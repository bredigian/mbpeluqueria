'use client';

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from './ui/alert-dialog';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ERole, IUser } from '@/types/users.types';
import { ForgotPasswordDialog, HelpDialog } from './auth-dialog';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { recoverPassword, resetPassword } from '@/services/auth.service';

import { Button } from './ui/button';
import Cookies from 'js-cookie';
import { IPasswordRecovery } from '@/types/auth.types';
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
      const payload: IUser = {
        ...values,
        phone_number: values.phone_number.trim(),
      };
      const { access_token, exp } = await signin(payload);
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
    <Card>
      <CardHeader>
        <CardTitle>Iniciar sesión</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id='signin-form'
          onSubmit={handleSubmit(onSubmit)}
          className='flex w-full flex-col gap-6'
        >
          <div className='flex flex-col gap-4'>
            <Label htmlFor='phone_number'>Número de teléfono</Label>
            <Input
              {...register('phone_number', {
                required: {
                  value: true,
                  message: 'El atributo es requerido.',
                },
              })}
              id='phone_number'
            />
            {errors.phone_number && (
              <small className='text-red-500'>
                {errors.phone_number.message}
              </small>
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
                id='password'
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
          <div className='grid w-full grid-cols-6 gap-2'>
            <Button
              type='submit'
              disabled={isSubmitting}
              className='col-span-full mt-6'
            >
              {!isSubmitting ? 'Iniciar sesión' : 'Iniciando sesión'}
            </Button>
            <HelpDialog />
            <ForgotPasswordDialog />
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IUser>();

  const [passwordType, setPasswordType] = useState<TPassword>('password');

  const handlePasswordVisibility = () =>
    setPasswordType((prev) => (prev === 'password' ? 'text' : 'password'));

  const { push } = useRouter();
  const { signup } = userStore();

  const onSubmit = async (values: IUser) => {
    try {
      const payload: IUser = {
        ...values,
        email: values.email.toLowerCase(),
        phone_number: values.phone_number.trim(),
        role: ERole.USER,
      };

      const { access_token, exp } = await signup(payload);
      if (!access_token)
        throw new Error('Ocurrió un error al crear el usuario.');

      Cookies.set('token', access_token, { expires: exp });
      toast.success('Usuario creado exitosamente.');

      push('/dashboard');
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registrarse</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id='signup-form'
          onSubmit={handleSubmit(onSubmit)}
          className='flex w-full flex-col gap-6'
        >
          <div className='flex flex-col gap-4'>
            <Label htmlFor='name'>Nombre completo</Label>
            <Input
              {...register('name', {
                required: {
                  value: true,
                  message: 'El atributo es requerido.',
                },
                pattern: {
                  value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:\s[A-Za-zÁÉÍÓÚáéíóúÑñ]+)+$/,
                  message: 'El nombre ingresado no es válido.',
                },
              })}
              id='name'
              placeholder='Martin Bordon'
            />
            {errors.name && (
              <small className='text-red-500'>{errors.name.message}</small>
            )}
          </div>
          <div className='flex flex-col gap-4'>
            <Label htmlFor='email'>Correo electrónico</Label>
            <Input
              {...register('email', {
                required: {
                  value: true,
                  message: 'El atributo es requerido.',
                },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'El correo no es válido.',
                },
              })}
              id='email'
              placeholder='martinbordon@email.com'
            />
            {errors.email && (
              <small className='text-red-500'>{errors.email.message}</small>
            )}
          </div>
          <div className='flex flex-col gap-4'>
            <Label htmlFor='phone_number'>Núm. de Teléfono</Label>
            <Input
              {...register('phone_number', {
                required: {
                  value: true,
                  message: 'El atributo es requerido.',
                },
                pattern: {
                  value: /^\+?[0-9]+(\s[0-9]+)*(\s[0-9]+-[0-9]+)?$/,
                  message: 'El núm. de telefono ingresado no es válido.',
                },
                minLength: {
                  value: 10,
                  message: 'Debe contener al menos 10 caracteres',
                },
              })}
              id='phone_number'
              placeholder='+54 2281 12-3456'
            />
            {errors.phone_number && (
              <small className='text-red-500'>
                {errors.phone_number.message}
              </small>
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
                  minLength: {
                    value: 4,
                    message:
                      'La contraseña debe contener al menos 4 caracteres.',
                  },
                })}
                type={passwordType}
                id='password'
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
            {!isSubmitting ? 'Registrarse' : 'Registrando'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

type Props = {
  handleDialog: () => void;
};

export const RecoveryPasswordForm = ({ handleDialog }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IPasswordRecovery>();

  const onSubmit = async (values: IPasswordRecovery) => {
    try {
      await recoverPassword(values);
      toast.success('Se ha enviado el correo. Revisa tu bandeja de entrada.');

      handleDialog();
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  return (
    <form
      id='recovery-password-form'
      onSubmit={(event) => {
        event.stopPropagation();
        handleSubmit(onSubmit)(event);
      }}
      className='flex flex-col gap-4'
    >
      <div className='flex flex-col gap-4'>
        <Label htmlFor='email'>Correo electrónico</Label>
        <Input
          {...register('email', {
            required: {
              value: true,
              message: 'El atributo es requerido.',
            },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'El correo no es válido.',
            },
          })}
          id='email'
        />
        {errors.email && (
          <small className='text-red-500'>{errors.email.message}</small>
        )}
        <a
          href='https://wa.link/ddgw64'
          target='_blank'
          className='text-sm text-blue-800 underline'
        >
          ¿El correo no llega? Hace click acá.
        </a>
      </div>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={handleDialog}>Cancelar</AlertDialogCancel>
        <AlertDialogAction type='submit' disabled={isSubmitting}>
          {!isSubmitting ? 'Enviar' : 'Enviando'}
        </AlertDialogAction>
      </AlertDialogFooter>
    </form>
  );
};

export const PasswordResetForm = ({ token }: { token: string }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<{ password: string; password_confirmation: string }>();

  const { push } = useRouter();

  const [passwordType, setPasswordType] = useState<TPassword>('password');

  const handlePasswordVisibility = () =>
    setPasswordType((prev) => (prev === 'password' ? 'text' : 'password'));

  const password = watch('password');

  const onSubmit = async (values: {
    password: string;
    password_confirmation: string;
  }) => {
    try {
      await resetPassword(values.password, token);
      toast.success('Contraseña actualizada exitosamente.');

      setTimeout(() => {
        push('/');
      }, 2000);
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  return (
    <form
      id='password-reset-form'
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-4'
    >
      <div className='flex flex-col gap-4'>
        <Label htmlFor='password'>Nueva contraseña</Label>
        <div className='relative w-full'>
          <Input
            {...register('password', {
              required: {
                value: true,
                message: 'El atributo es requerido.',
              },
            })}
            id='password'
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
      <div className='flex flex-col gap-4'>
        <Label htmlFor='password_confirmation'>Confirmar contraseña</Label>
        <div className='relative w-full'>
          <Input
            {...register('password_confirmation', {
              required: {
                value: true,
                message: 'El atributo es requerido.',
              },
              validate: (value) =>
                value === password || 'Las contraseñas no coinciden.',
            })}
            id='password_confirmation'
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
        {errors.password_confirmation && (
          <small className='text-red-500'>
            {errors.password_confirmation.message}
          </small>
        )}
      </div>
      <Button type='submit' disabled={isSubmitting}>
        {!isSubmitting ? 'Confirmar' : 'Confirmando'}
      </Button>
    </form>
  );
};

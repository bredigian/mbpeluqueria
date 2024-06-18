'use client';

import ButtonNext from './ButtonNext';
import Input from './Input';
import { InputType } from '@/types/input.types';
import { Pulsar } from '@uiball/loaders';
import { User } from '@/types/user.types';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next-nprogress-bar';
import { useShiftData } from '@/store/shift-data';
import { useState } from 'react';

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const { setUser } = useShiftData();
  const { push } = useRouter();
  const [sending, setSending] = useState(false);

  const onSubmit = async (data: User) => {
    setSending(true);
    try {
      await setUser(data);
      push('/dashboard');
    } catch (error: any) {
      toast.error(error.message);
    }
    setSending(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col items-start gap-4"
    >
      <Input
        name="name"
        type={InputType.Text}
        register={register}
        minLength={8}
        error={errors.name}
        errorMessage={{
          minLength: 'Debe tener al menos 8 caracteres',
          required: 'El nombre es requerido',
        }}
        placeholder="Ej: Martin Bordon"
      >
        Nombre y Apellido
      </Input>
      <Input
        name="phone"
        type={InputType.Phone}
        register={register}
        minLength={10}
        maxLength={10}
        error={errors.phone}
        errorMessage={{
          minLength: 'Debe tener al menos 10 caracteres',
          maxLength: 'Debe tener como máximo  10 caracteres',
          required: 'El teléfono es requerido',
        }}
        placeholder="Ej: 2281123456"
      >
        Teléfono
      </Input>
      <p className="text-yellow-light ml-2 text-start text-[10px]">
        Nota: por favor, complete y verifique sus datos adecuadamente ya que
        esto es de uso único y una vez enviado, no podrá revertirlo.
      </p>
      {!sending ? (
        <ButtonNext style="self-end mt-12" type="submit">
          Continuar
        </ButtonNext>
      ) : (
        <div className="mt-8 grid h-6 place-items-center self-end">
          <Pulsar size={52} color="#D2BF9D" />
        </div>
      )}
    </form>
  );
};

export default Form;

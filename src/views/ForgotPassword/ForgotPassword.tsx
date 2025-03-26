// ForgotPassword.jsx
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ForgotPasswordFormData } from './ForgotPassword.types';
import { forgotPasswordSchema } from './ForgotPassword.schemas';
import { useNavigate } from 'react-router-dom';
import { usePostForgotPasswordMutation } from '../../services';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const methods = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onChange',
  });

  const { handleSubmit, reset, control } = methods;

  const { mutate } = usePostForgotPasswordMutation();

  const handleCancel = () => {
    reset();
    navigate('/login');
  };

  const onSubmit = (data: ForgotPasswordFormData) => {
    mutate(data, {
      onSuccess: () => {
        console.log('Email de recuperação enviado com sucesso');
        navigate('/login');
      },
    });
  };

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="max-w-md mx-auto p-6 border rounded shadow w-full">
        <h2 className="text-2xl font-semibold mb-4">Recuperar Senha</h2>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Controller
                control={control}
                name="email"
                render={({ field: { value = '', onChange } }) => (
                  <input
                    className="mt-1 block w-full border p-2 rounded"
                    type="email"
                    value={value || ''}
                    onChange={onChange}
                    placeholder="Insira seu email"
                  />
                )}
              />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCancel}
                className="w-full p-2 rounded border border-blue-500 text-blue-600 hover:text-white hover:bg-blue-700"
              >
                Voltar
              </button>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded hover:text-white hover:bg-blue-700"
              >
                Enviar Email
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export { ForgotPassword };

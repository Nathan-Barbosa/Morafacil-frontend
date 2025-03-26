// Register.jsx
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterFormData } from './Register.types';
import { registerSchema } from './Register.schemas';
import { useNavigate } from 'react-router-dom';
import { usePostRegisterMutation } from '../../services/RegisterService';

const Register = () => {
  const navigate = useNavigate();

  const methods = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  const { handleSubmit, reset, control } = methods;

  const { mutate } = usePostRegisterMutation();

  const handleCancel = () => {
    reset();
    navigate('/login');
  };

  const onSubmit = (data: RegisterFormData) => {
    mutate(data, {
      onSuccess: () => {
        console.log('Cadastro realizado com sucesso');
        navigate('/login');
      },
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow w-full">
      <h2 className="text-2xl font-semibold mb-4">Cadastro</h2>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nome
            </label>
            <Controller
              control={control}
              name="name"
              render={({ field: { value = '', onChange } }) => (
                <div className="flex h-10 items-center justify-between rounded-lg border border-gray5 bg-white px-4 py-2">
                  <input
                    className={`w-full outline-none ${value ? 'text-black' : 'text-gray6'}`}
                    type="text"
                    value={value || ''}
                    onChange={onChange}
                    placeholder="Insira o nome de usuário"
                  />
                </div>
              )}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Controller
              control={control}
              name="email"
              render={({ field: { value = '', onChange } }) => (
                <div className="flex h-10 items-center justify-between rounded-lg border border-gray5 bg-white px-4 py-2">
                  <input
                    className={`w-full outline-none ${value ? 'text-black' : 'text-gray6'}`}
                    type="text"
                    value={value || ''}
                    onChange={onChange}
                    placeholder="Insira o nome de usuário"
                  />
                </div>
              )}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <Controller
              control={control}
              name="password"
              render={({ field: { value = '', onChange } }) => (
                <div className="flex h-10 items-center justify-between rounded-lg border border-gray5 bg-white px-4 py-2">
                  <input
                    className={`w-full outline-none ${value ? 'text-black' : 'text-gray6'}`}
                    type="text"
                    value={value || ''}
                    onChange={onChange}
                    placeholder="Insira o nome de usuário"
                  />
                </div>
              )}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Telefone
            </label>
            <Controller
              control={control}
              name="phoneNumber"
              render={({ field: { value = '', onChange } }) => (
                <div className="flex h-10 items-center justify-between rounded-lg border border-gray5 bg-white px-4 py-2">
                  <input
                    className={`w-full outline-none ${value ? 'text-black' : 'text-gray6'}`}
                    type="text"
                    value={value || ''}
                    onChange={onChange}
                    placeholder="Insira o nome de usuário"
                  />
                </div>
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
              Cadastrar
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export { Register };

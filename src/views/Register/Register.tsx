// Register.jsx
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterFormData } from './Register.types';
import { registerSchema } from './Register.schemas';
import { useNavigate } from 'react-router-dom';
import { usePostRegisterMutation } from '../../services';

const Register = () => {
  const navigate = useNavigate();

  const methods = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { isValid },
    watch,
  } = methods;

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

  const password = watch('password');
  const confirmPassword = watch('confirm_password');

  const passwordValidation = confirmPassword === password;

  return (
    <div className="flex items-center justify-center h-full w-full">
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
                  <input
                    className="mt-1 block w-full border p-2 rounded"
                    type="text"
                    value={value}
                    onChange={onChange}
                    placeholder="Insira seu nome"
                  />
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
                  <input
                    className="mt-1 block w-full border p-2 rounded"
                    type="email"
                    value={value}
                    onChange={onChange}
                    placeholder="Insira seu email"
                  />
                )}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">
                CPF
              </label>
              <Controller
                control={control}
                name="cpf"
                render={({ field: { value = '', onChange } }) => (
                  <input
                    className="mt-1 block w-full border p-2 rounded"
                    type="text"
                    value={value}
                    onChange={onChange}
                    placeholder="Insira seu CPF"
                  />
                )}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="birth_date" className="block text-sm font-medium text-gray-700">
                Data de Nascimento
              </label>
              <Controller
                control={control}
                name="birth_date"
                render={({ field: { value = '', onChange } }) => (
                  <input
                    className="mt-1 block w-full border p-2 rounded"
                    type="date"
                    value={value}
                    onChange={onChange}
                    placeholder="YYYY-MM-DD"
                  />
                )}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                Telefone
              </label>
              <Controller
                control={control}
                name="phone_number"
                render={({ field: { value = '', onChange } }) => (
                  <input
                    className="mt-1 block w-full border p-2 rounded"
                    type="text"
                    value={value}
                    onChange={onChange}
                    placeholder="Insira seu telefone"
                  />
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
                  <input
                    className="mt-1 block w-full border p-2 rounded"
                    type="password"
                    value={value}
                    onChange={onChange}
                    placeholder="Insira sua senha"
                  />
                )}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">
                Confirmar Senha
              </label>
              <Controller
                control={control}
                name="confirm_password"
                render={({ field: { value = '', onChange } }) => (
                  <input
                    className="mt-1 block w-full border p-2 rounded"
                    type="password"
                    value={value}
                    onChange={onChange}
                    placeholder="Confirme sua senha"
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
                className="w-full bg-blue-600 text-white p-2 rounded hover:text-white hover:bg-blue-700 disabled:bg-gray-400"
                disabled={!isValid || !passwordValidation}
              >
                Cadastrar
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export { Register };

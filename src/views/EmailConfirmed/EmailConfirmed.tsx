import { CheckCircle } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';

const ConfirmedEmail = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 ">
        <div className="w-full flex justify-center pb-4">
          <CheckCircle className="text-green-500 size-20" />
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Email Confirmado!</h2>
        <p className="text-gray-600 text-center mb-8">
          Seu email foi confirmado com sucesso. Agora você pode acessar sua conta.
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold rounded-lg"
          >
            Fazer Login
          </button>
        </div>
      </div>
    </div>
  );
};

export { ConfirmedEmail };

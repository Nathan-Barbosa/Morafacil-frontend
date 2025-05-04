import { useAuth } from "../../providers";

function PendingApproval() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-24 text-center px-4">
      <h1 className="text-2xl font-bold text-blue-800 mb-4">Aguardando Aprovação</h1>
      <p className="text-gray-700 mb-2">
        Olá <strong>{user?.name}</strong>, seu cadastro foi realizado com sucesso!
      </p>
      <p className="text-gray-600 mb-6 max-w-md">
        No momento, seus dados estão sendo analisados pelos administradores do condomínio. Assim que sua conta for aprovada, você poderá acessar o sistema normalmente.
      </p>
      <p className="text-sm text-gray-500">
        Em caso de dúvidas, entre em contato pelo número <strong>(11) 99999-9999</strong>.
      </p>
    </div>
  );
}

export { PendingApproval };

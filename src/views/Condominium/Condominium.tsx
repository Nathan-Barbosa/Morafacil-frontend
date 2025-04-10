import { useState } from "react";
import {
  useDeleteCondoMutation,
  useGetCondosListQuery,
  usePatchCondoStatusMutation,
} from "../../services";
import { NewCondoModal } from "./components";
import { useToast } from "../../hooks/use-toast";

const Condominium = () => {
  const [openModal, setOpenModal] = useState(false);
  const { toast } = useToast();

  const { data: condos } = useGetCondosListQuery({
    pageNumber: 1,
    pageSize: 10,
  });

  const { mutate: deleteCondo } = useDeleteCondoMutation();
  const { mutate: updateCondoStatus } = usePatchCondoStatusMutation();

  const handleDeleteCondo = (id: number) => {
    deleteCondo(id, {
      onSuccess: () => {
        toast({
          title: "Sucesso",
          description: "Condomínio removido com sucesso!",
          variant: "default",
        });
      },
    });
  };

  const handleUpdateCondoStatus = (id: number, ativo: boolean) => {
    if (ativo) {
      updateCondoStatus(
        {
          id: id,
          ativo: false,
        },
        {
          onSuccess: () => {
            toast({
              title: "Sucesso",
              description: "Condomínio desativado com sucesso!",
              variant: "default",
            });
          },
        },
      );
    }

    if (!ativo) {
      updateCondoStatus(
        {
          id: id,
          ativo: true,
        },
        {
          onSuccess: () => {
            toast({
              title: "Sucesso",
              description: "Condomínio ativado com sucesso!",
              variant: "default",
            });
          },
        },
      );
    }
  };

  return (
    <div className="p-6 space-y-6 h-full w-full flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Condomínios</h1>
          <p className="text-gray-600">Lista de condomínios cadastrados</p>
        </div>
        <button
          onClick={() => setOpenModal(true)}
          className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition"
        >
          Novo Condomínio
        </button>
      </div>

      <div className="overflow-x-auto">
        {condos?.data ? (
          <table className="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">ID</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Nome</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Endereço
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Número</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {condos.data.map((condo) => (
                <tr key={condo.id} className="hover:bg-gray-100 transition">
                  <td className="px-4 py-2 text-gray-600">{condo.id}</td>
                  <td className="px-4 py-2 text-gray-600">{condo.nome}</td>
                  <td className="px-4 py-2 text-gray-600">{condo.endereco}</td>
                  <td className="px-4 py-2 text-gray-600">{condo.numero}</td>
                  <td className="flex px-4 py-2 gap-2 justify-end">
                    <button className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white text-sm rounded transition">
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUpdateCondoStatus(Number(condo.id), condo.ativo)}
                      className={`px-3 py-1 text-white text-sm rounded transition ${condo.ativo ? " bg-orange-500 hover:bg-orange-600" : "bg-green-500 hover:bg-green-600"}`}
                    >
                      {condo.ativo ? "Desabilitar" : "Habilitar"}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteCondo(Number(condo.id))}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded transition"
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex flex-col items-center justify-center text-center h-full w-full">
            <span className="mt-2 text-gray-600">Nenhum condomínio encontrado</span>
          </div>
        )}
      </div>

      <NewCondoModal open={openModal} onOpenChange={setOpenModal} />
    </div>
  );
};

export { Condominium };

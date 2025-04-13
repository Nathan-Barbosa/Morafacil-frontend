import { useEffect, useState } from "react";
import {
  useDeleteCondoMutation,
  useGetCondoQuery,
  useGetCondosListQuery,
  usePatchCondoStatusMutation,
} from "../../services";
import { CondoBuilderModal } from "./components";
import { useToast } from "../../hooks/use-toast";
import { GetCondominiumResponseDTO } from "../../models";
import { useDebounce } from "use-debounce";
import { MagnifyingGlass } from "@phosphor-icons/react";

const Condominium = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedCondo, setSelectedCondo] = useState<GetCondominiumResponseDTO | undefined>();
  const [condoFilter, setCondoFilter] = useState<string>("");
  const [debouncedCondoFilter] = useDebounce(condoFilter, 1000);
  const [allCondos, setAllCondos] = useState<GetCondominiumResponseDTO[] | undefined>();

  const { toast } = useToast();

  const { data: condos } = useGetCondosListQuery({
    pageNumber: 1,
    pageSize: 10,
  });

  const { mutate: deleteCondo } = useDeleteCondoMutation();
  const { mutate: updateCondoStatus } = usePatchCondoStatusMutation();

  const { data: condo } = useGetCondoQuery(Number(debouncedCondoFilter));

  useEffect(() => {
    if (debouncedCondoFilter && !isNaN(Number(debouncedCondoFilter))) {
      if (condo && condo.data) {
        setAllCondos([condo.data]);
      } else {
        setAllCondos([]);
      }
    } else if (condos?.data) {
      setAllCondos(condos.data);
    }
  }, [debouncedCondoFilter, condo, condos]);

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

  const handleUpdateCondoStatus = (id: number, ativo?: boolean) => {
    const updateData = {
      id: id,
      ativo: !ativo,
    };

    updateCondoStatus(updateData, {
      onSuccess: () => {
        toast({
          title: "Sucesso",
          description: ativo
            ? "Condomínio desativado com sucesso!"
            : "Condomínio ativado com sucesso!",
          variant: "default",
        });
      },
    });
  };

  const handleEditCondo = (condo: GetCondominiumResponseDTO) => {
    setIsEdit(true);
    setSelectedCondo(condo);
    setOpenModal(true);
  };

  return (
    <div className="p-6 space-y-6 h-full w-full flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Condomínios</h1>
          <p className="text-gray-600">Lista de condomínios cadastrados</p>
        </div>
        <div className="flex gap-4 items-center">
          <input
            type="text"
            value={condoFilter}
            onChange={(e) => setCondoFilter(e.target.value)}
            placeholder="Buscar por condomínio por id"
            className="px-3 py-2 border border-gray-300 rounded w-64"
          />

          <button
            onClick={() => {
              setIsEdit(false);
              setSelectedCondo(undefined);
              setOpenModal(true);
            }}
            className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition"
          >
            Novo Condomínio
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        {allCondos && allCondos.length > 0 ? (
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
              {allCondos.map((condoItem) => (
                <tr key={condoItem.id} className="hover:bg-gray-100 transition">
                  <td className="px-4 py-2 text-gray-600">{condoItem.id}</td>
                  <td className="px-4 py-2 text-gray-600">{condoItem.nome}</td>
                  <td className="px-4 py-2 text-gray-600">{condoItem.endereco}</td>
                  <td className="px-4 py-2 text-gray-600">{condoItem.numero}</td>
                  <td className="flex px-4 py-2 gap-2 justify-end">
                    <button
                      type="button"
                      onClick={() => handleEditCondo(condoItem)}
                      className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white text-sm rounded transition"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleUpdateCondoStatus(Number(condoItem.id), condoItem?.ativo)
                      }
                      className={`px-3 py-1 text-white text-sm rounded transition ${
                        condoItem.ativo
                          ? "bg-orange-500 hover:bg-orange-600"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      {condoItem.ativo ? "Desabilitar" : "Habilitar"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteCondo(Number(condoItem.id))}
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
          <div className="flex flex-col items-center justify-center top-1/2 text-center h-full w-full">
            <MagnifyingGlass size={150} weight="duotone" className="text-gray-400" />
            <span className="mt-2 text-gray-600">Nenhum condomínio encontrado</span>
          </div>
        )}
      </div>

      {openModal && (
        <CondoBuilderModal
          open={openModal}
          onOpenChange={setOpenModal}
          isEdit={isEdit}
          condoData={selectedCondo}
        />
      )}
    </div>
  );
};

export { Condominium };

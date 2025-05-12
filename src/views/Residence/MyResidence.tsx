import { useEffect, useState } from "react";
import { useGetResidencesByMeQuery } from "../../services";
import { ResidenceResponseDTO } from "../../models";
import { MagnifyingGlass, Pencil } from "@phosphor-icons/react";
import { useAuth } from "../../providers";
import Loading from "../../components/ui/loading";
import { ResidenceBuilderModal } from "./components";
import Pagination from "../../components/ui/pagination";

const MyResidence = () => {
  const { user } = useAuth();
  const isProprieario = user?.roles?.includes("Proprietario");
  const [openModal, setOpenModal] = useState(false);
  const [editingResidence, setEditingResidence] = useState<ResidenceResponseDTO | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Hook usando a nova rota /byme
  const {
    data: myResidences,
    isLoading,
    isFetching,
    refetch: refetchResidences,
  } = useGetResidencesByMeQuery();

  // Refetch inicial
  useEffect(() => {
    refetchResidences();
  }, []);

  // Paginação em memória (frontend)
  const paginatedResidences = myResidences?.data?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  ) || [];

  const handleEdit = (res: ResidenceResponseDTO) => {
    setEditingResidence(res);
    setOpenModal(true);
  };

  if (isLoading || isFetching) return <Loading />;

  return (
    <div className="p-6 space-y-6 h-full w-full flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Minha Residência</h1>
          <p className="text-gray-600">Residências vinculadas ao seu usuário</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        {paginatedResidences.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">ID</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Endereço</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Número</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Bloco</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Unidade</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Situação</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedResidences.map((res) => (
                <tr key={res.id} className="hover:bg-gray-100 transition">
                  <td className="px-4 py-2 text-gray-600">{res.id}</td>
                  <td className="px-4 py-2 text-gray-600">{res.endereco}</td>
                  <td className="px-4 py-2 text-gray-600">{res.numero}</td>
                  <td className="px-4 py-2 text-gray-600">{res.bloco}</td>
                  <td className="px-4 py-2 text-gray-600">{res.unidade}</td>
                  <td className="px-4 py-2 text-gray-600">{res.situacao}</td>
                  <td className="flex justify-end px-4 py-2 gap-2">
                    {isProprieario && (
                      <button
                        onClick={() => handleEdit(res)}
                        className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-sm rounded transition"
                        title="Editar residência"
                      >
                        <Pencil size={20} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex flex-col items-center justify-center text-center h-full w-full">
            <MagnifyingGlass size={150} weight="duotone" className="text-gray-400" />
            <span className="mt-2 text-gray-600">Nenhuma residência vinculada ao seu usuário</span>
          </div>
        )}
      </div>

      {!isFetching && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil((myResidences?.data.length ?? 0) / pageSize)}
          onPageChange={setCurrentPage}
        />
      )}

      <ResidenceBuilderModal
        open={openModal}
        setOpenModal={setOpenModal}
        initialData={editingResidence}
      />
    </div>
  );
};

export { MyResidence };

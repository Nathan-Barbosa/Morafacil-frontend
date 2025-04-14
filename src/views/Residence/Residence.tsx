import { useEffect, useState } from "react";

import {
  useDeleteResidenceMutation,
  useGetResidenceQuery,
  useGetResidencesListQuery,
} from "../../services";
import { useToast } from "../../providers/ToastProvider";
import { useDebounce } from "use-debounce";
import { ResidenceResponseDTO } from "../../models";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { ResidenceBuilderModal } from "./components";

const Residence = () => {
  const [openModal, setOpenModal] = useState(false);
  const [residenceFilter, setResidenceFilter] = useState<string>("");
  const [debouncedResidenceFilter] = useDebounce(residenceFilter, 1000);
  const [allResidences, setAllResidences] = useState<ResidenceResponseDTO[] | undefined>();
  const [editingResidence, setEditingResidence] = useState<ResidenceResponseDTO | null>(null);

  const { toast } = useToast();

  const { data: residences } = useGetResidencesListQuery({
    pageNumber: 1,
    pageSize: 10,
  });

  const { mutate: deleteResidence } = useDeleteResidenceMutation();

  const { data: residence } = useGetResidenceQuery(Number(debouncedResidenceFilter));

  useEffect(() => {
    if (debouncedResidenceFilter && !isNaN(Number(debouncedResidenceFilter))) {
      if (residence && residence.data) {
        setAllResidences([residence.data]);
      } else {
        setAllResidences([]);
      }
    } else if (residences?.data) {
      setAllResidences(residences.data);
    }
  }, [debouncedResidenceFilter, residence, residences]);

  const handleDeleteResidence = (id: number) => {
    deleteResidence(id, {
      onSuccess: () => {
        toast({
          title: "Sucesso",
          description: "Condomínio removido com sucesso!",
          variant: "success",
        });
      },
    });
  };

  const handleEditResidence = (residence: ResidenceResponseDTO) => {
    setEditingResidence(residence);
    setOpenModal(true);
  };

  return (
    <div className="p-6 space-y-6 h-full w-full flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Residências</h1>
          <p className="text-gray-600">Lista de residências cadastrados</p>
        </div>

        <div className="flex gap-4 items-center">
          <input
            type="text"
            value={residenceFilter}
            onChange={(e) => setResidenceFilter(e.target.value)}
            placeholder="Buscar por residência por id"
            className="px-3 py-2 border border-gray-300 rounded w-64"
          />

          <button
            onClick={() => setOpenModal(true)}
            className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition"
          >
            Nova Residência
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        {allResidences && allResidences.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">ID</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Endereco
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Número</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Bloco</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Unidade</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Situacao
                </th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allResidences.map((residence) => (
                <tr key={residence.id} className="hover:bg-gray-100 transition">
                  <td className="px-4 py-2 text-gray-600">{residence.id}</td>
                  <td className="px-4 py-2 text-gray-600">{residence.endereco}</td>
                  <td className="px-4 py-2 text-gray-600">{residence.numero}</td>
                  <td className="px-4 py-2 text-gray-600">{residence.bloco}</td>
                  <td className="px-4 py-2 text-gray-600">{residence.unidade}</td>
                  <td className="px-4 py-2 text-gray-600">{residence.situacao}</td>
                  <td className="flex px-4 py-2 gap-2 justify-end">
                    <button
                      type="button"
                      onClick={() => handleEditResidence(residence)}
                      className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-sm rounded transition"
                    >
                      Editar
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteResidence(residence.id)}
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
            <span className="mt-2 text-gray-600">Nenhuma residência encontrada</span>
          </div>
        )}
      </div>

      <ResidenceBuilderModal
        open={openModal}
        setOpenModal={setOpenModal}
        initialData={editingResidence}
      />
    </div>
  );
};

export { Residence };

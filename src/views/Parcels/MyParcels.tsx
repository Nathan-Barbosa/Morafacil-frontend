import { useEffect, useState } from "react";
import { useToast } from "../../hooks/use-toast";
import { GetParcelsResponseDTO } from "../../models";
import {
  useGetParcelsByMeQuery,
  usePatchPickupParcelMutation,
} from "../../services";
import { MagnifyingGlass, Package } from "@phosphor-icons/react";
import Pagination from "../../components/ui/pagination";
import Loading from "../../components/ui/loading";
import { ConfirmDialog } from "./components";

const MyParcels = () => {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedParcel, setSelectedParcel] = useState<GetParcelsResponseDTO | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const pageSize = 10;

  const {
    data: parcels,
    isLoading,
    isFetching,
    refetch,
  } = useGetParcelsByMeQuery({ pageNumber: currentPage, pageSize });

  const { mutate: pickupParcel } = usePatchPickupParcelMutation();

  const handleConfirmPickup = (encomendaId: number, retiradoPor: string) => {
    pickupParcel(
      { encomendaId, retiradoPor },
      {
        onSuccess: () => {
          toast({
            title: "Sucesso",
            description: "Encomenda retirada com sucesso!",
            variant: "default",
          });
          setOpenDialog(false);
        },
      }
    );
  };

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading || isFetching) return <Loading />;

  return (
    <div className="p-6 space-y-6 h-full w-full flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Minhas Encomendas</h1>
          <p className="text-gray-600">Encomendas associadas às suas residências</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        {parcels?.data && parcels.data.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Nº</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Bloco</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Número</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Unidade</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Recebimento</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Retirada</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {parcels.data.map((parcel) => (
                <tr key={parcel.id} className="hover:bg-gray-100 transition">
                  <td className="px-4 py-2 text-gray-600">{parcel.numeroEncomenda}</td>
                  <td className="px-4 py-2 text-gray-600">{parcel.residencia?.bloco}</td>
                  <td className="px-4 py-2 text-gray-600">{parcel.residencia?.numero}</td>
                  <td className="px-4 py-2 text-gray-600">{parcel.residencia?.unidade}</td>
                  <td className="px-4 py-2 text-gray-600">{new Date(parcel.dataChegada).toLocaleString()}</td>
                  <td className="px-4 py-2 text-gray-600">
                    {parcel.dataRetirada ? `Retirado por ${parcel.retiradoPor} em ${new Date(parcel.dataRetirada).toLocaleString()}` : "Não retirado"}
                  </td>
                  <td className="flex justify-end px-4 py-2 gap-2">
                    {!parcel.dataRetirada && (
                      <button
                        onClick={() => {
                          setSelectedParcel(parcel);
                          setOpenDialog(true);
                        }}
                        className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition"
                        title="Retirar Encomenda"
                      >
                        <Package size={20} />
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
            <span className="mt-2 text-gray-600">Nenhuma encomenda encontrada</span>
          </div>
        )}
      </div>

      {parcels && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil((parcels.totalCount ?? 0) / pageSize)}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}

      <ConfirmDialog
        parcel={selectedParcel!}
        open={openDialog}
        setOpen={setOpenDialog}
        onConfirm={(retiradoPor) => {
          if (selectedParcel) {
            handleConfirmPickup(selectedParcel.id, retiradoPor);
          }
        }}
      />
    </div>
  );
};

export { MyParcels };

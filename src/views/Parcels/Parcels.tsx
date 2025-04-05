import { useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components";

import {
  useGetParcelsListQuery,
  useGetResidencesListQuery,
  usePatchPickupParcelMutation,
  usePostParcelMutation,
} from "../../services";
import { ParcelsFormData } from "./Parcels.types";
import { parcelsSchema } from "./Parcels.schemas";
import { useToast } from "../../hooks/use-toast";
import { ConfirmDialog } from "./components";
import { GetParcelsResponseDTO } from "../../models";

const Parcels = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedParcel, setSelectedParcel] = useState<GetParcelsResponseDTO>();

  const methods = useForm<ParcelsFormData>({
    resolver: zodResolver(parcelsSchema),
    mode: "onChange",
  });
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = methods;

  const { toast } = useToast();

  const { data: parcels } = useGetParcelsListQuery();

  const { data: residences } = useGetResidencesListQuery({
    pageNumber: 1,
    pageSize: 10,
  });

  const { mutate: createParcel } = usePostParcelMutation();
  const { mutate: pickupParcel } = usePatchPickupParcelMutation();

  const onSubmit = (data: ParcelsFormData) => {
    createParcel(data, {
      onSuccess: () => {
        toast({
          title: "Sucesso",
          description: "Encomenda publicado com sucesso!",
          variant: "default",
        });
        setOpenModal(false);
      },
    });
  };

  const handleConfirmPickup = (parcel: GetParcelsResponseDTO) => {
    pickupParcel(parcel.id, {
      onSuccess: () => {
        toast({
          title: "Sucesso",
          description: "Encomenda retirada com sucesso!",
          variant: "default",
        });
        setOpenModal(false);
      },
    });
  };

  return (
    <div className="p-6 space-y-6 h-full w-full flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Encomendas</h1>
          <p className="text-gray-600">Lista de encomendas cadastrados</p>
        </div>
        <button
          onClick={() => setOpenModal(true)}
          className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition"
        >
          Nova encomenda
        </button>
      </div>

      <div className="overflow-x-auto">
        {parcels?.data ? (
          <table className="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Nº</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Número</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Bloco</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Recebimento
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Retirada
                </th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {parcels.data.map((parcel) => (
                <tr key={parcel.id} className="hover:bg-gray-100 transition">
                  <td className="px-4 py-2 text-gray-600">{parcel.numeroEncomenda}</td>
                  <td className="px-4 py-2 text-gray-600">{parcel.residencia?.bloco}</td>
                  <td className="px-4 py-2 text-gray-600">{parcel.residencia?.unidade}</td>
                  <td className="px-4 py-2 text-gray-600">
                    {new Date(parcel.dataChegada).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-gray-600">
                    {parcel.dataRetirada
                      ? new Date(parcel.dataRetirada).toLocaleString()
                      : "Não retirado"}
                  </td>
                  <td className="flex justify-end px-4 py-2 gap-2">
                    <button className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-sm rounded transition">
                      Editar
                    </button>
                    <button
                      onClick={() => {
                        setSelectedParcel(parcel), setOpenDialog(true);
                      }}
                      className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition"
                    >
                      Retirar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex flex-col items-center justify-center text-center h-full w-full">
            <span className="mt-2 text-gray-600">Nenhuma encomenda encontrado</span>
          </div>
        )}
      </div>

      <ConfirmDialog
        parcel={selectedParcel}
        open={openDialog}
        setOpen={setOpenDialog}
        onConfirm={() => selectedParcel && handleConfirmPickup(selectedParcel)}
      />

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="bg-white p-6 rounded shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Cadastro de encomenda</DialogTitle>
          </DialogHeader>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-wrap gap-4">
                <div className="w-full md:w-1/4">
                  <label className="block text-sm text-gray-700">Nº da encomenda</label>
                  <Controller
                    control={control}
                    name="numeroEncomenda"
                    render={({ field }) => (
                      <input
                        type="string"
                        className="mt-1 block w-full border p-2 rounded"
                        placeholder="ID da encomenda"
                        {...field}
                      />
                    )}
                  />
                  {errors.residenciaId && (
                    <p className="text-red-500 text-sm">{errors.residenciaId.message}</p>
                  )}
                </div>
                <div className="w-full md:w-1/4">
                  <label className="block text-sm text-gray-700">Residência</label>
                  <Controller
                    control={control}
                    name="residenciaId"
                    render={({ field }) => (
                      <Select
                        value={field.value?.toString()}
                        onValueChange={(value) => field.onChange(Number(value))}
                      >
                        <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded">
                          <SelectValue placeholder="Selecione uma residência" />
                        </SelectTrigger>
                        <SelectContent className="bg-white rounded shadow-lg">
                          {residences?.data?.map((residence) => (
                            <SelectItem key={residence.id} value={residence.id.toString()}>
                              {`${residence.endereco} - ${residence.numero}`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.residenciaId && (
                    <p className="text-red-500 text-sm">{errors.residenciaId.message}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-2 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => {
                    reset();
                    setOpenModal(false);
                  }}
                  className="button-cancel"
                >
                  Cancelar
                </button>
                <button type="submit" disabled={!isValid} className="button-confirm">
                  Cadastrar
                </button>
              </div>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export { Parcels };

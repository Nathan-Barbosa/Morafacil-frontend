import { FormProvider, Controller, useForm } from "react-hook-form";
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
} from "../../../../components";
import {
  mapResidenceResponseToFormData,
  ResidenceBuilderModalProps,
} from "./ResidenceBuilderModal.types";
import { useToast } from "../../../../providers/ToastProvider";
import { ResidenceFormData } from "../../Residence.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { residenceSchema } from "../../Residence.schemas";
import {
  PutUpdateResidenceRequestDTO,
  useGetCondosListQuery,
  usePostCreateResidenceMutation,
  usePutResidenceMutation,
} from "../../../../services";
import { useEffect, useMemo } from "react";

const ResidenceBuilderModal = ({ open, setOpenModal, initialData }: ResidenceBuilderModalProps) => {
  const editData = useMemo(() => {
    return initialData ? mapResidenceResponseToFormData(initialData) : null;
  }, [initialData]);

  const pageSize = 10;

  const { data: condos } = useGetCondosListQuery({
    pageNumber: 1,
    pageSize,
  });

  const methods = useForm<ResidenceFormData>({
    resolver: zodResolver(residenceSchema),
    mode: "onChange",
    defaultValues: editData || {
      endereco: "",
      numero: 0,
      situacao: "",
      bloco: "",
      unidade: "",
      condominioId: 0,
    },
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = methods;

  const { toast } = useToast();

  const { mutate: createResidence } = usePostCreateResidenceMutation();
  const { mutate: updateResidence } = usePutResidenceMutation();

  useEffect(() => {
    if (editData) {
      reset(editData);
    } else {
      reset({
        endereco: "",
        numero: 0,
        situacao: "",
        bloco: "",
        unidade: "",
        condominioId: 0,
      });
    }
  }, [editData, reset]);

  const onSubmit = (data: ResidenceFormData) => {
    if (editData) {
      updateResidence(data as PutUpdateResidenceRequestDTO, {
        onSuccess: () => {
          toast({
            title: "Sucesso",
            description: "Residência atualizada com sucesso!",
            variant: "success",
          });
          reset();
          setOpenModal(false);
        },
      });
    } else {
      createResidence(data, {
        onSuccess: () => {
          toast({
            title: "Sucesso",
            description: "Residência criada com sucesso!",
            variant: "success",
          });
          reset();
          setOpenModal(false);
        },
      });
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpenModal}>
      <DialogContent className="bg-white p-6 rounded shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {initialData ? "Editar Residência" : "Cadastrar de Residência"}
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap gap-4">
              <div className="w-full md:w-1/2">
                <label className="block text-sm text-gray-700">Endereço</label>
                <Controller
                  control={control}
                  name="endereco"
                  render={({ field }) => (
                    <input
                      className="mt-1 block w-full border p-2 rounded"
                      placeholder="Endereço"
                      {...field}
                    />
                  )}
                />
                {errors.endereco && (
                  <p className="text-red-500 text-sm">{errors.endereco.message}</p>
                )}
              </div>

              <div className="w-full md:w-1/4">
                <label className="block text-sm text-gray-700">Número</label>
                <Controller
                  control={control}
                  name="numero"
                  render={({ field }) => (
                    <input
                      type="number"
                      className="mt-1 block w-full border p-2 rounded"
                      placeholder="Número"
                      {...field}
                    />
                  )}
                />
                {errors.numero && <p className="text-red-500 text-sm">{errors.numero.message}</p>}
              </div>

              <div className="w-full md:w-1/4">
                <label className="block text-sm text-gray-700">Situação</label>
                <Controller
                  control={control}
                  name="situacao"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded">
                        <SelectValue placeholder="Selecione a situação" />
                      </SelectTrigger>
                      <SelectContent className="bg-white rounded shadow-lg">
                        <SelectItem value="Ocupada">Ocupada</SelectItem>
                        <SelectItem value="Disponivel">Disponível</SelectItem>
                        <SelectItem value="Manutenção">Manutenção</SelectItem>
                        <SelectItem value="Construção">Construção</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.situacao && (
                  <p className="text-red-500 text-sm">{errors.situacao.message}</p>
                )}
              </div>

              <div className="w-full md:w-1/4">
                <label className="block text-sm text-gray-700">Bloco</label>
                <Controller
                  control={control}
                  name="bloco"
                  render={({ field }) => (
                    <input
                      className="mt-1 block w-full border p-2 rounded"
                      placeholder="Bloco"
                      {...field}
                    />
                  )}
                />
                {errors.bloco && <p className="text-red-500 text-sm">{errors.bloco.message}</p>}
              </div>

              <div className="w-full md:w-1/4">
                <label className="block text-sm text-gray-700">Unidade</label>
                <Controller
                  control={control}
                  name="unidade"
                  render={({ field }) => (
                    <input
                      className="mt-1 block w-full border p-2 rounded"
                      placeholder="Unidade"
                      {...field}
                    />
                  )}
                />
                {errors.unidade && <p className="text-red-500 text-sm">{errors.unidade.message}</p>}
              </div>

              <div className="w-full md:w-1/4">
                <label className="block text-sm text-gray-700">ID do Condomínio</label>
                <Controller
                  control={control}
                  name="condominioId"
                  render={({ field }) => (
                    <Select
                      value={field.value?.toString()}
                      onValueChange={(val) => field.onChange(Number(val))}
                    >
                      <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded">
                        <SelectValue placeholder="Selecione o condomínio" />
                      </SelectTrigger>
                      <SelectContent className="bg-white rounded shadow-lg">
                        {condos?.data?.map((condo) => (
                          <SelectItem key={condo.id} value={condo?.id?.toString() || ""}>
                            {condo.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
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
                {initialData ? "Atualizar" : "Cadastrar"}
              </button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export { ResidenceBuilderModal };

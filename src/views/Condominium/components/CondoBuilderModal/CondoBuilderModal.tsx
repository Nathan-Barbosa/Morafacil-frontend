import { useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
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
import { CondoBuilderModalProps } from "./CondoBuilderModal.types";
import { CondoFormData } from "../../Condominium.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { condoSchema } from "../../Condominium.schemas";
import {
  CondominiumRequestDTO,
  Types,
  usePostCreateCondominiumMutation,
  useUpdateCondominiumMutation,
} from "../../../../services";
import { useToast } from "../../../../hooks/use-toast";

const CondoBuilderModal = ({ open, onOpenChange, isEdit, condoData }: CondoBuilderModalProps) => {
  const typeMapping: Record<number, Types> = {
    1: Types.Residencial,
    2: Types.Comercial,
    3: Types.Misto,
  };

  const stringToNumberMapping: Record<Types, number> = {
    [Types.Residencial]: 1,
    [Types.Comercial]: 2,
    [Types.Misto]: 3,
  };

  const { toast } = useToast();

  const methods = useForm<CondoFormData>({
    resolver: zodResolver(condoSchema),
    mode: "onChange",
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = methods;

  const { mutate: createCondominium } = usePostCreateCondominiumMutation();
  const { mutate: updateCondominium } = useUpdateCondominiumMutation();

  useEffect(() => {
    if (isEdit && condoData) {
      reset({
        name: condoData.nome,
        address: condoData.endereco,
        number: condoData.numero,
        zip: condoData.cep,
        neighborhood: condoData.bairro,
        country: condoData.pais,
        state: condoData.estado,
        cnpj: condoData.cnpj,
        type: typeMapping[condoData.tipo],
      });
    } else {
      reset();
    }
  }, [isEdit, condoData, reset]);

  const onSubmit = (data: CondoFormData) => {
    const baseData = {
      nome: data.name,
      endereco: data.address,
      numero: data.number,
      cep: data.zip,
      bairro: data.neighborhood,
      pais: data.country,
      estado: data.state,
      cnpj: data.cnpj,
    };

    if (isEdit && condoData) {
      const formattedData: CondominiumRequestDTO = {
        ...baseData,
        tipo: stringToNumberMapping[data.type].toString(),
      };

      updateCondominium(
        { id: Number(condoData.id), ...formattedData },
        {
          onSuccess: () => {
            toast({
              title: "Sucesso",
              description: "Condomínio atualizado com sucesso!",
              variant: "default",
            });
            reset();
            onOpenChange(false);
          },
        },
      );
    } else {
      // Para criação, o tipo é enviado como string
      const formattedData: CondominiumRequestDTO = {
        ...baseData,
        tipo: data.type as Types,
      };

      createCondominium(formattedData, {
        onSuccess: () => {
          toast({
            title: "Sucesso",
            description: "Condomínio criado com sucesso!",
            variant: "default",
          });
          reset();
          onOpenChange(false);
        },
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white p-6 rounded shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {isEdit ? "Editar Condomínio" : "Cadastro de Condomínio"}
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 flex-col">
            <div className="gap-2 grid grid-cols-2">
              <div className="w-full">
                <label className="block text-sm text-gray-700">Nome do Condomínio</label>
                <Controller
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <input
                      className="mt-1 block w-full border p-2 rounded"
                      placeholder="Nome do Condomínio"
                      {...field}
                    />
                  )}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>

              <div className="w-full">
                <label className="block text-sm text-gray-700">Endereço</label>
                <Controller
                  control={control}
                  name="address"
                  render={({ field }) => (
                    <input
                      className="mt-1 block w-full border p-2 rounded"
                      placeholder="Endereço"
                      {...field}
                    />
                  )}
                />
                {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
              </div>

              <div className="w-full">
                <label className="block text-sm text-gray-700">Número</label>
                <Controller
                  control={control}
                  name="number"
                  render={({ field }) => (
                    <input
                      type="number"
                      className="mt-1 block w-full border p-2 rounded"
                      placeholder="Número"
                      {...field}
                    />
                  )}
                />
                {errors.number && <p className="text-red-500 text-sm">{errors.number.message}</p>}
              </div>

              <div className="w-full">
                <label className="block text-sm text-gray-700">CEP</label>
                <Controller
                  control={control}
                  name="zip"
                  render={({ field }) => (
                    <input
                      className="mt-1 block w-full border p-2 rounded"
                      placeholder="CEP"
                      {...field}
                    />
                  )}
                />
                {errors.zip && <p className="text-red-500 text-sm">{errors.zip.message}</p>}
              </div>

              <div className="w-full">
                <label className="block text-sm text-gray-700">Bairro</label>
                <Controller
                  control={control}
                  name="neighborhood"
                  render={({ field }) => (
                    <input
                      className="mt-1 block w-full border p-2 rounded"
                      placeholder="Bairro"
                      {...field}
                    />
                  )}
                />
                {errors.neighborhood && (
                  <p className="text-red-500 text-sm">{errors.neighborhood.message}</p>
                )}
              </div>

              <div className="w-full">
                <label className="block text-sm text-gray-700">País</label>
                <Controller
                  control={control}
                  name="country"
                  render={({ field }) => (
                    <input
                      className="mt-1 block w-full border p-2 rounded"
                      placeholder="País"
                      {...field}
                    />
                  )}
                />
                {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
              </div>

              <div className="w-full">
                <label className="block text-sm text-gray-700">Estado</label>
                <Controller
                  control={control}
                  name="state"
                  render={({ field }) => (
                    <input
                      className="mt-1 block w-full border p-2 rounded"
                      placeholder="Estado"
                      {...field}
                    />
                  )}
                />
                {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
              </div>

              <div className="w-full">
                <label className="block text-sm text-gray-700">CNPJ</label>
                <Controller
                  control={control}
                  name="cnpj"
                  render={({ field }) => (
                    <input
                      className="mt-1 block w-full border p-2 rounded"
                      placeholder="CNPJ"
                      {...field}
                    />
                  )}
                />
                {errors.cnpj && <p className="text-red-500 text-sm">{errors.cnpj.message}</p>}
              </div>

              <div className="w-full">
                <label className="block text-sm text-gray-700">Tipo de Condomínio</label>
                <Controller
                  control={control}
                  name="type"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded">
                        <SelectValue placeholder="Selecione o tipo do condomínio" />
                      </SelectTrigger>
                      <SelectContent className="bg-white rounded shadow-lg">
                        <SelectItem value={Types.Residencial}>Condomínio Residencial</SelectItem>
                        <SelectItem value={Types.Comercial}>Condomínio Comercial</SelectItem>
                        <SelectItem value={Types.Misto}>Condomínio Misto</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
              </div>
            </div>

            <div className="flex justify-end gap-2 text-xs font-semibold">
              <button
                type="button"
                onClick={() => {
                  reset();
                  onOpenChange(false);
                }}
                className="button-cancel"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={!isValid}
                className="button-confirm disabled:bg-gray-300"
              >
                {isEdit ? "Atualizar" : "Cadastrar"}
              </button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export { CondoBuilderModal };

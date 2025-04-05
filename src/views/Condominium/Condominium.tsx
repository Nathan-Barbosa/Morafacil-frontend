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
import { condoSchema } from "./Condominium.schemas";
import { CondoFormData } from "./Condominium.types";
import { useToast } from "../../hooks/use-toast";
import {
  PostCreateCondominiumRequestDTO,
  Types,
  useGetCondosListQuery,
  usePostCreateCondominiumMutation,
} from "../../services";

const Condominium = () => {
  const [openModal, setOpenModal] = useState(false);

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

  const { toast } = useToast();
  const { data: condos } = useGetCondosListQuery({
    pageNumber: 1,
    pageSize: 10,
  });
  const { mutate: createCondominium } = usePostCreateCondominiumMutation();

  const onSubmit = (data: CondoFormData) => {
    const formattedData: PostCreateCondominiumRequestDTO = {
      nome: data.name,
      endereco: data.address,
      numero: data.number,
      cep: data.zip,
      bairro: data.neighborhood,
      pais: data.country,
      estado: data.state,
      cnpj: data.cnpj,
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
        setOpenModal(false);
      },
    });
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
                  <td className=" flex px-4 py-2 gap-2">
                    <button
                      className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-sm rounded transition"
                      // Aqui você pode adicionar a lógica para edição, se necessário
                    >
                      Editar
                    </button>

                    <button
                      className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-sm rounded transition"
                      // Aqui você pode adicionar a lógica para edição, se necessário
                    >
                      Remover
                    </button>

                    <button
                      className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-sm rounded transition"
                      // Aqui você pode adicionar a lógica para edição, se necessário
                    >
                      Habilitar
                    </button>

                    <button
                      className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-sm rounded transition"
                      // Aqui você pode adicionar a lógica para edição, se necessário
                    >
                      Desabilitar
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

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="bg-white p-6 rounded shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Cadastro de Condomínio</DialogTitle>
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

                <div className="w-full ">
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
                  {errors.address && (
                    <p className="text-red-500 text-sm">{errors.address.message}</p>
                  )}
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

                <div className="w-full ">
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

                <div className="w-full ">
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
                  {errors.country && (
                    <p className="text-red-500 text-sm">{errors.country.message}</p>
                  )}
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
                          <SelectValue placeholder="Selecione o tipo do condomínio" className="" />
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
                    setOpenModal(false);
                  }}
                  className="button-cancel"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={!isValid}
                  className="button-confirm disabled:gray-300"
                >
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

export { Condominium };

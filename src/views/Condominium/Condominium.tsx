import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { condoSchema } from "./Condominium.schemas";
import { CondoFormData } from "./Condominium.types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components";
import { useToast } from "../../hooks/use-toast";
import {
  PostCreateCondominiumRequestDTO,
  Types,
  usePostCreateCondominiumMutation,
} from "../../services";

const Condominium = () => {
  const methods = useForm<CondoFormData>({
    resolver: zodResolver(condoSchema),
    mode: "onChange",
  });

  const { toast } = useToast();

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
    setValue,
  } = methods;

  const handleCancel = () => {
    reset();
  };

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
      tipo: data.type as Types, // Assegure que o enum Types esteja correto, por exemplo:
      // enum Types {
      //   CASA = "houses",
      //   APARTAMENTO = "apartments"
      // }
      areasComuns: data.commonAreas ?? false,
      situacao: 1, // Valor padrão (ajuste conforme necessário)
      bloco: "A", // Valor padrão (ajuste conforme necessário)
      unidade: "101", // Valor padrão (ajuste conforme necessário)
      condominioId: 123, // Valor padrão ou obtido de outra forma
    };

    createCondominium(formattedData, {
      onSuccess: () => {
        toast({
          title: "Sucesso",
          description: "Condomínio atribuída com sucesso!",
          variant: "default",
        });
      },
    });
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full">
        <h2 className="text-2xl font-semibold mb-2">Cadastro de Condomínio</h2>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-4 justify-evenly">
              <div className="w-full">
                <div className="mb-2">
                  <label className="block text-sm text-gray-700">Nome do Condomínio</label>
                  <Controller
                    control={control}
                    name="name"
                    render={({ field }) => (
                      <input
                        className="mt-1 block w-full border p-2 rounded"
                        {...field}
                        placeholder="Nome do Condomínio"
                      />
                    )}
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>
                <div className="mb-2">
                  <label className="block text-sm text-gray-700">Endereço</label>
                  <Controller
                    control={control}
                    name="address"
                    render={({ field }) => (
                      <input
                        className="mt-1 block w-full border p-2 rounded"
                        {...field}
                        placeholder="Endereço"
                      />
                    )}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm">{errors.address.message}</p>
                  )}
                </div>
                <div className="mb-2">
                  <label className="block text-sm text-gray-700">Número</label>
                  <Controller
                    control={control}
                    name="number"
                    render={({ field }) => (
                      <input
                        className="mt-1 block w-full border p-2 rounded"
                        {...field}
                        placeholder="Número"
                      />
                    )}
                  />
                  {errors.number && <p className="text-red-500 text-sm">{errors.number.message}</p>}
                </div>
                <div className="mb-2">
                  <label className="block text-sm text-gray-700">CEP</label>
                  <Controller
                    control={control}
                    name="zip"
                    render={({ field }) => (
                      <input
                        className="mt-1 block w-full border p-2 rounded"
                        {...field}
                        placeholder="CEP"
                      />
                    )}
                  />
                  {errors.zip && <p className="text-red-500 text-sm">{errors.zip.message}</p>}
                </div>
                <div className="mb-2">
                  <label className="block text-sm text-gray-700">Bairro</label>
                  <Controller
                    control={control}
                    name="neighborhood"
                    render={({ field }) => (
                      <input
                        className="mt-1 block w-full border p-2 rounded"
                        {...field}
                        placeholder="Bairro"
                      />
                    )}
                  />
                  {errors.neighborhood && (
                    <p className="text-red-500 text-sm">{errors.neighborhood.message}</p>
                  )}
                </div>
                <div className="mb-2">
                  <label className="block text-sm text-gray-700">País</label>
                  <Controller
                    control={control}
                    name="country"
                    render={({ field }) => (
                      <input
                        className="mt-1 block w-full border p-2 rounded"
                        {...field}
                        placeholder="País"
                      />
                    )}
                  />
                  {errors.country && (
                    <p className="text-red-500 text-sm">{errors.country.message}</p>
                  )}
                </div>
                <div className="mb-2">
                  <label className="block text-sm text-gray-700">Estado</label>
                  <Controller
                    control={control}
                    name="state"
                    render={({ field }) => (
                      <input
                        className="mt-1 block w-full border p-2 rounded"
                        {...field}
                        placeholder="Estado"
                      />
                    )}
                  />
                  {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
                </div>
                <div className="mb-2">
                  <label className="block text-sm text-gray-700">CNPJ</label>
                  <Controller
                    control={control}
                    name="cnpj"
                    render={({ field }) => (
                      <input
                        className="mt-1 block w-full border p-2 rounded"
                        {...field}
                        placeholder="CNPJ"
                      />
                    )}
                  />
                  {errors.cnpj && <p className="text-red-500 text-sm">{errors.cnpj.message}</p>}
                </div>
              </div>

              <div className="w-full h-full flex flex-col">
                <div className="flex-grow">
                  <div className="mb-2">
                    <label className="block text-sm text-gray-700">Tipo de Condomínio</label>
                    <Controller
                      control={control}
                      name="type"
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={(value) => field.onChange(value)}
                        >
                          <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded placeholder:text-gray-600">
                            <SelectValue placeholder="Selecione o tipo do condomínio" />
                          </SelectTrigger>
                          <SelectContent className="bg-white rounded shadow-lg">
                            <SelectItem value="houses">Condomínio de Casas</SelectItem>
                            <SelectItem value="apartments">Condomínio de Apartamentos</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />

                    {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Controller
                      control={control}
                      name="commonAreas"
                      render={({ field }) => (
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={(e) => setValue("commonAreas", e.target.checked)}
                        />
                      )}
                    />
                    <label className="text-sm">Áreas Comuns</label>
                  </div>
                </div>

                <div className="flex gap-2 mt-auto-">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="w-full p-2 rounded border border-blue-500 text-blue-600 hover:text-white hover:bg-blue-700"
                  >
                    Limpar formulário
                  </button>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded hover:text-white hover:bg-blue-700 disabled:bg-gray-400"
                    disabled={!isValid}
                  >
                    Salvar
                  </button>
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export { Condominium };

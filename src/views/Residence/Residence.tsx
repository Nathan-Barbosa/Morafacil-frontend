import { useEffect, useState } from "react";
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
import { residenceSchema } from "./Residence.schemas";
import { ResidenceFormData } from "./Residence.types";
import {
  useGetResidenceQuery,
  useGetResidencesListQuery,
  usePostCreateResidenceMutation,
} from "../../services";
import { useToast } from "../../providers/ToastProvider";
import { useDebounce } from "use-debounce";
import { ResidenceResponseDTO } from "../../models";
import { MagnifyingGlass } from "@phosphor-icons/react";

const Residence = () => {
  const [openModal, setOpenModal] = useState(false);
  const [residenceFilter, setResidenceFilter] = useState<string>("");
  const [debouncedResidenceFilter] = useDebounce(residenceFilter, 1000);
  const [allResidences, setAllResidences] = useState<ResidenceResponseDTO[] | undefined>();

  const methods = useForm<ResidenceFormData>({
    resolver: zodResolver(residenceSchema),
    mode: "onChange",
  });
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = methods;

  const { toast } = useToast();

  const { data: residences } = useGetResidencesListQuery({
    pageNumber: 1,
    pageSize: 10,
  });

  const { mutate: createResidence } = usePostCreateResidenceMutation();
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

  const onSubmit = (data: ResidenceFormData) => {
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
            placeholder="Buscar por condomínio por id"
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
                  <td className="flex justify-end px-4 py-2">
                    <button className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-sm rounded transition">
                      Editar
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

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="bg-white p-6 rounded shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Cadastro de Residência</DialogTitle>
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
                  {errors.unidade && (
                    <p className="text-red-500 text-sm">{errors.unidade.message}</p>
                  )}
                </div>

                <div className="w-full md:w-1/4">
                  <label className="block text-sm text-gray-700">ID do Condomínio</label>
                  <Controller
                    control={control}
                    name="condominioId"
                    render={({ field }) => (
                      <input
                        type="number"
                        className="mt-1 block w-full border p-2 rounded"
                        placeholder="ID do Condomínio"
                        {...field}
                      />
                    )}
                  />
                  {errors.condominioId && (
                    <p className="text-red-500 text-sm">{errors.condominioId.message}</p>
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

export { Residence };

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components";
import { useGetFinesQuery, usePostCreateFineMutation, FineRequestDTO } from "../../services";
import { useToast } from "../../hooks/use-toast";
import { MagnifyingGlass, DotsThreeVertical } from "@phosphor-icons/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FinesCardOptions } from "./components";
import { finesFormSchema } from "./fines.schemas";

type FineFormInput = Omit<FineRequestDTO, "mensagem"> & {
  mensagemText: string;
};
const FinesBoard = () => {
  const [openFineModal, setOpenFineModal] = useState(false);
  const { toast } = useToast();

  const { data: fines } = useGetFinesQuery({ pageNumber: 1, pageSize: 10 });
  const { mutate: postFine } = usePostCreateFineMutation();

  const { control, handleSubmit, reset } = useForm<FineFormInput>({
    resolver: zodResolver(finesFormSchema),
  });

  const onSubmitFine = (data: FineFormInput) => {
    const finePayload: FineRequestDTO = {
      titulo: data.titulo,
      descricao: data.descricao,
      dataInicio: data.dataInicio,
      dataFim: data.dataFim,
      criadoPorId: data.criadoPorId,
      mensagem: data.mensagemText.split(",").map((option) => option.trim()),
    };

    postFine(finePayload, {
      onSuccess: () => {
        toast({
          title: "Sucesso",
          description: "Votação publicada com sucesso!",
          variant: "default",
        });
        setOpenFineModal(false);
        reset();
      },
    });
  };

  return (
    <div className="space-y-6 w-full flex flex-col overflow-auto h-full">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quadro de Votações</h1>
          <p className="text-gray-600 font-semibold">Lista de votações recentes</p>
        </div>
        <button
          className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition"
          onClick={() => setOpenFineModal(true)}
        >
          Nova Votação
        </button>
      </div>

      <div className="flex h-full flex-col gap-y-4 overflow-auto">
        {fines?.data && fines.data.length > 0 && (
          <section className="flex flex-row flex-wrap gap-2 w-full">
            {fines.data.map((fine) => {
              const closedVote = fine.encerrada;
              return (
                <li
                  key={fine.id}
                  className={`hover:bg-blue-300 relative group flex max-w-96 w-full flex-col justify-between rounded-xl border border-gray4 p-3 bg-blue-100 ${closedVote && "bg-red-200 hover:bg-red-400"}`}
                >
                  <div className="ml-auto absolute self-end">
                    <FinesCardOptions fine={fine}>
                      <button
                        className={`right-4 flex rounded outline-none hover:bg-blue-400 ${closedVote && " hover:bg-red-500"} `}
                      >
                        <DotsThreeVertical className="size-6" weight="bold" />
                      </button>
                    </FinesCardOptions>
                  </div>
                  <h2 className="text-sm font-semibold">{fine.titulo}</h2>
                  <p className="text-gray-600">{fine.descricao}</p>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-400">
                      Início: {new Date(fine.dataInicio).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-400">
                      Fim: {new Date(fine.dataFim).toLocaleDateString()}
                    </p>
                  </div>
                </li>
              );
            })}
          </section>
        )}
        {!fines?.data.length && (
          <div className="flex flex-col items-center justify-center top-1/2 text-center h-full w-full">
            <MagnifyingGlass size={150} weight="duotone" className="text-gray-400" />
            <span className="mt-2 text-gray-600">Nenhuma votação encontrada</span>
          </div>
        )}
      </div>

      <Dialog open={openFineModal} onOpenChange={setOpenFineModal}>
        <DialogContent className="bg-white p-6 rounded shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Nova Votação</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmitFine)} className="space-y-4">
            <Controller
              name="titulo"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <input
                    type="text"
                    placeholder="Título"
                    {...field}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                  {error && <p className="text-xs text-red-500">{error.message}</p>}
                </>
              )}
            />

            <Controller
              name="descricao"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <textarea
                    placeholder="Descrição da votação"
                    {...field}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  ></textarea>
                  {error && <p className="text-xs text-red-500">{error.message}</p>}
                </>
              )}
            />

            <Controller
              name="dataInicio"
              control={control}
              render={({ field, fieldState: { error } }) => {
                const stringValue = field.value
                  ? new Date(field.value).toISOString().split("T")[0]
                  : "";
                return (
                  <>
                    <input
                      type="date"
                      name={field.name}
                      placeholder="Data de Início"
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      value={stringValue}
                      onChange={(e) => {
                        field.onChange(new Date(e.target.value));
                      }}
                      onBlur={field.onBlur}
                      ref={field.ref}
                    />
                    {error && <p className="text-xs text-red-500">{error.message}</p>}
                  </>
                );
              }}
            />

            <Controller
              name="dataFim"
              control={control}
              render={({ field, fieldState: { error } }) => {
                const stringValue = field.value
                  ? new Date(field.value).toISOString().split("T")[0]
                  : "";
                return (
                  <>
                    <input
                      type="date"
                      name={field.name}
                      placeholder="Data de Fim"
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      value={stringValue}
                      onChange={(e) => {
                        field.onChange(new Date(e.target.value));
                      }}
                      onBlur={field.onBlur}
                      ref={field.ref}
                    />
                    {error && <p className="text-xs text-red-500">{error.message}</p>}
                  </>
                );
              }}
            />

            <Controller
              name="criadoPorId"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <input
                    type="number"
                    placeholder="Criado Por (ID)"
                    {...field}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                  {error && <p className="text-xs text-red-500">{error.message}</p>}
                </>
              )}
            />

            <Controller
              name="mensagemText"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <input
                    type="text"
                    placeholder="Opções (separadas por vírgula)"
                    {...field}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                  {error && <p className="text-xs text-red-500">{error.message}</p>}
                </>
              )}
            />

            <div className="flex justify-end gap-2 text-xs font-semibold">
              <button
                type="button"
                className="button-cancel"
                onClick={() => setOpenFineModal(false)}
              >
                Cancelar
              </button>
              <button className="button-confirm" type="submit">
                Publicar
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export { FinesBoard };

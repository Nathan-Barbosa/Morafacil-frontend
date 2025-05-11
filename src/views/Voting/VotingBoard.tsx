import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components";
import { useGetVotingsQuery, usePostCreateVotingMutation, VotingRequestDTO } from "../../services";
import { useToast } from "../../hooks/use-toast";
import { MagnifyingGlass, DotsThreeVertical } from "@phosphor-icons/react";
import { VotingCardOptions } from "./components";
import { zodResolver } from "@hookform/resolvers/zod";
import { votingFormSchema } from "./VotingBoard.schemas";
import Loading from "../../components/ui/loading";
import Pagination from "../../components/ui/pagination";

type VotingFormInput = Omit<VotingRequestDTO, "mensagem"> & {
  mensagemText: string;
};
const VotingBoard = () => {
  const [openVotingModal, setOpenVotingModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { toast } = useToast();

  const { data: votings,    refetch: refetchVoting,
    isLoading: isLoadingVoting,
    isFetching: isFetchingVoting,} = useGetVotingsQuery({ pageNumber: currentPage, pageSize });
  const { mutate: postVoting } = usePostCreateVotingMutation();

  const { control, handleSubmit, reset } = useForm<VotingFormInput>({
    resolver: zodResolver(votingFormSchema),
  });

  const onSubmitVoting = (data: VotingFormInput) => {
    const votingPayload: VotingRequestDTO = {
      titulo: data.titulo,
      descricao: data.descricao,
      dataInicio: data.dataInicio,
      dataFim: data.dataFim,
      criadoPorId: data.criadoPorId,
      mensagem: data.mensagemText.split(",").map((option) => option.trim()),
    };

    postVoting(votingPayload, {
      onSuccess: () => {
        toast({
          title: "Sucesso",
          description: "Votação publicada com sucesso!",
          variant: "default",
        });
        setOpenVotingModal(false);
        reset();
      },
    });
  };

    useEffect(() => {
      refetchVoting();
    }, []);

  if (isLoadingVoting || isFetchingVoting) {
    return <Loading />;
  }
    
  return (
    <div className="space-y-6 w-full flex flex-col overflow-auto h-full">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quadro de Votações</h1>
          <p className="text-gray-600 font-semibold">Lista de votações recentes</p>
        </div>
        <button
          className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition"
          onClick={() => setOpenVotingModal(true)}
        >
          Nova Votação
        </button>
      </div>

      <div className="flex h-full flex-col gap-y-4 overflow-auto">
        {votings?.data && votings.data.length > 0 && (
          <section className="flex flex-row flex-wrap gap-2 w-full">
            {votings.data.map((voting) => {
              const closedVote = voting.encerrada;
              return (
                <li
                  key={voting.id}
                  className={`hover:bg-blue-300 relative group flex max-w-96 w-full flex-col justify-between rounded-xl border border-gray4 p-3 bg-blue-100 ${closedVote && "bg-red-200 hover:bg-red-400"}`}
                >
                  <div className="ml-auto absolute self-end">
                    <VotingCardOptions voting={voting}>
                      <button
                        className={`right-4 flex rounded outline-none hover:bg-blue-400 ${closedVote && " hover:bg-red-500"} `}
                      >
                        <DotsThreeVertical className="size-6" weight="bold" />
                      </button>
                    </VotingCardOptions>
                  </div>
                  <h2 className="text-sm font-semibold">{voting.titulo}</h2>
                  <p className="text-gray-600">{voting.descricao}</p>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-400">
                      Início: {new Date(voting.dataInicio).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-400">
                      Fim: {new Date(voting.dataFim).toLocaleDateString()}
                    </p>
                  </div>
                </li>
              );
            })}
          </section>
        )}
        {!votings?.data.length && (
          <div className="flex flex-col items-center justify-center top-1/2 text-center h-full w-full">
            <MagnifyingGlass size={150} weight="duotone" className="text-gray-400" />
            <span className="mt-2 text-gray-600">Nenhuma votação encontrada</span>
          </div>
        )}
      </div>

      {votings && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil((votings.totalCount ?? 0) / pageSize)}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}

      <Dialog open={openVotingModal} onOpenChange={setOpenVotingModal}>
        <DialogContent className="bg-white p-6 rounded shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Nova Votação</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmitVoting)} className="space-y-4">
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
                onClick={() => setOpenVotingModal(false)}
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

export { VotingBoard };

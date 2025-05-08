import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components";
import { useToast } from "../../hooks/use-toast";
import { MagnifyingGlass, DotsThreeVertical } from "@phosphor-icons/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FinesCardOptions } from "./components";
import { finesFormSchema } from "./fines.schemas";
import { FineRequestDTO, useGetFinesQuery, usePostCreateFineMutation } from "../../services";
import { FinesFormData, FineStatus } from "./Fines.types";
// import Loading from "../../components/ui/loading";
import { useAuth } from "../../providers";
import { FinesResponseDTO } from "../../models";

const MyFines = () => {
  const { user } = useAuth();
  const [userFines, setUserFines] = useState<FinesResponseDTO[]>([]);

  console.log(userFines);
  const [openFineModal, setOpenFineModal] = useState(false);
  const { toast } = useToast();

  const {
    data: fines,
    // refetch: refetchFines,
    // isLoading: isLoadingFines,
    // isFetching: isFetchingFines,
  } = useGetFinesQuery({ pageNumber: 1, pageSize: 50 });

  const { mutate: postFine } = usePostCreateFineMutation();

  const { control, handleSubmit, reset } = useForm<FinesFormData>({
    resolver: zodResolver(finesFormSchema),
    defaultValues: {
      status: "Pendente",
    },
  });
  const onSubmitFine = (data: FinesFormData) => {
    const finePayload: FineRequestDTO = {
      motivo: data.motivo,
      residenciaId: data.residenciaId,
      status: data.status,
      valor: data.valor,
      data: data.data,
    };

    postFine(finePayload, {
      onSuccess: () => {
        toast({
          title: "Sucesso",
          description: "Multa publicada com sucesso!",
          variant: "default",
        });
        setOpenFineModal(false);
        reset();
      },
    });
  };

  // useEffect(() => {
  //   refetchFines();
  // }, []);

  useEffect(() => {
    if (user && fines?.data) {
      const filtered = fines.data.filter((resFines) =>
        resFines.residencia?.usuariosIds.includes(user.id),
      );
      setUserFines(filtered);
    }
  }, [user, fines]);

  // if (isLoadingFines || isFetchingFines) {
  //   return <Loading />;
  // }

  return (
    <div className="space-y-6 w-full flex flex-col overflow-auto h-full">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quadro de Multas</h1>
          <p className="text-gray-600 font-semibold">Lista de multas recentes</p>
        </div>
        <button
          className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition"
          onClick={() => setOpenFineModal(true)}
        >
          Nova Multa
        </button>
      </div>

      <div className="flex h-full flex-col gap-y-4 overflow-auto">
        {userFines && userFines.length > 0 && (
          <section className="flex flex-row flex-wrap gap-2 w-full">
            {userFines.map((fine) => {
              const isPending = Number(fine.status) === 0;
              const isPaid = Number(fine.status) === 1;
              const isCanceled = Number(fine.status) === 2;
              return (
                <li
                  key={fine.id}
                  className={`relative group flex max-w-96 w-full flex-col justify-between rounded-xl border border-gray4 p-3  ${isPending && "bg-red-200 hover:bg-red-400"} ${isCanceled && "bg-gray-200 hover:bg-gray-400"}
                  ${isPaid && "bg-green-200 hover:bg-green-400"}`}
                >
                  <div className="ml-auto absolute self-end">
                    <FinesCardOptions fine={fine}>
                      <button
                        className={`right-4 flex rounded outline-none hover:bg-blue-400 ${isPending && " hover:bg-red-500"} `}
                      >
                        <DotsThreeVertical className="size-6" weight="bold" />
                      </button>
                    </FinesCardOptions>
                  </div>
                  <h2 className="text-sm font-semibold">{fine.motivo}</h2>
                  <p className="text-gray-600">R$: {fine.valor}</p>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-400">
                      Data: {new Date(fine.data).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-400">
                      Status: {FineStatus[Number(fine.status)]}
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
            <DialogTitle className="text-lg font-semibold">Nova Multa</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmitFine)} className="space-y-4">
            <Controller
              name="motivo"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <input
                    type="text"
                    placeholder="Motivo"
                    {...field}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                  {error && <p className="text-xs text-red-500">{error.message}</p>}
                </>
              )}
            />

            <Controller
              name="status"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <select
                    {...field}
                    onChange={(e) => field.onChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  >
                    <option value="Pendente">Pendente</option>
                    <option value="Paga">Paga</option>
                    <option value="Cancelada">Cancelada</option>
                  </select>
                  {error && <p className="text-xs text-red-500">{error.message}</p>}
                </>
              )}
            />

            <Controller
              name="valor"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <input
                    type="text"
                    placeholder="valor da multa"
                    {...field}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  ></input>
                  {error && <p className="text-xs text-red-500">{error.message}</p>}
                </>
              )}
            />

            <Controller
              name="data"
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
                      placeholder="Data"
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

export { MyFines };

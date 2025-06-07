import { useEffect, useState } from "react";
import { MenuItem, FinesCardOptionsProps } from "./FinesCardOptions.types";
import { useToast } from "../../../../hooks/use-toast";
import {
  FineRequestDTO,
  UpdateFineRequestDTO,
  useCloseVotingMutation,
  usePutUpdateFineMutation,
} from "../../../../services";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../../components";

import { useAuth } from "../../../../providers";
import { ConfirmDialog } from "../ConfirmDialog";
import { Controller, useForm } from "react-hook-form";

const FinesCardOptions = ({ children, fine }: FinesCardOptionsProps) => {

  const { user } = useAuth();
  const isAdmin = user?.roles?.includes("Admin");
  const isAdminCond = user?.roles?.includes("AdminCond");
  const podeGerenciar = isAdmin || isAdminCond;

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);

  const { register, handleSubmit, reset, control } = useForm<FineRequestDTO>();

  const { toast } = useToast();
  const { mutate: closeVoting } = useCloseVotingMutation();

  const onEdit = () => setOpenEditModal(true);
  const onCloseVoting = () => setOpenDialog(true);
  const { mutate: editFine } = usePutUpdateFineMutation();

  const onSuccess = () => {
    toast({
      title: "Sucesso",
      description: `Votação encerrado com sucesso!`,
      variant: "default",
    });
    setOpenDialog(false);
  };

  const handleConfirmCloseVoting = async () => {
    closeVoting(Number(fine?.id), { onSuccess });
  };

  const onSubmitFine = (data: FineRequestDTO) => {
    const finePayload: UpdateFineRequestDTO = {
      id: data.id!,
      motivo: data.motivo,
      status: Number(data.status),
      valor: data.valor,
      data: data.data,
    };

    editFine(finePayload, {
      onSuccess: () => {
        toast({
          title: "Sucesso",
          description: "Multa alterado com sucesso!",
          variant: "default",
        });
        setOpenEditModal(false);
        reset();
      },
    });
  };

  const menuItems: MenuItem[] = [
    { label: "Editar", callback: onEdit },
    fine.motivo ? null : { label: "Encerrar", callback: onCloseVoting },
  ].filter(Boolean) as MenuItem[];

  useEffect(() => {
    if (openEditModal) {
      reset({
        id: fine.id,
        motivo: fine.motivo,
        status: fine.status,
        valor: fine.valor,
        data: fine.data,
      });
    }
  }, [openEditModal, fine, reset]);

  return (
    <>
      {podeGerenciar && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
          <DropdownMenuContent className="w-40" side="bottom" align="end">
            {menuItems.map((item, index) => (
              <DropdownMenuItem
                key={index}
                className="border-gray4 bg-blue-100 hover:bg-blue-200"
                onClick={item.callback}
              >
                {item.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      <ConfirmDialog
        fine={fine}
        open={openDialog}
        setOpen={setOpenDialog}
        onConfirm={handleConfirmCloseVoting}
      />

      <Dialog open={openEditModal} onOpenChange={setOpenEditModal}>
        <DialogContent className="bg-white p-6 rounded shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Editar Multa</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmitFine)} className="space-y-4">
            <input
              type="text"
              placeholder="Motivo"
              {...register("motivo", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />

            <Controller
              name="status"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <select
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  >
                    <option value={0}>Pendente</option>
                    <option value={1}>Paga</option>
                    <option value={2}>Cancelada</option>
                  </select>
                  {error && <p className="text-xs text-red-500">{error.message}</p>}
                </>
              )}
            />

            <input
              type="text"
              placeholder="Valor da multa"
              {...register("valor", { required: true, valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />

            <Controller
              name="data"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <input
                    type="date"
                    name={field.name}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    value={field.value ? new Date(field.value).toISOString().split("T")[0] : ""}
                    onChange={(e) => field.onChange(e.target.value || "")}
                    onBlur={field.onBlur}
                    ref={field.ref}
                  />
                  {error && <p className="text-xs text-red-500">{error.message}</p>}
                </>
              )}
            />

            <div className="flex justify-end gap-2 text-xs font-semibold">
              <button
                type="button"
                className="button-cancel"
                onClick={() => setOpenEditModal(false)}
              >
                Cancelar
              </button>
              <button className="button-confirm" type="submit">
                Editar
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export { FinesCardOptions };

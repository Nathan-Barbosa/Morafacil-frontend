import { useEffect, useState } from "react";
import { MenuItem, VotingCardOptionsProps } from "./NoticeCardOptions.types";
import { useToast } from "../../../../hooks/use-toast";
import {
  UpdateNoticeRequestDTO,
  useCloseVotingMutation,
  usePutUpdateNoticeMutation,
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

import { ConfirmDialog } from "../ConfirmDialog";
import { useForm } from "react-hook-form";

const VotingCardOptions = ({ children, voting }: VotingCardOptionsProps) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);

  const { register, handleSubmit, reset } = useForm<UpdateNoticeRequestDTO>();

  const { toast } = useToast();
  const { mutate: closeVoting } = useCloseVotingMutation();
  const { mutate: editNotice } = usePutUpdateNoticeMutation();

  const onEdit = () => setOpenEditModal(true);
  const onCloseVoting = () => setOpenDialog(true);

  const onSuccess = () => {
    toast({
      title: "Sucesso",
      description: `Votação encerrado com sucesso!`,
      variant: "default",
    });
    setOpenDialog(false);
  };

  const handleConfirmCloseVoting = async () => {
    closeVoting(Number(voting?.id), { onSuccess });
  };

  const onSubmitUpdateNotice = (data: UpdateNoticeRequestDTO) => {
    editNotice(data, {
      onSuccess: () => {
        toast({
          title: "Sucesso",
          description: "Votação alterada com sucesso!",
          variant: "default",
        });
        setOpenEditModal(false);
        reset();
      },
    });
  };

  const menuItems: MenuItem[] = [
    { label: "Editar", callback: onEdit },
    voting.encerrada ? null : { label: "Encerrar", callback: onCloseVoting },
  ].filter(Boolean) as MenuItem[];

  useEffect(() => {
    if (openEditModal) {
      reset({
        id: voting.id,
        titulo: voting.titulo,
        // mensagem: voting.mensagem,
      });
    }
  }, [openEditModal, voting, reset]);

  return (
    <>
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

      <ConfirmDialog
        voting={voting}
        open={openDialog}
        setOpen={setOpenDialog}
        onConfirm={handleConfirmCloseVoting}
      />

      <Dialog open={openEditModal} onOpenChange={setOpenEditModal}>
        <DialogContent className="bg-white p-6 rounded shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Editar Votação</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmitUpdateNotice)} className="space-y-4">
            <input
              type="text"
              placeholder="Título"
              {...register("titulo", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            <textarea
              placeholder="Conteúdo do aviso"
              {...register("mensagem", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded max-h-[30vh] outline-none"
            ></textarea>
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

export { VotingCardOptions };

import { useEffect, useState } from "react";
import { MenuItem, NoticeCardOptionsProps } from "./NoticeCardOptions.types";
import { useToast } from "../../../../hooks/use-toast";
import {
  UpdateNoticeRequestDTO,
  useDeleteNoticeMutation,
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

const NoticeCardOptions = ({ children, notice }: NoticeCardOptionsProps) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);

  const { register, handleSubmit, reset } = useForm<UpdateNoticeRequestDTO>();

  const { toast } = useToast();
  const { mutate: deleteNotice } = useDeleteNoticeMutation();
  const { mutate: editNotice } = usePutUpdateNoticeMutation();

  const onEdit = () => setOpenEditModal(true);
  const onRemove = () => setOpenDialog(true);

  const onSuccess = () => {
    toast({
      title: "Sucesso",
      description: `Aviso removido com sucesso!`,
      variant: "default",
    });
    setOpenDialog(false);
  };

  const handleConfirmRemoveNotice = async () => {
    deleteNotice(notice.id, { onSuccess });
  };

  const onSubmitUpdateNotice = (data: UpdateNoticeRequestDTO) => {
    editNotice(data, {
      onSuccess: () => {
        toast({
          title: "Sucesso",
          description: "Aviso alterado com sucesso!",
          variant: "default",
        });
        setOpenEditModal(false);
        reset();
      },
    });
  };

  const menuItems: MenuItem[] = [
    { label: "Editar", callback: onEdit },
    { label: "Remover", callback: onRemove },
  ];

  useEffect(() => {
    if (openEditModal) {
      reset({
        id: notice.id,
        titulo: notice.titulo,
        mensagem: notice.mensagem,
      });
    }
  }, [openEditModal, notice, reset]);

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
        notice={notice}
        open={openDialog}
        setOpen={setOpenDialog}
        onConfirm={handleConfirmRemoveNotice}
      />

      <Dialog open={openEditModal} onOpenChange={setOpenEditModal}>
        <DialogContent className="bg-white p-6 rounded shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Editar aviso</DialogTitle>
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

export { NoticeCardOptions };

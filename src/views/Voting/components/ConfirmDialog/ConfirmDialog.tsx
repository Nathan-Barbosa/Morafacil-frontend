import { X } from "@phosphor-icons/react";
import { ConfirmDialogProps } from "./ConfirmDialog.types";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "../../../../components";

const ConfirmDialog = ({ open, setOpen, onConfirm, voting }: ConfirmDialogProps) => {
  const closeDialog = () => setOpen(false);

  return (
    <Dialog open={open}>
      <DialogContent
        className="flex w-4/5 max-w-96 flex-col gap-4 rounded-xl bg-white p-4"
        onPointerDownOutside={closeDialog}
      >
        <div className="flex w-full justify-between gap-2">
          <DialogTitle className="w-full font-semibold">Remover aviso do mural</DialogTitle>
          <button onClick={closeDialog} className="p-1">
            <X className="size-4" />
          </button>
        </div>

        <DialogDescription className="text-sm leading-4">
          Tem certeza que deseja remover o aviso
          <span className="font-semibold"> {voting.titulo}?</span>
        </DialogDescription>

        <div className="flex justify-end gap-2 text-xs font-semibold">
          <button className="button-cancel" onClick={closeDialog}>
            Cancelar
          </button>
          <button className="button-confirm" onClick={onConfirm}>
            Remover
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { ConfirmDialog };

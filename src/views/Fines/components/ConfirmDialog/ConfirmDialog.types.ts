import { FinesResponseDTO } from "../../../../models";

type ConfirmDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: () => void;
  fine: FinesResponseDTO;
};

export type { ConfirmDialogProps };

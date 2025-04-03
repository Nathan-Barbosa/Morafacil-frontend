import { NoticeResponseDTO } from "../../../../models";

type ConfirmDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: () => void;
  notice: NoticeResponseDTO;
};

export type { ConfirmDialogProps };

import { GetParcelsResponseDTO } from "../../../../models";

type ConfirmDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: () => void;
  parcel?: GetParcelsResponseDTO;
};

export type { ConfirmDialogProps };

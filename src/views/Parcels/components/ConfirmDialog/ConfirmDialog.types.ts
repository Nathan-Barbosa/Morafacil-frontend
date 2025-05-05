import { GetParcelsResponseDTO } from "../../../../models";

type ConfirmDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: (retiradoPor: string) => void;
  parcel?: GetParcelsResponseDTO;
};

export type { ConfirmDialogProps };

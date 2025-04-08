import { GetVotingResponseDTO } from "../../../../models";

type ConfirmDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: () => void;
  voting: GetVotingResponseDTO;
};

export type { ConfirmDialogProps };

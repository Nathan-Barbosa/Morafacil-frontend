import { GetVotingResponseDTO } from "../../../../models";

type ConfirmDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: () => void;
  fine: GetVotingResponseDTO;
};

export type { ConfirmDialogProps };

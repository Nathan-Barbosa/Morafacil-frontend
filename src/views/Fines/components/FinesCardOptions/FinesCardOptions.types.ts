import { GetVotingResponseDTO } from "../../../../models";

type FinesCardOptionsProps = {
  children: React.ReactNode;
  fine: GetVotingResponseDTO;
};

type MenuItem = {
  label: string;
  callback: () => void;
  className?: string;
};

export type { MenuItem, FinesCardOptionsProps };

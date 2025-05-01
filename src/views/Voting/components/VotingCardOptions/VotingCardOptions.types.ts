import { GetVotingResponseDTO } from "../../../../models";

type VotingCardOptionsProps = {
  children: React.ReactNode;
  voting: GetVotingResponseDTO;
};

type MenuItem = {
  label: string;
  callback: () => void;
  className?: string;
};

export type { MenuItem, VotingCardOptionsProps };

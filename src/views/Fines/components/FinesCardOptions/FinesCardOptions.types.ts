import { FinesResponseDTO } from "../../../../models";

type FinesCardOptionsProps = {
  children: React.ReactNode;
  fine: FinesResponseDTO;
};

type MenuItem = {
  label: string;
  callback: () => void;
  className?: string;
};

export type { MenuItem, FinesCardOptionsProps };

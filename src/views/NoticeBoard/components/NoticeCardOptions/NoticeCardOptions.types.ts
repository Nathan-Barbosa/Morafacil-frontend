import { NoticeResponseDTO } from "../../../../models";

type NoticeCardOptionsProps = {
  children: React.ReactNode;
  notice: NoticeResponseDTO;
};

type MenuItem = {
  label: string;
  callback: () => void;
  className?: string;
};

export type { MenuItem, NoticeCardOptionsProps };

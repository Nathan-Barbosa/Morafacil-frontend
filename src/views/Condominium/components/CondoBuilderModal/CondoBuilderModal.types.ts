import { GetCondominiumResponseDTO } from "../../../../models";

type CondoBuilderModalProps = {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  isEdit?: boolean;
  condoData?: GetCondominiumResponseDTO;
};

export type { CondoBuilderModalProps };

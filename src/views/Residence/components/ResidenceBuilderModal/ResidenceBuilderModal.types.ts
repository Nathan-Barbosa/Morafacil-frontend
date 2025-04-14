import { ResidenceResponseDTO } from "../../../../models";
import { ResidenceFormData } from "../../Residence.types";

export const mapResidenceResponseToFormData = (
  residence: ResidenceResponseDTO,
): ResidenceFormData => ({
  id: residence.id,
  endereco: residence.endereco,
  numero: residence.numero,
  situacao:
    residence.situacao === 1
      ? "Ocupada"
      : residence.situacao === 2
        ? "Disponivel"
        : residence.situacao === 3
          ? "Manutenção"
          : "Construção",
  bloco: residence.bloco,
  unidade: residence.unidade,
  condominioId: residence.condominioId,
});

type ResidenceBuilderModalProps = {
  open: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  initialData: ResidenceResponseDTO | null;
};

export type { ResidenceBuilderModalProps };

import { GetCondominiumResponseDTO } from "../condominium";
import { UserResponseDTO } from "../user";

type Residence = {
  id: number;
  endereco: string;
  numero: number;
  situacao: number;
  bloco: string;
  unidade: string;
  condominioId: number;
  condominio?: GetCondominiumResponseDTO;
  usuarios: UserResponseDTO[];
};

type GetParcelsResponseDTO = {
  id: number;
  numeroEncomenda: string;
  residenciaId: number;
  residencia?: Residence;
  dataChegada: Date;
  dataRetirada: Date;
  retiradoPor: string;
};

export type { GetParcelsResponseDTO };

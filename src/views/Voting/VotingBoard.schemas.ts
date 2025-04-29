import { z } from "zod";

const votingFormSchema = z.object({
  titulo: z.string().nonempty("Título é obrigatório"),
  descricao: z.string().nonempty("Descrição é obrigatória"),
  dataInicio: z.coerce.date({ invalid_type_error: "Data de início inválida" }),
  dataFim: z.coerce.date({ invalid_type_error: "Data de fim inválida" }),
  criadoPorId: z.coerce.number({ invalid_type_error: "ID deve ser numérico" }),
  mensagemText: z.string().nonempty("Informe as opções separadas por vírgula"),
});

export { votingFormSchema };

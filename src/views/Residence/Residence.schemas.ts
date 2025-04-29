import { z } from "zod";

const residenceSchema = z.object({
  id: z.number().optional(),
  endereco: z.string().min(1, "Endereço obrigatório"),
  numero: z.preprocess((val) => Number(val), z.number({ invalid_type_error: "Número inválido" })),
  situacao: z.string().min(1, "Situação obrigatória"),
  bloco: z.string().min(1, "Bloco obrigatório"),
  unidade: z.string().min(1, "Unidade obrigatória"),
  condominioId: z.preprocess(
    (val) => Number(val),
    z.number({ invalid_type_error: "ID do condomínio inválido" }),
  ),
});

export { residenceSchema };

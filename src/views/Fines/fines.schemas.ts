import { z } from "zod";

const finesFormSchema = z.object({
  id: z.number().optional(),
  valor: z.coerce.number().min(0.01, "Valor deve ser maior que zero"),
  data: z.coerce.date({ invalid_type_error: "Data inválida" }),
  motivo: z.string().nonempty("Motivo é obrigatório"),
  status: z.string(),
  residenciaId: z.coerce.number({ invalid_type_error: "Residência é obrigatória" }),
});

export { finesFormSchema };

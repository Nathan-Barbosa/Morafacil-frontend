import { z } from "zod";

const parcelsSchema = z.object({
  numeroEncomenda: z.string(),
  residenciaId: z.preprocess(
    (val) => Number(val),
    z.number({ invalid_type_error: "ID da residência inválida" }),
  ),
});

export { parcelsSchema };

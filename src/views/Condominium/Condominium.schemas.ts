import { z } from "zod";

const condoSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  address: z.string().min(1, "Endereço obrigatório"),
  number: z.string().min(1, "Número obrigatório"),
  zip: z.string().min(8, "CEP obrigatório"),
  neighborhood: z.string().min(1, "Bairro obrigatório"),
  country: z.string().min(1, "País obrigatório"),
  state: z.string().min(1, "Estado obrigatório"),
  cnpj: z.string().optional(),
  type: z.enum(["houses", "apartments"], { required_error: "Selecione um tipo" }),
  commonAreas: z.boolean().optional(),
});

export { condoSchema };

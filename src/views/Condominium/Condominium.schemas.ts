import { z } from "zod";

const condoSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  address: z.string().min(1, "Endereço obrigatório"),
  number: z.preprocess((val) => Number(val), z.number({ invalid_type_error: "Número inválido" })),
  zip: z.string().min(8, "CEP obrigatório"),
  neighborhood: z.string().min(1, "Bairro obrigatório"),
  country: z.string().min(1, "País obrigatório"),
  state: z.string().min(1, "Estado obrigatório"),
  cnpj: z.string().optional(),
  type: z.enum(["Residencial", "Comercial", "Misto"], { required_error: "Selecione um tipo" }),
});


export { condoSchema };

import { z } from "zod";
import { condoSchema } from "./Condominium.schemas";

type CondoFormData = z.infer<typeof condoSchema>;

export type { CondoFormData };

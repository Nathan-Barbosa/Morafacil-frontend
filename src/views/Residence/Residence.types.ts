import { z } from "zod";
import { residenceSchema } from "./Residence.schemas";

type ResidenceFormData = z.infer<typeof residenceSchema>;

export type { ResidenceFormData };

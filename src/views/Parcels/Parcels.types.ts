import { z } from "zod";
import { parcelsSchema } from "./Parcels.schemas";

type ParcelsFormData = z.infer<typeof parcelsSchema>;

export type { ParcelsFormData };

import { z } from "zod";
import { finesFormSchema } from "./fines.schemas";

type FinesFormData = z.infer<typeof finesFormSchema>;

export type { FinesFormData };

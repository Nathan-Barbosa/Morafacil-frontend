import { z } from "zod";
import { finesFormSchema } from "./fines.schemas";

export const FineStatus: Record<number, string> = {
  0: "Pendente",
  1: "Pago",
  2: "Cancelado",
};

export const FineStatusNumbered: Record<string, number> = {
  Pendente: 0,
  Pago: 1,
  Cancelado: 2,
};

type FinesFormData = z.infer<typeof finesFormSchema>;

export type { FinesFormData };

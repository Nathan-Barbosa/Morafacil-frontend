import { z } from "zod";
import { registerSchema } from "./Register.schemas";

type RegisterFormData = z.infer<typeof registerSchema>;

export type { RegisterFormData };

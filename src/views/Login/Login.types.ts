import { z } from "zod";
import { loginSchema } from "./Login.schemas";

type LoginFormData = z.infer<typeof loginSchema>;

export type { LoginFormData };

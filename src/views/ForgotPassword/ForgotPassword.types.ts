import { z } from "zod";
import { forgotPasswordSchema } from "./ForgotPassword.schemas";

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export type { ForgotPasswordFormData };

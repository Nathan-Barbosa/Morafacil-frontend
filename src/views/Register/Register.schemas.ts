import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().nonempty('Nome é obrigatório').min(3),
  email: z.string().email('Email inválido'),
  phoneNumber: z.preprocess(
    (val) => (typeof val === 'string' ? val.replace(/\D/g, '') : val),
    z.string().min(10).max(11),
  ),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
});

export { registerSchema };

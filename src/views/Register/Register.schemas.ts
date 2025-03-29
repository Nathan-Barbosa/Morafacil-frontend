import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z.string().nonempty('Nome é obrigatório').min(3, 'Nome deve ter no mínimo 3 caracteres'),
    email: z.string().email('Email inválido'),
    cpf: z.string().regex(/^\d{11}$/, 'CPF deve conter 11 dígitos numéricos'),
    birth_date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Data de nascimento deve estar no formato YYYY-MM-DD'),
    phone_number: z.preprocess(
      (val) => (typeof val === 'string' ? val.replace(/\D/g, '') : val),
      z.string().min(10, 'Número de telefone inválido').max(11, 'Número de telefone inválido'),
    ),
    password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
    confirm_password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'As senhas não conferem',
    path: ['confirm_password'],
  });

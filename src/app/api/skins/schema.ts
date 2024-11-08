import { z } from 'zod';

export const itemSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  category: z.string().min(1, 'Categoria é obrigatória'),
  price: z.coerce.number().positive('Preço deve ser positivo'),
  float: z.string().optional().default('0.0'),
  image: z.string().optional(),
});

export const searchParamsSchema = z.object({
  name: z.string().optional(),
  price: z.coerce.number().positive('Preço deve ser positivo').optional(),
  category: z.string().optional(),
  float: z.string().optional(),
  orderBy: z.string().optional().default('createdAt'),
  order: z.string().optional().default('desc')
})

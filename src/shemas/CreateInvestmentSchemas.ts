import { z } from 'zod';

export const createInvestmentSchema = z.object({
  initialValue: z.string().transform((value) => Number(value)),
  incrementValue: z.string().transform((value) => Number(value)),
  years: z.string().transform((value) => Number(value)),
  interestRate: z.string().transform((value) => Number(value) / 100)
});

export type CreateInvestmentSchema = z.infer<typeof createInvestmentSchema>;

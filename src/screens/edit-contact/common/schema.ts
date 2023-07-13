import { z } from 'zod';

export const editContactValidation = z.object({
  firstName: z.string().min(1, 'make sure first name is valid'),
  lastName: z.string().min(1, 'make sure last name is valid'),
  age: z.coerce.number().gt(0, 'make sure age is valid'),
  photo: z
    .string()
    .url('photo must be valid url')
    .min(1, 'photo must be valid url'),
});

export type EditContactSchema = z.infer<typeof editContactValidation>;

import { z } from 'zod';

export const contactValidation = z.object({
  firstName: z
    .string({ required_error: 'first name is required' })
    .min(1, 'make sure first name is valid'),
  lastName: z
    .string({ required_error: 'last name is required' })
    .min(1, 'make sure last name is valid'),
  age: z.coerce
    .number({ invalid_type_error: 'make sure age is valid' })
    .gt(0, 'make sure age is valid'),
  photo: z
    .string({ required_error: 'photo is required' })
    .url('photo must be valid url'),
});

export type ContactValidationSchema = z.infer<typeof contactValidation>;

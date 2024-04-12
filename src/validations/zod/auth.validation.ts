import { z } from 'zod';

const toLower = (arg: string) => arg.toLowerCase();

export const signinSchemaDto = z
  .object({
    email: z.string().transform(toLower),
    password: z.string(),
  })
  .required();

export type SigninDto = z.infer<typeof signinSchemaDto>;

export const signupSchemaDto = z
  .object({
    name: z.string().min(1, 'Name must have length 1 character!'),
    email: z.string().email('Email invalid!').transform(toLower),
    password: z.string().min(8, 'Password must have length 8 character!'),
  })
  .required();

export type SignupDto = z.infer<typeof signupSchemaDto>;

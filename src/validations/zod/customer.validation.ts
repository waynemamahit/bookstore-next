import { z } from 'zod';

export const customerParamSchema = z.object({
  id: z
    .string({
      required_error: 'ID required!',
    })
    .transform((arg: string) => (!Number(arg) ? 0 : Number(arg))),
});

export type CustomerParam = z.infer<typeof customerParamSchema>;

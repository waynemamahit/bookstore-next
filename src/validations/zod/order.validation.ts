import { z } from 'zod';

export const orderParamSchema = z.object({
  id: z
    .string({
      required_error: 'ID required!',
    })
    .transform((arg: string) => (!Number(arg) ? 0 : Number(arg))),
});

export type OrderParam = z.infer<typeof orderParamSchema>;

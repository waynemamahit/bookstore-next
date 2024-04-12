import { z } from 'zod';

export const getBookQuerySchema = z.object({
  keyword: z.string().optional().default(''),
});

export type GetBookQueryParam = z.infer<typeof getBookQuerySchema>;

export const bookDtoSchema = z
  .object({
    title: z.string().min(1),
    writer: z.string().min(1),
    cover_image: z.string().min(1),
    price: z.number().min(1),
    tags: z.array(z.string()),
  })
  .required();

export type BookDto = z.infer<typeof bookDtoSchema>;

export const bookParamSchema = z.object({
  id: z
    .string({
      required_error: 'ID required!',
    })
    .transform((arg: string) => (!Number(arg) ? 0 : Number(arg))),
});

export type BookParam = z.infer<typeof bookParamSchema>;

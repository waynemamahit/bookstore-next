import { Context, Next } from 'hono';
import { ZodError } from 'zod';
import { DtoItem } from '../../interfaces/Base';
import { APIResponse } from '../../models/Base';

export const validate =
  (...dtos: DtoItem[]) =>
  async (c: Context, next: Next) => {
    try {
      for (const { schema, type } of dtos) {
        let payload = null;
        switch (type) {
          case 'query':
            payload = c.req.query();
            break;
          case 'param':
            payload = c.req.param();
            break;
          default:
            payload = await c.req.json();
            break;
        }
        c.set('dto-' + type, await schema.parseAsync(payload));
      }
      await next();
    } catch (error) {
      return c.json(
        new APIResponse(
          (error as ZodError).errors
            .map(
              (errItem: { message: string; path: (string | number)[] }) =>
                `${errItem.message} ${errItem.path
                  .map((pathItem) => pathItem.toString().split('_').join(' '))
                  .join(', ')}`
            )
            .join('\n'),
          400
        ),
        400
      );
    }
  };

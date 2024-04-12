import { ZodObject } from 'zod';

export interface DtoItem {
  schema: ZodObject<any>;
  type: 'json' | 'query' | 'param';
}

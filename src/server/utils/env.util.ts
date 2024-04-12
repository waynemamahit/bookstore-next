import { Context } from 'hono';
import { env as honoEnv } from 'hono/adapter';

export type Env = {
  JWT_SECRET: string;
};

export const env = (c?: Context) => () => honoEnv<Env>(c as Context);

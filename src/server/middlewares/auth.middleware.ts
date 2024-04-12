import { compareSync } from 'bcrypt';
import { Context, Next } from 'hono';
import { verify } from 'hono/jwt';
import { GetUser } from '../../interfaces/Auth';
import { APIResponse } from '../../models/Base';
import { OrderParam } from '../../validations/zod/order.validation';
import AuthRepository from '../repositories/auth.repository';
import OrderRepository from '../repositories/order.repository';
import { get } from '../utils/cookie.util';
import { env } from '../utils/env.util';

export const userAuth =
  (role_ids: number[] = []) =>
  async (c: Context, next: Next) => {
    try {
      const repo = new AuthRepository();
      const user = (await verify(
        c.req.header('Authorization')?.split(' ')[1] ?? '',
        env(c)().JWT_SECRET
      )) as GetUser & { userKey: string };
      const userKey = get(c)('userKey');
      if (typeof userKey === 'undefined') throw new Error();
      if (!compareSync(userKey, user.userKey)) throw new Error();
      const accessToken = await repo.getToken(user.id, userKey);
      if (accessToken.data === null) throw new Error();

      // Check user role auth
      if (role_ids.length > 0) {
        const roles = await repo.getRoles(role_ids);
        if (roles.data === null || !role_ids.includes(user.id))
          return c.json(new APIResponse('Forbidden access.', 403), 403);
      }

      c.set('userAuth', user);
      await next();
    } catch {
      return c.json(new APIResponse('Unauthorized.', 401), 401);
    }
  };

export const orderAuth = async (c: Context, next: Next) => {
  try {
    const repo = new OrderRepository();
    const dto = c.get('dto-param') as OrderParam;
    const user = c.get('userAuth') as GetUser;
    const order = await repo.getOrderById(dto.id);
    if (order.data === null || order.data?.customer_id !== user.customer?.id)
      throw new Error();
    await next();
  } catch (error) {
    return c.json(new APIResponse('Forbidden access.', 403), 403);
  }
};

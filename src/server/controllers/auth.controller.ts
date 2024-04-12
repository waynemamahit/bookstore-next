import { User } from '@prisma/client';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { Context } from 'hono';
import { StatusCode } from 'hono/utils/http-status';
import { AuthResponse, GetUser } from '../../interfaces/Auth';
import { APIResponse, BaseResult } from '../../models/Base';
import { SigninDto, SignupDto } from '../../validations/zod/auth.validation';
import AuthService from '../services/auth.service';
import { set } from '../utils/cookie.util';
import { env } from '../utils/env.util';

export default class AuthController {
  private service = new AuthService();

  async signin(c: Context) {
    const { email, password }: SigninDto = c.get('dto-json');
    const resp = new APIResponse<AuthResponse>('Sign in successfully!');

    try {
      const user = await this.service.getUser(email.toLowerCase());
      if (
        !compareSync(password, user.data?.password ?? '') ||
        (user.data?.role.name === 'customer' && !user.data?.customer?.is_active)
      )
        throw new BaseResult<null>(null, {
          code: 401,
          message: 'Unauthorized!',
        });

      const data = {
        ...user.data,
        password: undefined,
      } as GetUser;

      const token = await this.service.createToken(env(c), set(c), data);

      resp.data = {
        user: data,
        token: token.data,
      };
    } catch (error) {
      resp.code = 401;
      resp.message = '';
      resp.errors =
        (error as BaseResult<User | string>)?.error?.message ?? 'Unauthorized!';
    }

    return c.json(resp, resp.code as StatusCode);
  }

  async signup(c: Context) {
    const dto: SignupDto = c.get('dto-json');
    const resp = new APIResponse<AuthResponse>('Sign up successfully!', 201);

    try {
      dto.password = hashSync(dto.password, genSaltSync(10));
      dto.email = dto.email.toLowerCase();
      const newUser = await this.service.createUser(dto, 2);

      const user = {
        ...newUser.data,
        password: undefined,
      } as GetUser;

      const token = await this.service.createToken(env(c), set(c), user);

      resp.data = {
        user,
        token: token.data,
      };
    } catch (error) {
      resp.code = 409;
      resp.message = '';
      resp.errors =
        (error as BaseResult<GetUser | string>)?.error?.message ??
        'Failed to create user!';
    }

    return c.json(resp, resp.code as StatusCode);
  }

  async verify(c: Context) {
    return c.json(new APIResponse('Verified!', 200, c.get('userAuth')), 200);
  }

  async logout(c: Context) {
    const resp = new APIResponse<GetUser>('Logout successfully!', 200);
    try {
      const user: GetUser = c.get('userAuth');
      await this.service.deleteToken(user.id);
      set(c)({
        key: 'userKey',
        value: '',
        expires: new Date(),
      });
      resp.data = user;
    } catch (error) {
      resp.code = 409;
      resp.message = '';
      resp.errors =
        (error as BaseResult<GetUser>)?.error?.message ?? 'Failed to logout!';
    }
    return c.json(resp, 200);
  }
}

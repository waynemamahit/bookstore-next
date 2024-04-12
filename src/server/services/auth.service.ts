import { genSaltSync, hashSync } from 'bcrypt';
import { sign } from 'hono/jwt';
import { GetUser } from '../../interfaces/Auth';
import { GetCustomer } from '../../interfaces/Customer';
import { BaseResult } from '../../models/Base';
import { SetCookieProps } from '../../models/Cookie';
import { SignupDto } from '../../validations/zod/auth.validation';
import AuthRepository from '../repositories/auth.repository';
import CustomerRepository from '../repositories/customer.repository';
import { Env } from '../utils/env.util';
import { randomStr } from '../utils/string.util';
import BaseService from './base.service';

export default class AuthService extends BaseService {
  private repo = new AuthRepository();
  private customerRepo = new CustomerRepository();

  getUser = (email: string) => this.repo.getUser(email);

  async createToken(
    getEnv: () => Env,
    setCookie: (props: SetCookieProps) => void,
    user: GetUser
  ) {
    const res = new BaseResult<string>();
    try {
      const userKey = randomStr(64);
      const token = await sign(
        {
          ...user,
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
          userKey: hashSync(userKey, genSaltSync(12)),
        },
        getEnv().JWT_SECRET
      );
      await this.repo.createToken(user.id, userKey);
      setCookie({
        ...new SetCookieProps(),
        key: 'userKey',
        value: userKey,
      });
      res.data = token;
    } catch (error) {
      res.error = {
        code: 401,
        message: 'Failed create token!',
      };
      throw res;
    }
    return res;
  }

  createUser = async (data: SignupDto, role_id: number) => {
    const res = await this.repo.createUser({
      ...data,
      role_id,
    });
    this.checkDBError<GetUser>(res);
    const customer = await this.customerRepo.createCustomer(
      res.data?.id ?? 0 as number
    );
    this.checkDBError<GetCustomer>(customer);
    res.data = {
      ...res.data,
      customer: customer.data,
    } as GetUser | null;
    return res;
  };

  deleteToken = (user_id: number) => this.repo.deleteToken(user_id);
}

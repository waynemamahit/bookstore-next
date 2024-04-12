import { Context, Hono } from 'hono';
import {
  signinSchemaDto,
  signupSchemaDto,
} from '../../validations/zod/auth.validation';
import AuthController from '../controllers/auth.controller';
import { userAuth } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/pipe.middleware';

const controller = new AuthController();
const authRoute = new Hono()
  .post(
    '/signin',
    validate({ schema: signinSchemaDto, type: 'json' }),
    (c: Context) => controller.signin(c)
  )
  .post(
    '/signup',
    validate({ schema: signupSchemaDto, type: 'json' }),
    (c: Context) => controller.signup(c)
  )
  .get('/verify', userAuth(), (c: Context) => controller.verify(c))
  .get('/logout', userAuth(), (c: Context) => controller.logout(c));

export default authRoute;

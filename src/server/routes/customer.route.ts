import { Context, Hono } from 'hono';
import { customerParamSchema } from '../../validations/zod/customer.validation';
import CustomerController from '../controllers/customer.controller';
import { userAuth } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/pipe.middleware';

const controller = new CustomerController();
const customerRoute = new Hono()
  .use(userAuth([1]))
  .get('/', (c: Context) => controller.getCustomer(c))
  .delete(
    '/:id',
    validate({ schema: customerParamSchema, type: 'param' }),
    (c: Context) => controller.deleteCustomer(c)
  );

export default customerRoute;

import { Context, Hono } from 'hono';
import {
  orderParamSchema
} from '../../validations/zod/order.validation';
import OrderController from '../controllers/order.controller';
import { orderAuth, userAuth } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/pipe.middleware';

const controller = new OrderController();
const orderRoute = new Hono()
  .use(userAuth())
  .get('/', (c: Context) => controller.getOrder(c))
  .get(
    '/:id/item',
    validate({ schema: orderParamSchema, type: 'param' }),
    orderAuth,
    (c: Context) => controller.getOrderItem(c)
  )
  .delete(
    '/:id',
    validate({ schema: orderParamSchema, type: 'param' }),
    orderAuth,
    (c: Context) => controller.deleteOrder(c)
  );

export default orderRoute;

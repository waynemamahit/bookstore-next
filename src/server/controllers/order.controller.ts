import { Context } from 'hono';
import { StatusCode } from 'hono/utils/http-status';
import { GetUser } from '../../interfaces/Auth';
import { GetOrder, GetOrderItem } from '../../interfaces/Order';
import { APIResponse } from '../../models/Base';
import { OrderParam } from '../../validations/zod/order.validation';
import OrderService from '../services/order.service';

export default class OrderController {
  private service = new OrderService();

  async getOrder(c: Context) {
    const resp = new APIResponse<GetOrder[]>('Success', 200);
    const res = await this.service.getOrder(
      (c.get('userAuth') as GetUser)?.customer?.id
    );
    resp.data = res.data;

    if (res.data === null) {
      resp.code = 404;
      resp.message = 'Failed';
      resp.errors = res.error?.message ?? 'Failed to get order!';
    }

    return c.json(resp, resp.code as StatusCode);
  }

  async getOrderItem(c: Context) {
    const resp = new APIResponse<GetOrderItem[]>('Success', 200);
    const res = await this.service.getOrderItem(
      (c.get('dto-param') as OrderParam).id
    );
    resp.data = res.data;

    if (res.data === null) {
      resp.code = 404;
      resp.message = 'Failed';
      resp.errors = res.error?.message ?? 'Failed to get order items!';
    }

    return c.json(resp, resp.code as StatusCode);
  }

  async deleteOrder(c: Context) {
    const resp = new APIResponse<GetOrder>('Order has been deleted!', 200);
    const res = await this.service.deleteOrder(
      (c.get('dto-param') as OrderParam).id
    );
    resp.data = res.data;

    if (res.data === null) {
      resp.code = 409;
      resp.message = 'Failed';
      resp.errors = res.error?.message ?? 'Failed to delete order!';
    }

    return c.json(resp, resp.code as StatusCode);
  }
}

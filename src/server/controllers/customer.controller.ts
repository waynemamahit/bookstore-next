import { Context } from 'hono';
import { StatusCode } from 'hono/utils/http-status';
import { GetCustomer } from '../../interfaces/Customer';
import { APIResponse } from '../../models/Base';
import { CustomerParam } from '../../validations/zod/customer.validation';
import CustomerService from '../services/customer.service';

export default class CustomerController {
  private service = new CustomerService();

  async getCustomer(c: Context) {
    const resp = new APIResponse<GetCustomer[]>('Success', 200);

    const res = await this.service.getCustomer();
    resp.data = res.data;
    if (res.data === null) {
      resp.code = 404;
      resp.message = '';
      resp.errors = res.error?.message ?? 'Failed to get customer list!';
    }

    return c.json(resp, resp.code as StatusCode);
  }

  async deleteCustomer(c: Context) {
    const resp = new APIResponse<GetCustomer>(
      'Successfully inactive customer!',
      200
    );

    const res = await this.service.deleteCustomer(
      (c.get('dto-param') as CustomerParam)?.id
    );
    resp.data = res.data;
    if (res.data === null) {
      resp.code = 404;
      resp.message = 'Failed';
      resp.errors = res.error?.message ?? 'Failed to inactive customer!';
    }

    return c.json(resp, resp.code as StatusCode);
  }
}

import { GetCustomer } from '../../../interfaces/Customer';
import BaseSpec from './base.spec-model';

export default class CustomerSpec extends BaseSpec {
  data: GetCustomer | null = null;
  headers: object = {};

  getCustomer = () =>
    this.request('/', 'GET', {
      headers: this.headers,
    });

  deleteCustomer = (id = 0) =>
    this.request('/' + id, 'DELETE', {
      headers: this.headers,
    });
}

import { GetOrder, GetOrderItem } from '../../interfaces/Order';
import OrderRepository from '../repositories/order.repository';
import BaseService from './base.service';

export default class OrderService extends BaseService {
  private repo = new OrderRepository();

  async getOrder(customer_id?: number) {
    const res = await this.repo.getOrder(customer_id);
    this.checkDBError<GetOrder[]>(res);
    return res;
  }

  async getOrderItem(order_id?: number) {
    const res = await this.repo.getOrderItem(order_id);
    this.checkDBError<GetOrderItem[]>(res);
    return res;
  }

  async deleteOrder(id: number) {
    const res = await this.repo.deleteOrder(id);
    this.checkDBError<GetOrder>(res);
    return res;
  }
}

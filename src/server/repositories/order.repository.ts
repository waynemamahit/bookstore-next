import { GetOrder, GetOrderItem } from '../../interfaces/Order';
import { BaseRepository } from './base.repository';

export default class OrderRepository extends BaseRepository {
  getOrder = (customer_id?: number) =>
    this.query<GetOrder[]>(() =>
      this.prisma.order.findMany({
        where: {
          customer_id,
        },
        include: {
          customer: true,
        },
      })
    );

  getOrderById = (id: number) =>
    this.query<GetOrder>(() =>
      this.prisma.order.findFirst({
        where: {
          id,
        },
        include: {
          customer: true,
        },
      })
    );

  getOrderItem = (order_id = 0) =>
    this.query<GetOrderItem[]>(() =>
      this.prisma.orderItem.findMany({
        where: {
          order_id,
        },
        include: {
          book: true,
        },
      })
    );

  deleteOrder = (id: number) =>
    this.query<GetOrder>(() =>
      this.prisma.order.delete({
        where: {
          id,
        },
        include: {
          customer: true,
        },
      })
    );
}

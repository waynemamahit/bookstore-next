import { GetCustomer } from '../../interfaces/Customer';
import { BaseRepository } from './base.repository';

export default class CustomerRepository extends BaseRepository {
  createCustomer = (user_id: number) =>
    this.query<GetCustomer>(() =>
      this.prisma.customer.create({
        data: {
          user_id,
        },
      })
    );

  getCustomer = () =>
    this.query<GetCustomer[]>(() => this.prisma.customer.findMany());

  showCustomer = (id: number) =>
    this.query<GetCustomer>(() =>
      this.prisma.customer.findFirst({
        where: {
          id,
        },
        include: {
          user: true,
        },
      })
    );

  deleteCustomer = (id: number) =>
    this.query<GetCustomer>(() =>
      this.prisma.customer.update({
        where: { id },
        data: {
          is_active: false,
        },
      })
    );
}

import CustomerRepository from '../repositories/customer.repository';
import BaseService from './base.service';

export default class CustomerService extends BaseService {
  private repo = new CustomerRepository();

  getCustomer = () => this.repo.getCustomer();

  showCustomer = (id: number) => this.repo.showCustomer(id);

  deleteCustomer = (id: number) => this.repo.deleteCustomer(id);
}

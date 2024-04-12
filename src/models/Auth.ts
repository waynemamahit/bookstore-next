import { GetRole, GetUser } from '../interfaces/Auth';
import { GetCustomer } from '../interfaces/Customer';

export class AuthRole implements GetRole {
  id = 0;
  name = '';
}

export class AuthUser implements GetUser {
  id = 0;
  name = '';
  email = '';
  password: string | undefined;
  role = new AuthRole();
  customer: GetCustomer | null = null;
}

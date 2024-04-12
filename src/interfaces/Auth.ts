import { GetCustomer } from './Customer';

export interface GetRole {
  id: number;
  name: string;
}

export interface GetUser {
  id: number;
  name: string;
  email: string;
  password?: string;
  role: GetRole;
  customer: GetCustomer | null;
}

export interface AuthResponse {
  user: GetUser;
  token: string | null;
}

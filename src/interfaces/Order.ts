import { GetBook } from "./Book";
import { GetCustomer } from "./Customer";

export interface GetOrder {
  id: number;
  total: number;
  customer_id: number;
  customer: GetCustomer | null;
  created_at: Date;
  updated_at: Date;
}

export interface GetOrderItem {
  id: number;
  price: number;
  quantity: number;
  order_id: number;
  book_id: number;
  book: GetBook | null;
}

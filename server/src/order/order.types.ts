import { HttpReq } from '../api.types';

export interface Order {
  userId: string;
  products: Products[];
  status: 'Active' | 'Completed';
  subTotal: number;
  tax: number;
  total: number;
  currency: {
    code: 'Dollar' | 'Euro' | 'Lempira';
    symbol: '$' | '€' | 'L';
  };
  rating?: number;
}

export interface Products {
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export type OrderPost = Order;
export type OrderPut = Order;

export interface OrderHttpPostReq extends Omit<HttpReq, 'body'> {
  body: Order;
}

export interface OrderHttpGetReq extends Omit<HttpReq, 'body'> {
  body: Order;
  query: {
    userId: string;
  };
}

export interface OrderHttpPutReq extends Omit<HttpReq, 'body'> {
  body: Order;
  params: {
    orderId: string;
  };
}

export interface OrderHttpDelReq extends Omit<HttpReq, 'body'> {
  params: {
    orderId: string;
  };
}

export interface OrderQueryParams {
  userId: string;
}

export enum OrderSuccessMessages {
  CREATED = 'Order created successfully',
  READ = 'Orders listed successfully',
  UPDATED = 'Order updated successfully',
  DELETED = 'Order deleted successfully',
}

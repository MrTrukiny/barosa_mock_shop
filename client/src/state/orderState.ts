import { atom } from 'recoil';
import { Product } from './productState';

export enum OrderStatus {
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
}

export interface Order {
  id: string;
  userId: string;
  products: Product[];
  subTotal: number;
  tax: number;
  total: number;
  currency: {
    symbol: '$' | '€' | 'L';
    code: 'Dollar' | 'Euro' | 'Lempira';
  };
  rating?: number;
  status: OrderStatus;
}

export const orderListAtom = atom<Order[]>({
  key: 'orderList',
  default: [],
});

import { atom, useRecoilState } from 'recoil';
import { Product } from './productState';

export enum OrderStatus {
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
}

export interface OrderCurrency {
  code: 'USD' | 'EUR' | 'HNL';
  symbol: '$' | '€' | 'L';
}

export interface Order {
  id?: string;
  userId: string;
  products: Product[];
  subTotal: number;
  tax: number;
  total: number;
  createdAt?: string;
  updatedAt?: string;
  currency: OrderCurrency;
  rating?: number;
  status: OrderStatus;
}

export const orderListAtom = atom<Order[]>({
  key: 'orderList',
  default: [],
});

export const editingOrderAtom = atom<Order | null>({
  key: 'editingOrder',
  default: null,
});

export const useOrderState = () => {
  const [orderList, setOrderList] = useRecoilState(orderListAtom);
  const [editingOrder, setEditingOrder] = useRecoilState(editingOrderAtom);

  return {
    orderList,
    setOrderList,
    editingOrder,
    setEditingOrder,
  };
};

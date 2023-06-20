import { OrderMongoose } from './order.model';
import { OrderPost, OrderPut, OrderQueryParams } from './order.types';

export interface OrderActionsParams {
  saveOrder: (orderData: OrderPost) => Promise<OrderMongoose>;
  findOrders: (queryParams: OrderQueryParams) => Promise<OrderMongoose[]>;
  updateOneOrder: (orderId: string, orderData: OrderPost) => Promise<OrderMongoose>;
  deleteOneOrder: (orderId: string) => Promise<OrderMongoose>;
}

export interface OrderActions {
  createOrder: ({ ...orderData }: OrderPost) => Promise<OrderMongoose>;
  readOrders: ({ ...queryParams }: OrderQueryParams) => Promise<OrderMongoose[]>;
  updateOrder: (orderId: string, { ...orderData }: OrderPut) => Promise<OrderMongoose>;
  removeOrder: (orderId: string) => Promise<OrderMongoose>;
}

const makeOrderActions = ({ saveOrder, findOrders, updateOneOrder, deleteOneOrder }: OrderActionsParams) => {
  return Object.freeze({
    createOrder,
    readOrders,
    updateOrder,
    deleteOrder,
  });

  async function createOrder({ ...orderData }: OrderPost): Promise<OrderMongoose> {
    return await saveOrder({
      ...orderData,
    });
  }

  async function readOrders({ userId }: OrderQueryParams): Promise<OrderMongoose[]> {
    return await findOrders({ userId });
  }

  async function updateOrder(orderId: string, { ...orderData }: OrderPut): Promise<OrderMongoose> {
    return await updateOneOrder(orderId, { ...orderData } as OrderPut);
  }

  async function deleteOrder(orderId: string): Promise<OrderMongoose> {
    return await deleteOneOrder(orderId);
  }
};

export default makeOrderActions;

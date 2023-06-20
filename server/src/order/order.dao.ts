import { Model } from 'mongoose';
import { OrderPost, OrderPut, OrderQueryParams } from './order.types';
import { OrderMongoose } from './order.model';

export interface OrderDao {
  save: (orderData: OrderPost) => Promise<OrderMongoose>;
  findAll: (queryParams: OrderQueryParams) => Promise<OrderMongoose[]>;
  updateOne: (orderId: string, orderData: OrderPut) => Promise<OrderMongoose>;
  deleteOne: (orderId: string) => Promise<OrderMongoose>;
}

const makeOrderDao = ({ OrderModel }: { OrderModel: Model<OrderMongoose> }): OrderDao => {
  return Object.freeze({
    save,
    findAll,
    updateOne,
    deleteOne,
  });

  async function save({ ...orderData }: OrderPost): Promise<OrderMongoose> {
    const order = new OrderModel(orderData);
    return (await order.save()).toObject();
  }

  async function findAll({ userId }: OrderQueryParams): Promise<OrderMongoose[]> {
    const orders = await OrderModel.find({ userId });
    return orders.map((order) => order.toObject());
  }

  async function updateOne(orderId: string, { ...orderData }: OrderPost): Promise<OrderMongoose> {
    const order = await OrderModel.findOneAndReplace({ _id: orderId }, orderData, { new: true });
    return order?.toObject() as OrderMongoose;
  }

  async function deleteOne(orderId: string): Promise<OrderMongoose> {
    const order = await OrderModel.findOneAndDelete({ _id: orderId });
    return order?.toObject() as OrderMongoose;
  }
};

export default makeOrderDao;

import { Schema, Types, model } from 'mongoose';
import { Order } from './order.types';

export interface OrderMongoose extends Omit<Order, 'userId'> {
  id?: Types.ObjectId;
  userId?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const orderSchema = new Schema<OrderMongoose>(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: [true, 'Field "userId" is required'],
    },
    products: {
      type: [
        {
          id: {
            type: Number,
            required: [true, 'Field "id" is required'],
          },
          title: {
            type: String,
            required: [true, 'Field "title" is required'],
          },
          price: {
            type: Number,
            required: [true, 'Field "price" is required'],
          },
          quantity: {
            type: Number,
            required: [true, 'Field "quantity" is required'],
          },
          image: {
            type: String,
            required: [true, 'Field "image" is required'],
          },
        },
      ],
      required: [true, 'Field "products" is required'],
    },
    subTotal: {
      type: Number,
      required: [true, 'Field "subTotal" is required'],
    },
    tax: {
      type: Number,
      required: [true, 'Field "tax" is required'],
    },
    total: {
      type: Number,
      required: [true, 'Field "total" is required'],
    },
    currency: {
      code: {
        type: String,
        enum: ['USD', 'EUR', 'HNL'],
        default: 'USD',
      },
      symbol: {
        type: String,
        enum: ['$', '€', 'L'],
        default: '$',
      },
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    status: {
      type: String,
      enum: ['Active', 'Completed'],
      default: 'Active',
    },
  },
  { timestamps: true },
);

orderSchema.set('toObject', {
  virtuals: true,
  getters: true,
  versionKey: false,
  useProjection: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform: (_doc: any, ret: any) => {
    delete ret._id;
  },
});

const Order = model<OrderMongoose>('Order', orderSchema);

export default Order;

import { Schema, Types, model } from 'mongoose';
import { User } from './auth.types';
import { AuthRegister } from './auth.types';

export interface UserMongoose extends Omit<User, 'password'> {
  id?: Types.ObjectId;
  // Make password optional because it is not returned in the response
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<UserMongoose>(
  {
    firstName: {
      type: String,
      required: [true, 'Field "firstName" is required'],
    },
    lastName: String,
    email: {
      type: String,
      required: [true, 'Field "email" is required'],
      index: { unique: true, sparse: true },
    },
    password: {
      type: String,
      required: [true, 'Field "password" is required'],
      select: false,
    },
  },
  { timestamps: true },
);

userSchema.set('toObject', {
  virtuals: true,
  getters: true,
  versionKey: false,
  useProjection: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform: (_doc: any, ret: any) => {
    delete ret._id;
  },
});

const User = model<UserMongoose>('User', userSchema);

export default User;

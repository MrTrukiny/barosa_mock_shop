import { Model } from 'mongoose';
import { UserMongoose } from './user.model';
import { AuthRegister } from './auth.types';

export interface AuthDao {
  save: (userData: AuthRegister) => Promise<UserMongoose>;
  findOne: (userData: { [key: string]: unknown }) => Promise<UserMongoose | null>;
}

const makeAuthDao = ({ AuthModel }: { AuthModel: Model<UserMongoose> }): AuthDao => {
  return Object.freeze({
    save,
    findOne,
  });

  async function save({ ...authData }: AuthRegister): Promise<UserMongoose> {
    const auth = new AuthModel(authData);
    return (await auth.save()).toObject();
  }

  async function findOne({
    select,
    ...userData
  }: {
    [key: string]: unknown;
    select?: object;
  }): Promise<UserMongoose | null> {
    const user = await AuthModel.findOne({ ...userData }, { ...select });
    return user?.toObject() || null;
  }
};

export default makeAuthDao;

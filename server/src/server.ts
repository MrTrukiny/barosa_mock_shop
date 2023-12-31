import express from 'express';
import cors from 'cors';

/* Routes */
import authRouter from './auth/auth.routes';
import orderRouter from './order/order.routes';

/* Middlewares */
import responseHandlerMiddleware from './shared/middlewares/responseHandler.middleware';
import notFound404Middleware from './shared/middlewares/notFound.middleware';
import errorHandlerMiddleware from './shared/middlewares/errorHandler.middleware';

/* Database */
import connectToDb from './database/db';

class Server {
  public PORT = process.env.PORT || 3000;
  public API_V1_URL = '/api/v1';
  public server = express();
  public paths: { auth: string; order: string };

  constructor() {
    this.paths = {
      auth: `${this.API_V1_URL}/auth`,
      order: `${this.API_V1_URL}/orders`,
    };

    this.preMiddlewares();
    this.routes();
    this.postMiddlewares();
  }

  public async dbConnection() {
    await connectToDb(
      process.env.MONGO_DB_URI ||
        'mongodb+srv://MrTrukiny:DphQcLDObO7CkX5f@cluster0barosa.ipbe9rj.mongodb.net/barosa_db_dev',
    );
  }

  private preMiddlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  private routes() {
    this.server.use(this.paths.auth, authRouter);
    this.server.use(this.paths.order, orderRouter);
  }

  private postMiddlewares() {
    this.server.use(responseHandlerMiddleware);
    this.server.use(notFound404Middleware);
    this.server.use(errorHandlerMiddleware);
  }

  public listen() {
    this.server.listen(this.PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server listening on PORT: ${this.PORT}`);
    });
  }
}

export default Server;

import express from 'express';
import cors from 'cors';

/* Routes */
import authRouter from './auth/auth.routes';

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
  public paths: { auth: string };

  constructor() {
    this.paths = {
      auth: `${this.API_V1_URL}/auth`,
    };

    this.preMiddlewares();
    this.routes();
    this.postMiddlewares();
  }

  public async dbConnection() {
    await connectToDb(process.env.MONGODB_URI || 'mongodb://localhost:27017/barosa_db_dev');
  }

  private preMiddlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  private routes() {
    this.server.use(this.paths.auth, authRouter);
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

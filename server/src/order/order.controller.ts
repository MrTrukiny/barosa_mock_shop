import { HttpReq, ControllerResponse, StatusCode, ApiStatus } from '../api.types';
import { OrderActions } from './order.actions';
import {
  OrderHttpPostReq,
  OrderHttpDelReq,
  OrderHttpGetReq,
  OrderHttpPutReq,
  OrderPost,
  OrderPut,
  OrderQueryParams,
  OrderSuccessMessages,
} from './order.types';

const makeOrderController = ({ createOrder, readOrders, updateOrder, removeOrder }: OrderActions) => {
  return Object.freeze({
    postOrder,
    getOrder,
    putOrder,
    deleteOrder,
  });

  async function postOrder(httpRequest: HttpReq): Promise<ControllerResponse> {
    const { body } = httpRequest as OrderHttpPostReq;
    const order = await createOrder({ ...body } as OrderPost);

    return {
      response: {
        statusCode: StatusCode.CREATED,
        body: {
          status: ApiStatus.OK,
          message: OrderSuccessMessages.CREATED,
          data: { order },
        },
      },
    };
  }

  async function getOrder(httpRequest: HttpReq): Promise<ControllerResponse> {
    const { query } = httpRequest as OrderHttpGetReq;
    const orders = await readOrders({ ...query } as OrderQueryParams);

    return {
      response: {
        statusCode: StatusCode.OK,
        body: {
          status: ApiStatus.OK,
          message: OrderSuccessMessages.READ,
          data: { orders },
        },
      },
    };
  }

  async function putOrder(httpRequest: HttpReq): Promise<ControllerResponse> {
    const { params, body } = httpRequest as OrderHttpPutReq;
    const { orderId } = params;
    const order = await updateOrder(orderId, { ...body } as OrderPut);

    return {
      response: {
        statusCode: StatusCode.OK,
        body: {
          status: ApiStatus.OK,
          message: OrderSuccessMessages.UPDATED,
          data: { order },
        },
      },
    };
  }

  async function deleteOrder(httpRequest: HttpReq): Promise<ControllerResponse> {
    const { params } = httpRequest as unknown as OrderHttpDelReq;
    const { orderId } = params;

    const order = await removeOrder(orderId);

    return {
      response: {
        statusCode: StatusCode.OK,
        body: {
          status: ApiStatus.OK,
          message: OrderSuccessMessages.DELETED,
          data: { order },
        },
      },
    };
  }
};

export default makeOrderController;

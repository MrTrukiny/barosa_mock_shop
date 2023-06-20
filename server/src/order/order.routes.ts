import { Router } from 'express';
import adaptRequest from '../shared/utils/expressCallback.handler';
import { orderController } from '.';

const orderRouter = Router();

orderRouter.post('/', adaptRequest(orderController.postOrder));
orderRouter.get('/', adaptRequest(orderController.getOrder));
orderRouter.put('/:orderId', adaptRequest(orderController.putOrder));
orderRouter.delete('/:orderId', adaptRequest(orderController.deleteOrder));

export default orderRouter;

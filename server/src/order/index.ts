import makeOrderActions from './order.actions';
import makeOrderController from './order.controller';
import makeOrderDao from './order.dao';
import OrderModel from './order.model';

const orderDao = makeOrderDao({ OrderModel });

const orderActions = makeOrderActions({
  saveOrder: orderDao.save,
  findOrders: orderDao.findAll,
  updateOneOrder: orderDao.updateOne,
  deleteOneOrder: orderDao.deleteOne,
});

const orderController = makeOrderController({
  createOrder: orderActions.createOrder,
  readOrders: orderActions.readOrders,
  updateOrder: orderActions.updateOrder,
  removeOrder: orderActions.deleteOrder,
});

export { orderController };

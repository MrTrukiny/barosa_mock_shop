import { orderService } from '../services/order.service';
import { useAuthState } from '../state/authState';
import { useOrderState } from '../state/orderState';

const useFetchOrders = () => {
  const { userId } = useAuthState();
  const { setOrderList } = useOrderState();

  const fetchOrders = async () => {
    try {
      const orders = await orderService.getOrders(userId);
      setOrderList(orders);
    } catch (error) {
      console.error(error);
    }
  };

  return { fetchOrders };
};

export default useFetchOrders;

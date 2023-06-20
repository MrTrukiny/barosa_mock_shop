import axios from 'axios';
import { Order } from '../state/orderState';

const API_URL = 'http://localhost:3000/api/v1';

export const orderService = {
  createOrder: async (order: Order) => {
    try {
      const response = await axios.post(`${API_URL}/orders`, order);
      return response.data.order;
    } catch (error) {
      throw new Error('Failed to create order');
    }
  },

  getOrders: async (userId: string) => {
    try {
      const response = await axios.get(`${API_URL}/orders`, { params: { userId } });
      return response.data.data.orders;
    } catch (error) {
      throw new Error('Failed to get orders');
    }
  },

  updateOrder: async (orderId: string, order: Order) => {
    try {
      const response = await axios.put(`${API_URL}/orders/${orderId}`, order);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update order');
    }
  },

  deleteOrder: async (orderId: string) => {
    try {
      await axios.delete(`${API_URL}/orders/${orderId}`);
    } catch (error) {
      throw new Error('Failed to delete order');
    }
  },
};

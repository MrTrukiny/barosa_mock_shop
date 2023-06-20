import React, { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { orderService } from '../../services/order.service';
import { Order } from '../../state/orderState';
import OrderCard from './OrderCard';

interface AllOrdersProps {
  userId: string;
}

const AllOrders: React.FC<AllOrdersProps> = ({ userId }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await orderService.getOrders(userId);
        setOrders(orders);
      } catch (error) {
        // Handle error
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <Box>
      {orders.length > 0 ? (
        orders.map((order) => <OrderCard key={order.id} order={order} />)
      ) : (
        <Text>No orders found.</Text>
      )}
    </Box>
  );
};

export default AllOrders;

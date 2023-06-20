import React, { useEffect, useState, useRef } from 'react';
import { Box, Flex, Select, Text } from '@chakra-ui/react';
import { Order } from '../../state/orderState';
import OrderCard from './OrderCard';
import { useAuthState } from '../../state/authState';
import { useOrderState } from '../../state/orderState';
import useFetchOrders from '../../hooks/useFetchOrders';

const AllOrders: React.FC = () => {
  const { userId } = useAuthState();
  const { orderList } = useOrderState();
  const { fetchOrders } = useFetchOrders();
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const statusFilterRef = useRef<HTMLSelectElement>(null);
  const sortFilterRef = useRef<HTMLSelectElement>(null);

  const handleStatusFilter = (status: string) => {
    let filtered: Order[] = [];
    if (status === '') {
      filtered = orderList;
    } else {
      filtered = orderList.filter((order: Order) => order.status === status);
    }
    setFilteredOrders(filtered);
  };

  const handleSortFilter = (sortOrder: string) => {
    const sorted = [...filteredOrders];
    sorted.sort((a: Order, b: Order) => {
      if (sortOrder === 'asc') {
        return a.total - b.total;
      } else {
        return b.total - a.total;
      }
    });
    setFilteredOrders(sorted);
  };

  useEffect(() => {
    fetchOrders();
  }, [userId]);

  useEffect(() => {
    handleStatusFilter(statusFilterRef.current?.value || '');
  }, [orderList]);

  return (
    <Box>
      <Flex alignItems="center" mb={5} justifyContent="center">
        <Box mr={4}>
          <Text>Status:</Text>
          <Select ref={statusFilterRef} onChange={(e) => handleStatusFilter(e.target.value)}>
            <option value="">All</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </Select>
        </Box>
        <Box>
          <Text>Sort:</Text>
          <Select ref={sortFilterRef} onChange={(e) => handleSortFilter(e.target.value)}>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </Select>
        </Box>
      </Flex>
      {filteredOrders.length > 0 ? (
        filteredOrders.map((order) => <OrderCard key={order.id} order={order} />)
      ) : (
        <Text>No orders found.</Text>
      )}
    </Box>
  );
};

export default AllOrders;

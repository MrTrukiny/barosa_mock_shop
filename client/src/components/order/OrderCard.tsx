import React, { useState } from 'react';
import { Box, Flex, Text, Button, Table, Thead, Tbody, Tr, Th, Td, useToast, Select } from '@chakra-ui/react';
import { Order, OrderStatus, OrderCurrency } from '../../state/orderState';
import { useCartState } from '../../state/cartState';
import { useOrderState } from '../../state/orderState';
import { orderService } from '../../services/order.service';
import useFetchOrders from '../../hooks/useFetchOrders';
import { formatCurrency } from '../../utils/functions';

type OrderCardProps = {
  order: Order;
};

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  // State
  const { setCart, setCartQuantity } = useCartState();
  const { editingOrder, setEditingOrder } = useOrderState();
  const { fetchOrders } = useFetchOrders();
  const [rating, setRating] = useState<number>(order.rating || 5);
  const [orderCurrency, setOrderCurrency] = useState<OrderCurrency>(order.currency || {
    code: 'USD',
    symbol: '$',
  });

  // Hooks
  const toast = useToast();

  // Variables
  const { id, products, status, createdAt } = order;
  const isOrderActive = status === OrderStatus.ACTIVE;
  const isOrderCompleted = status === OrderStatus.COMPLETED;
  const isEditingOrder = editingOrder?.id === id;

  const handlePayClick = async () => {
    try {
      await orderService.updateOrder(id as string, { ...order, status: OrderStatus.COMPLETED });
      toast({
        title: 'Order paid',
        description: 'Your order has been paid successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      await fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = () => {
    setEditingOrder(order);
    setCart({ orderId: id as string, products });
    setCartQuantity(products.length);
  };

  const handleDeleteClick = async () => {
    try {
      await orderService.deleteOrder(id as string);
      toast({
        title: 'Order deleted',
        description: 'Your order has been deleted successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      await fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelClick = () => {
    // Handle cancel click
    setEditingOrder(null);
    setCart({ orderId: '', products: [] });
    setCartQuantity(0);
  };

  const handleRateOrder = async () => {
    try {
      await orderService.updateOrder(id as string, { ...order, rating });
      toast({
        title: 'Order rated',
        description: 'Your order has been rated successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      await fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCurrencyChange = async (code: string) => {
    let newSymbol = '$';
    if (code === 'EUR') newSymbol = '€';
    if (code === 'HNL') newSymbol = 'L';
      const newCurrency: OrderCurrency = {
        code: code as 'USD' | 'EUR' | 'HNL',
        symbol: newSymbol as '$' | '€' | 'L',
      };
      setOrderCurrency(newCurrency);
  };

  const calculateQuantitySum = () => {
    return products.reduce((acc, curr) => acc + curr.quantity, 0);
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="md" mb={4}>
      <Flex justifyContent="space-between" mb={2}>
        <Text fontWeight="bold">Order ID: {id}</Text>
        <Flex>
          <Text fontWeight="bold" mr={2}>
            Status:
          </Text>
          <Text>{status}</Text>
        </Flex>
        <Flex>
          <Text fontWeight="bold" mr={2}>
            Currency:
          </Text>
          <Select value={orderCurrency.code} disabled={!isEditingOrder} onChange={(e) => handleCurrencyChange(e.target.value)}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="HNL">HNL</option>
          </Select>
        </Flex>
        <Flex>
          <Text fontWeight="bold" mr={2}>
            Date:
          </Text>
          <Text>{createdAt?.split('T')[0]}</Text>
        </Flex>
      </Flex>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Quantity</Th>
            <Th>Price</Th>
            <Th>Tax</Th>
            <Th>Total</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map((product) => (
            <Tr key={product.id}>
              <Td>{product.title}</Td>
              <Td>{product.quantity}</Td>
              <Td>{formatCurrency(product.price, orderCurrency)}</Td>
              <Td>{formatCurrency(product.price * product.quantity * 0.15, orderCurrency)}</Td>
              <Td>{formatCurrency(product.price * product.quantity * 1.15, orderCurrency)}</Td>
            </Tr>
          ))}
          <Tr>
            <Td>
              {' '}
              {isOrderCompleted && (
                <Flex alignItems="center" width={300}>
                  <Button
                    colorScheme="yellow"
                    variant="solid"
                    ml={2}
                    onClick={handleRateOrder}
                    _hover={{ bg: '#6b46c1' }}
                    _active={{ bg: '#6b46c1' }}
                  >
                    Rate
                  </Button>
                  <Select value={rating || 5} onChange={(e) => setRating(Number(e.target.value))} width={'120px'}>
                    {[1, 2, 3, 4, 5].map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </Select>
                </Flex>
              )}
            </Td>
            <Td fontWeight="bold">{calculateQuantitySum()}</Td>
            <Td fontWeight="bold">{formatCurrency(order.subTotal, orderCurrency)}</Td>
            <Td fontWeight="bold">{formatCurrency(order.tax, orderCurrency)}</Td>
            <Td fontWeight="bold">{formatCurrency(order.total, orderCurrency)}</Td>
          </Tr>
        </Tbody>
      </Table>
      {!isOrderActive ? null : isEditingOrder ? (
        <Flex justifyContent="center" mt={4}>
          <Button colorScheme="green" variant="solid" mr={2} _hover={{ bg: '#243E36' }} _active={{ bg: '#243e36' }}>
            Save
          </Button>
          <Button
            colorScheme="red"
            variant="solid"
            mr={2}
            _hover={{ bg: '#243E36' }}
            _active={{ bg: '#243e36' }}
            onClick={handleCancelClick}
          >
            Cancel
          </Button>
        </Flex>
      ) : editingOrder?.id ? null : (
        <Flex justifyContent="center" mt={4}>
          <Button
            colorScheme="green"
            variant="solid"
            mr={2}
            onClick={handlePayClick}
            _hover={{ bg: '#243E36' }}
            _active={{ bg: '#243e36' }}
          >
            Pay
          </Button>
          <Button
            colorScheme="yellow"
            variant="solid"
            mr={2}
            onClick={handleEditClick}
            _hover={{ bg: '#e0eec6' }}
            _active={{ bg: '#c2a83e' }}
          >
            Edit
          </Button>
          <Button
            colorScheme="red"
            variant="solid"
            onClick={handleDeleteClick}
            _hover={{ bg: '#c2a83e' }}
            _active={{ bg: '#243e36' }}
          >
            Delete
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default OrderCard;

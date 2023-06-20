import React from 'react';
import { Box, Flex, Text, Button, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { Order, OrderStatus } from '../../state/orderState';

type OrderCardProps = {
  order: Order;
};

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const currencies = {
    Dollar: '$',
    Euro: '€',
    Lempira: 'L',
  };

  const { id, products, currency, status } = order;

  const isOrderActive = status === OrderStatus.ACTIVE;

  const handlePayClick = () => {
    // Handle pay click
  };

  const handleEditClick = () => {
    // Handle edit click
  };

  const handleDeleteClick = () => {
    // Handle delete click
  };

  const calculateFieldSum = (field: keyof (typeof products)[0]) => {
    return products.reduce((sum, product) => sum + product[field], 0);
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
          <Text>{currency}</Text>
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
              <Td>
                {currencies[currency]} {product.price.toFixed(2)}
              </Td>
              <Td>
                {currencies[currency]} {(product.price * product.quantity * 0.15).toFixed(2)}
              </Td>
              <Td>
                {currencies[currency]} {(product.price * product.quantity * 1.15).toFixed(2)}
              </Td>
            </Tr>
          ))}
          <Tr>
            <Td fontWeight="bold">Sum:</Td>
            <Td fontWeight="bold">{calculateFieldSum('quantity')}</Td>
            <Td fontWeight="bold">
              {currencies[currency]} {calculateFieldSum('price').toFixed(2)}
            </Td>
            <Td fontWeight="bold">
              {currencies[currency]} {calculateFieldSum('price').toFixed(2)}
            </Td>
            <Td fontWeight="bold">
              {currencies[currency]} {calculateFieldSum('price').toFixed(2)}
            </Td>
          </Tr>
        </Tbody>
      </Table>
      {isOrderActive && (
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

import React from 'react';
import { Box, Text, Flex, IconButton, Image, VStack } from '@chakra-ui/react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { CartProduct, useCartState } from '../../state/cartState';
import { DeleteIcon } from '@chakra-ui/icons';

type CartItemProps = {
  product: CartProduct;
};

const CartItem: React.FC<CartItemProps> = ({ product }) => {
  const { updateProductQuantity, removeProduct } = useCartState();

  const handleAddToCart = () => {
    updateProductQuantity(product, product.quantity + 1);
  };

  const handleRemoveFromCart = () => {
    updateProductQuantity(product, product.quantity - 1);
  };

  return (
    <Flex borderWidth="1px" borderRadius="md" p={4} alignItems="center" justifyContent="space-between">
      <Box height={16} width={16} mr={4}>
        <Image src={product.image} alt={product.title} height="100%" width="100%" objectFit="contain" />
      </Box>
      <VStack align="flex-start" spacing={2} flex={1}>
        <Text fontSize="lg" fontWeight="semibold" mb={2}>
          {product.title}
        </Text>
        <Text fontSize="sm" color="gray.500">
          ${product.price}
        </Text>
        <Flex alignItems="center">
          <IconButton
            icon={<FiMinus />}
            aria-label="Remove"
            variant="ghost"
            colorScheme="red"
            onClick={handleRemoveFromCart}
            isDisabled={product.quantity === 1}
          />
          <Text mx={2}>{product.quantity}</Text>
          <IconButton
            icon={<FiPlus />}
            aria-label="Add"
            variant="ghost"
            colorScheme="green"
            onClick={handleAddToCart}
          />
          <IconButton
            icon={<DeleteIcon />}
            aria-label="Delete"
            variant="ghost"
            colorScheme="red"
            onClick={() => removeProduct(product)}
          />
        </Flex>
      </VStack>
    </Flex>
  );
};

export default CartItem;

import React from 'react';
import { Box, Text, Image, Badge } from '@chakra-ui/react';
import { Product } from '../../state/productState';

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Box borderWidth="1px" borderRadius="md" p={4} height="100%" display="flex" flexDirection="column">
      <Text fontSize="lg" fontWeight="semibold" mb={2} minHeight="3.6rem" maxHeight="3.6rem" overflow="hidden">
        {product.title}
      </Text>
      <Box minHeight="1.5rem" maxHeight="1.5rem" display="flex" alignItems="center" mb={2}>
        <Badge colorScheme="green">Rating: {product.rating.rate}</Badge>
      </Box>
      <Box
        borderRadius="md"
        overflow="hidden"
        minHeight="12rem"
        maxHeight="12rem"
        mb={2}
        backgroundColor="white"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Image src={product.image} alt={product.title} objectFit="contain" height="100%" width="100%" mx="auto" />
      </Box>
      <Box display="flex" mt="10px">
        <Box
          bg="green.500"
          color="white"
          borderRadius="md"
          py={1}
          px={2}
          fontSize="0.8rem"
          fontWeight="semibold"
          mr={2}
        >
          {product.category.split(' ')[0]}
        </Box>
        <Text fontSize="lg" fontWeight="bold" mt="auto" ml="auto">
          ${product.price}
        </Text>
      </Box>
    </Box>
  );
};

export default ProductCard;
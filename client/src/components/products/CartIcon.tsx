import { Box } from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';

type CartIconProps = {
  cartItemsCount: number;
};

const CartIcon: React.FC<CartIconProps> = ({ cartItemsCount }) => {
  return (
    <Box position="relative" cursor="pointer">
      <FiShoppingCart size={24} />
      {cartItemsCount > 0 && (
        <Box
          position="absolute"
          top="-8px"
          right="-8px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="primary"
          color="white"
          borderRadius="full"
          width="20px"
          height="20px"
          fontSize="12px"
        >
          {cartItemsCount}
        </Box>
      )}
    </Box>
  );
};

export default CartIcon;

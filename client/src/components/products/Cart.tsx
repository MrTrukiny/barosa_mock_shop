import React from 'react';
import {
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Text,
  Button,
  Flex,
} from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { FiShoppingCart } from 'react-icons/fi';
import { cartAtom, cartQuantityAtom, useCartState } from '../../state/cartState';
import { Product } from '../../state/productState';
import CartItem from './CartItem';

const Cart: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cart = useRecoilValue(cartAtom);
  const cartQuantity = useRecoilValue(cartQuantityAtom);
  const { getCartSubtotal, getCartTotal } = useCartState();
  const subtotal = getCartSubtotal();
  const total = getCartTotal(0.15);

  return (
    <>
      <IconButton
        icon={
          <>
            <FiShoppingCart size={24} />
            {cartQuantity > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  backgroundColor: '#FF3860',
                  color: '#FFF',
                }}
              >
                {cartQuantity}
              </span>
            )}
          </>
        }
        aria-label="Shopping Cart"
        variant="ghost"
        bg="accent"
        borderRadius="md"
        _hover={{ bg: 'secondary', color: 'primary' }}
        ml="3"
        onClick={onOpen}
      />

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Your Cart</DrawerHeader>
            <DrawerBody>
              {cart.products.map((product: Product) => (
                <CartItem key={product.id} product={{ quantity: 1, ...product }} />
              ))}
            </DrawerBody>
            <DrawerFooter display="grid" gridTemplateColumns="1fr" gap={4} textAlign="left">
              <Flex justifyContent="space-between">
                <Text fontWeight="bold">Subtotal:</Text>
                <Text fontWeight="bold" textAlign="right">
                  ${subtotal.toFixed(2)}
                </Text>
              </Flex>
              <Flex justifyContent="space-between">
                <Text fontWeight="bold">Tax (15%):</Text>
                <Text fontWeight="bold" textAlign="right">
                  ${(subtotal * 0.15).toFixed(2)}
                </Text>
              </Flex>
              <Flex justifyContent="space-between">
                <Text fontWeight="bold">Total:</Text>
                <Text fontWeight="bold" textAlign="right">
                  ${total.toFixed(2)}
                </Text>
              </Flex>
              <Button size="lg" fontWeight="bold" _hover={{ bg: 'secondary', color: 'primary' }} justifySelf="center">
                Checkout
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default Cart;

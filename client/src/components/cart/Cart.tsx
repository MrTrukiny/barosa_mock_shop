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
  UseToastOptions,
  useToast,
} from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { FiShoppingCart } from 'react-icons/fi';
import { cartAtom, cartQuantityAtom, useCartState } from '../../state/cartState';
import { useAuthState } from '../../state/authState';
import { Product } from '../../state/productState';
import CartItem from './CartItem';

const Cart: React.FC = () => {
  // State
  const cart = useRecoilValue(cartAtom);
  const cartQuantity = useRecoilValue(cartQuantityAtom);
  const { getCartSubtotal, getCartTotal } = useCartState();

  // Hooks
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // Variables
  const subTotal = getCartSubtotal();
  const total = getCartTotal(0.15);
  const { userId } = useAuthState();

  const handleCheckout = () => {
    const checkoutData = {
      userId,
      products: cart.products,
      subTotal,
      tax: 15,
      total: total,
      currency: 'Dollar',
    };
    const checkoutFailedToast: UseToastOptions = {
      title: 'Checkout Failed',
      description: 'Something went wrong with your checkout. Please try again.',
      status: 'error',
      duration: 3000,
      isClosable: true,
    };

    fetch('http://localhost:3000/api/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(checkoutData),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Checkout successful');
          onClose();
        } else {
          console.log('Checkout failed');
          toast(checkoutFailedToast);
        }
      })
      .catch((error) => {
        console.log('Checkout error:', error);
        toast(checkoutFailedToast);
      });
  };

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
                <CartItem key={product.id} product={{ ...product, quantity: 1 }} />
              ))}
            </DrawerBody>
            <DrawerFooter display="grid" gridTemplateColumns="1fr" gap={4} textAlign="left">
              <Flex justifyContent="space-between">
                <Text fontWeight="bold">Subtotal:</Text>
                <Text fontWeight="bold" textAlign="right">
                  ${subTotal.toFixed(2)}
                </Text>
              </Flex>
              <Flex justifyContent="space-between">
                <Text fontWeight="bold">Tax (15%):</Text>
                <Text fontWeight="bold" textAlign="right">
                  ${(subTotal * 0.15).toFixed(2)}
                </Text>
              </Flex>
              <Flex justifyContent="space-between">
                <Text fontWeight="bold">Total:</Text>
                <Text fontWeight="bold" textAlign="right">
                  ${total.toFixed(2)}
                </Text>
              </Flex>
              <Button
                size="lg"
                fontWeight="bold"
                _hover={{ bg: 'secondary', color: 'primary' }}
                justifySelf="center"
                onClick={handleCheckout}
              >
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

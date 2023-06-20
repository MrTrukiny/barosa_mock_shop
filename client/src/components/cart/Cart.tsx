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
  Box,
} from '@chakra-ui/react';
import { useSetRecoilState } from 'recoil';
import { FiShoppingCart } from 'react-icons/fi';
import { useCartState } from '../../state/cartState';
import { useAuthState } from '../../state/authState';
import { Product } from '../../state/productState';
import CartItem from './CartItem';
import { Order, OrderStatus } from '../../state/orderState';
import { activeTabAtom } from '../../state/dashboardState';
import { orderService } from '../../services/order.service';
import useFetchOrders from '../../hooks/useFetchOrders';

const Cart: React.FC = () => {
  // State
  const setActiveTab = useSetRecoilState(activeTabAtom);
  const { cart, setCart, cartQuantity, setCartQuantity, getCartSubtotal, getCartTotal } = useCartState();
  const { fetchOrders } = useFetchOrders();

  // Hooks
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // Variables
  const subTotal = getCartSubtotal();
  const total = getCartTotal(0.15);
  const { userId } = useAuthState();

  const handleCheckout = () => {
    const checkoutData: Order = {
      userId,
      products: cart.products,
      subTotal,
      tax: subTotal * 0.15,
      total: total,
      currency: { code: 'USD', symbol: '$' },
      status: OrderStatus.ACTIVE,
      createdAt: new Date().toISOString(),
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
      .then(async (response) => {
        if (response.ok) {
          console.log('Checkout successful');
          setCart((prevCart) => ({ ...prevCart, products: [] }));
          setCartQuantity(0);
          setActiveTab(1);
          await fetchOrders();
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

  const handleCancel = () => {
    setCart((prevCart) => ({ ...prevCart, products: [] }));
    setCartQuantity(0);
    onClose();
  };

  const handleEdit = async () => {
    const editOrder: Order = {
      userId,
      products: cart.products,
      subTotal,
      tax: subTotal * 0.15,
      total: total,
      currency: { code: 'USD', symbol: '$' },
      status: OrderStatus.ACTIVE,
      updatedAt: new Date().toISOString(),
    };

    try {
      await orderService.updateOrder(cart.orderId as string, editOrder);
      console.log('Order Edited successfully');
      toast({
        title: 'Order Edited',
        description: 'Your order has been edited successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setCart({ orderId: '', products: [] });
      setCartQuantity(0);
      await fetchOrders();
      onClose();
    } catch (error) {
      console.log('Edit order error:', error);
    }
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

      {cart.products.length > 0 && (
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
                <Flex justifyContent="space-between">
                  <Box width="50%">
                    <Button
                      size="lg"
                      fontWeight="bold"
                      _hover={{ bg: 'secondary', color: 'primary' }}
                      justifySelf="center"
                      onClick={cart.orderId ? handleEdit : handleCheckout}
                      width="90%"
                    >
                      {cart.orderId ? 'Save' : 'Checkout'}
                    </Button>
                  </Box>
                  <Box width="50%">
                    <Button
                      size="lg"
                      fontWeight="bold"
                      _hover={{ bg: 'secondary', color: 'primary' }}
                      justifySelf="center"
                      onClick={handleCancel}
                      width="90%"
                    >
                      Cancel
                    </Button>
                  </Box>
                </Flex>
              </DrawerFooter>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      )}
    </>
  );
};

export default Cart;

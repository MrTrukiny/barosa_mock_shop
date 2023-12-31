import React, { useEffect } from 'react';
import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Button,
  Avatar,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { activeTabAtom } from '../../state/dashboardState';
import { isLoggedInAtom } from '../../state/authState';

import AllOrders from '../../components/order/AllOrders';
import AllProducts from '../../components/product/AllProducts';
import Cart from '../../components/cart/Cart';
import LoginAndRegister from '../../components/ loginAndRegister/LoginAndRegister';

const Dashboard: React.FC = () => {
  // State
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInAtom);
  const [activeTab, setActiveTab] = useRecoilState(activeTabAtom);

  // Hooks
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogin = () => {
    onOpen();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  useEffect(() => {
    if (isLoggedIn) {
      setActiveTab(activeTab);
    }
  }, [activeTab, isLoggedIn, setActiveTab]);

  return (
    <Box p={4} bg="primary" maxWidth={{ base: '100%', md: '80%' }} mx="auto">
      <Flex align="center" justify="space-between" mb={4}>
        <Box fontWeight="bold" fontSize="xl" mr={4}>
          Barosa Shop
        </Box>
        <Flex align="center">
          {isLoggedIn && (
            <Flex align="center" mr={4}>
              <Avatar name={'John Doe'} size="sm" />
            </Flex>
          )}
          <Button
            onClick={isLoggedIn ? handleLogout : handleLogin}
            bg="transparent"
            border="1px"
            borderRadius="md"
            px={4}
            py={2}
            fontWeight="medium"
            _hover={{ bg: 'secondary', color: 'primary' }}
          >
            {isLoggedIn ? 'Logout' : 'Login'}
          </Button>
          <Cart />
        </Flex>
      </Flex>
      <Tabs colorScheme="accent" onChange={handleTabChange} defaultIndex={activeTab}>
        <TabList>
          <Tab color="secondary">All Products</Tab>
          {isLoggedIn && <Tab color="secondary">My Orders</Tab>}
        </TabList>
        <TabPanels>
          <TabPanel>
            <AllProducts />
          </TabPanel>
          {isLoggedIn && (
            <TabPanel>
              <AllOrders />
            </TabPanel>
          )}
        </TabPanels>
      </Tabs>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <LoginAndRegister onClose={onClose} />
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Dashboard;

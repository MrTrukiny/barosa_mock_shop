import React from 'react';
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
import { isLoggedInAtom } from '../../state/authState';
import Login from '../ loginAndRegister/LoginAndRegister';

const Dashboard: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInAtom);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogin = () => {
    onOpen();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

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
        </Flex>
      </Flex>
      <Tabs colorScheme="accent">
        <TabList>
          <Tab color="secondary">All Products</Tab>
          {isLoggedIn && <Tab color="secondary">My Orders</Tab>}
        </TabList>
        <TabPanels>
          <TabPanel>
            <p color="light">All Products Content</p>
          </TabPanel>
          {isLoggedIn && (
            <TabPanel>
              <p color="light">My Orders Content</p>
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
            <Login onClose={onClose} />
          </ModalBody>
          <ModalFooter justifyContent="center"></ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Dashboard;

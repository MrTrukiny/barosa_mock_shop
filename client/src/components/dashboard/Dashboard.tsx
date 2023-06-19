import React, { useState } from 'react';
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs, Button, Avatar, Flex } from '@chakra-ui/react';

const Dashboard: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUsername('John Doe'); // Replace with the actual username when implementing the login functionality
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
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
              <Box mr={2}>{username}</Box>
              <Avatar name={username} size="sm" />
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
    </Box>
  );
};

export default Dashboard;

import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button, useToast, Text, Link, Center } from '@chakra-ui/react';
import { useAuthState } from '../../state/authState';

interface LoginProps {
  onClose: () => void;
}

const LoginAndRegister: React.FC<LoginProps> = ({ onClose }) => {
  const { login } = useAuthState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const toast = useToast();

  const handleLogin = () => {
    if (!email || !password) {
      toast({
        title: 'Login Error',
        description: 'Please provide both email and password.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const userData = {
      email,
      password,
    };

    fetch('http://localhost:3000/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Login successful');
          login();
          toast({
            title: 'Login Successful',
            description: 'You have successfully logged in!',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          onClose();
        } else {
          console.log('Login failed');
          toast({
            title: 'Login Error',
            description: 'Invalid email or password. Please try again.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      })
      .catch((error) => {
        console.log('Login error:', error);
        toast({
          title: 'Login Error',
          description: 'An error occurred during login. Please try again.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const handleRegister = () => {
    if (!firstName || !email || !password) {
      toast({
        title: 'Registration Error',
        description: 'Please provide all required fields.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const userData = {
      firstName,
      lastName,
      email,
      password,
    };

    fetch('http://localhost:3000/api/v1/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Registration successful');
          login();
          toast({
            title: 'Registration Successful',
            description: 'You have successfully registered!',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          onClose();
        } else {
          console.log('Registration failed');
          toast({
            title: 'Registration Error',
            description: 'An error occurred during registration. Please try again.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      })
      .catch((error) => {
        console.log('Registration error:', error);
        toast({
          title: 'Registration Error',
          description: 'An error occurred during registration. Please try again.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const toggleRegister = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="md">
      {isRegistering && (
        <>
          <FormControl isRequired>
            <FormLabel>First Name</FormLabel>
            <Input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </FormControl>
          <FormControl mt={2}>
            <FormLabel>Last Name</FormLabel>
            <Input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </FormControl>
        </>
      )}
      <FormControl isRequired mt={2}>
        <FormLabel>Email</FormLabel>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormControl>
      <FormControl isRequired mt={2}>
        <FormLabel>Password</FormLabel>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </FormControl>
      <Center mt={4}>
        {isRegistering ? (
          <Button
            bg="transparent"
            border="1px"
            borderRadius="md"
            px={4}
            py={2}
            fontWeight="medium"
            _hover={{ bg: 'secondary', color: 'primary' }}
            onClick={handleRegister}
            width="100%"
          >
            Register
          </Button>
        ) : (
          <Button
            bg="transparent"
            border="1px"
            borderRadius="md"
            px={4}
            py={2}
            fontWeight="medium"
            _hover={{ bg: 'secondary', color: 'primary' }}
            onClick={handleLogin}
            width="100%"
          >
            Login
          </Button>
        )}
      </Center>
      <Text mt={2} textAlign="center">
        {isRegistering ? (
          <>
            Already have an account?{' '}
            <Link color="dark" onClick={toggleRegister}>
              Login instead
            </Link>
          </>
        ) : (
          <>
            Don't have an account?{' '}
            <Link color="dark" onClick={toggleRegister}>
              Register
            </Link>
          </>
        )}
      </Text>
    </Box>
  );
};

export default LoginAndRegister;

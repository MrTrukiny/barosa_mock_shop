import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, Button, useToast } from '@chakra-ui/react';
import { useAuthState } from '../../state/authState';

const Register: React.FC = () => {
  const { login } = useAuthState();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  const generateInitials = () => {
    if (firstName.length >= 2) {
      return `${firstName[0]}${firstName[1]}`;
    }
    return firstName[0];
  };

  const handleRegister = () => {
    // Perform registration logic here
    // For demonstration purposes, we'll simply log the registered user information
    const user = {
      firstName,
      lastName,
      email,
      password,
    };
    console.log('Registered user:', user);
    login(firstName);
    toast({
      title: 'Registration Successful',
      description: 'You have successfully registered!',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="md">
      <FormControl isRequired>
        <FormLabel>First Name</FormLabel>
        <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </FormControl>
      <FormControl mt={2}>
        <FormLabel>Last Name</FormLabel>
        <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </FormControl>
      <FormControl isRequired mt={2}>
        <FormLabel>Email</FormLabel>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormControl>
      <FormControl isRequired mt={2}>
        <FormLabel>Password</FormLabel>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </FormControl>
      <Button mt={4} colorScheme="primary" onClick={handleRegister}>
        Register
      </Button>
      {firstName && (
        <Box mt={2}>
          <strong>Initials: </strong>
          {generateInitials()}
        </Box>
      )}
    </Box>
  );
};

export default Register;

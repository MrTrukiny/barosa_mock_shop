import React from 'react';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from './chakra.config';

import Dashboard from './components/dashboard/Dashboard';

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode="light" />
      <Dashboard />
    </ChakraProvider>
  );
};

export default App;

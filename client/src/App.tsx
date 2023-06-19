import React from 'react';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { RecoilRoot } from 'recoil';
import theme from './chakra.config';

import Dashboard from './components/dashboard/Dashboard';

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode="light" />
      <RecoilRoot>
        <Dashboard />
      </RecoilRoot>
    </ChakraProvider>
  );
};

export default App;

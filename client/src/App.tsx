import React from 'react';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { RecoilRoot } from 'recoil';
import theme from './chakra.config';

import Dashboard from './pages/dashboard/Dashboard';

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode="light" />

        <Dashboard />
      </ChakraProvider>
    </RecoilRoot>
  );
};

export default App;

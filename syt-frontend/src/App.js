import React, {useState} from 'react';
import { HeaderMegaMenu } from './features/ui/header';
import { FooterLinks } from './features/ui/footer';
import { Router } from './features/routing/router';
import './App.css';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { GlobalContext } from './features/context/globalContext';

function App() {
  const [token, setToken] = useState("");
  const value = { token, setToken };
  const data = [{"title": "Test", "links": [{"label": "label1", "link": "wwww.google.com"}]}];
  return (
    <MantineProvider withNormalizeCSS withGlobalStyles>
      <Notifications />
      <GlobalContext.Provider value = {value}>
      <HeaderMegaMenu></HeaderMegaMenu>
      <Router></Router>
      <FooterLinks data={data}></FooterLinks>
      </GlobalContext.Provider>
    </MantineProvider>
        
        
  );
}

export default App;

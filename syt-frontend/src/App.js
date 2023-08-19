import React from 'react';
import { HeaderMegaMenu } from './features/ui/header';
import { FooterLinks } from './features/ui/footer';
import { MainPage } from './pages/main';
import './App.css';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

function App() {
  const data = [{"title": "Test", "links": [{"label": "label1", "link": "wwww.google.com"}]}];
  return (
    <MantineProvider withNormalizeCSS withGlobalStyles>
      <Notifications />
      <HeaderMegaMenu></HeaderMegaMenu>
      <MainPage></MainPage>
      <FooterLinks data={data}></FooterLinks>
    </MantineProvider>
        
        
  );
}

export default App;

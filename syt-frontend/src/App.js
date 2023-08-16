import React from 'react';
import { HeaderMegaMenu } from './features/ui/header';
import { FooterLinks } from './features/ui/footer';
import { MainPage } from './pages/main';
import './App.css';

function App() {
  const data = [{"title": "Test", "links": [{"label": "label1", "link": "wwww.google.com"}]}];
  return (
    <>
      <HeaderMegaMenu></HeaderMegaMenu>
      <MainPage></MainPage>
      <FooterLinks data={data}></FooterLinks>
    </>
        
        
  );
}

export default App;

import React from 'react';
import { ListThoughtsComponent } from './features/thought-list/thought-list.component';
import { HeaderMegaMenu } from './features/ui/header';
import { FooterLinks } from './features/ui/footer';
import './App.css';

function App() {
  const data = [{"title": "Test", "links": [{"label": "label1", "link": "wwww.google.com"}]}];
  return (
    <>
      <HeaderMegaMenu></HeaderMegaMenu>
      <ListThoughtsComponent></ListThoughtsComponent>
      <FooterLinks data={data}></FooterLinks>
    </>
        
        
  );
}

export default App;

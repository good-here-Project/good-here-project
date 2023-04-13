import React from 'react';
import './App.css';
import Header from './header/header';
import Main from './main/main';
import Login from './login/login';
import Footer from './footer/footer';
import Sign from './sign/sign';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={ <Main /> } />
        <Route path="/Main" element={ <Main /> } />
        <Route path="/Login" element={ <Login /> } />
        <Route path="/Sign" element={ <Sign />} />
      </Routes>
      
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;

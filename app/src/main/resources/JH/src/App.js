import React from 'react';
import './App.css';
import Header from './header/header';
import Main from './main/main';
import Login from './login/login';
import Footer from './footer/footer';
import Sign from './sign/sign';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminMember from './AdminMember/AdminMember';
import AdminBoard from './AdminBoard/AdminBoard';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Main" element={<Main />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Sign" element={<Sign />} />
          <Route path="/AdminMember" element={<AdminMember />} />
          <Route path="/AdminBoard" element={<AdminBoard />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

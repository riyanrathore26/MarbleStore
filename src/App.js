// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';
import Signup from './Components/Singup';
import Login from './Components/Login';
import AdminPage from './Components/AdminPage';
import Seller from './Components/Seller';
import SellerSignup from './Components/SellerSignup';
import CreateSeller from './Components/CreateSeller';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Seller" element={<Seller />} />
          <Route path="/CreateSeller" element={<CreateSeller />} />
          <Route path="/SellerSignup" element={<SellerSignup />} />
          <Route path="/AdminPage" element={<AdminPage />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

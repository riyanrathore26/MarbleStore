import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';
import Signup from './Components/Singup';
import Login from './Components/Login';
import AdminPage from './Components/AdminPage';
import Seller from './Components/Seller';
import SellerSignup from './Components/SellerSignup';
import CreateSeller from './Components/CreateSeller';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    // Perform your authentication logic here (e.g., check if the user is logged in)
    // Set the authenticated state based on the result
    // For demonstration purposes, I'm setting it to true by default
    setAuthenticated(false);
  }, []);

  const PrivateRoute = ({ element }) => {
    // If authenticated, render the component; otherwise, redirect to the login page
    if (!authenticated) {
      // Redirect to login if not authenticated
      return <Navigate to="/Login" />;
    }

    // Render the component if authenticated
    return element;
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/Seller" element={<PrivateRoute element={<Seller />} />} />
          <Route path="/CreateSeller" element={<PrivateRoute element={<CreateSeller />} />} /> */}
          <Route path="/SellerSignup" element={<SellerSignup />} />
          <Route path="/Seller" element={<Seller />} />
          <Route path="/CreateSeller" element={<CreateSeller />} />
          <Route path="/AdminPage" element={<AdminPage />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

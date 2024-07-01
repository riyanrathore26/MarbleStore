import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';

const Signup = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/signup`, form);
      console.log(response.data);
      setIsVerifying(true);
      setModalIsOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/verify`, { email: form.email, code: verificationCode });
      console.log(response.data);
      alert('Verification successful!');
      setModalIsOpen(false);
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert('Verification failed. Please check the code and try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" onChange={handleChange} placeholder="Username" />
        <input type="email" name="email" onChange={handleChange} placeholder="Email" />
        <input type="password" name="password" onChange={handleChange} placeholder="Password" />
        <button type="submit">Sign Up</button>
      </form>
      
      <Modal isOpen={modalIsOpen}>
        <form onSubmit={handleVerify}>
          <input type="text" name="verificationCode" onChange={(e) => setVerificationCode(e.target.value)} placeholder="Verification Code" />
          <button type="submit">Verify</button>
        </form>
      </Modal>
    </div>
  );
};

export default Signup;

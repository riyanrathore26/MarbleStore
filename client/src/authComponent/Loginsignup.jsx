import React, { useState, useEffect } from 'react';
import './Loginsignup.css'; // Assuming you place your styles in this CSS file
import axios from 'axios';
import { BASE_URL } from '../config';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { FaRegEye,FaRegEyeSlash } from "react-icons/fa";

export default function Loginsignup(props) {
    const showlogin = props.showlogin;
    const [form, setForm] = useState({ username: '', email: '', password: '', phonenumber: '' });
    const [verificationCode, setVerificationCode] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(showlogin);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLogin(showlogin);
    }, [showlogin]);

    const toggleForm = () => {
        setIsLogin(!isLogin);
        // Clear the form fields when toggling between login and signup
        setForm({ username: '', email: '', password: '', phonenumber: '' });
    };

    // Function to handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    // Function to handle login
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/api/auth/login`, form);
            console.log(response.data);
            if (response) {
                // navigate to the home page or another page after successful login
                navigate('/');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed. Please try again.');
        }
    };

    // Function to handle signup
    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/api/auth/signup`, form);
            console.log('Signup successful:', response.data);
            setIsVerifying(true);
            setModalIsOpen(true);
        } catch (error) {
            console.error('Signup error:', error);
            alert('Signup failed. Please try again.');
        }
    };

    // Function to handle form submission
    const handleSubmit = (event) => {
        if (isLogin) {
            handleLogin(event);
        } else {
            handleSignUp(event);
        }
    };

    // Function to handle verification
    const handleVerify = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/api/auth/verify`, { email: form.email, code: verificationCode });
            console.log(response.data);
            setModalIsOpen(false);
            setIsVerifying(false);
            setIsLogin(true);

        } catch (error) {
            console.error('Verification error:', error);
            alert('Verification failed. Please check the code and try again.');
        }
    };
    
    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={`container ${isLogin ? 'login' : 'signup'} ${isVerifying ? 'blurred' : ''}`}>
            {/* Poster Section */}
            <div className="poster">
                <h2>{isLogin ? 'Welcome Back!' : 'Join Us Today!'}</h2>
                <p>{isLogin ? 'Log in to continue.' : 'Sign up to explore more.'}</p>
                <button onClick={toggleForm}>
                    {isLogin ? 'Sign Up' : 'Login'}
                </button>
            </div>

            {/* Form Section */}
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="input-group">
                            <label>Name:</label>
                            <input
                                type="text"
                                name="username"
                                value={form.username}
                                onChange={handleInputChange}
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                    )}
                    <div className="input-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Password:</label>
                        <div className="password-container">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={form.password}
                                onChange={handleInputChange}
                                placeholder="Enter your password"
                                required
                            />
                            <span className="eye-icon" onClick={togglePasswordVisibility}>
                                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                            </span>
                        </div>
                    </div>
                    {!isLogin && (
                        <div className="input-group">
                            <label>Phone Number:</label>
                            <input
                                type="text"
                                name="phonenumber"
                                value={form.phonenumber}
                                onChange={handleInputChange}
                                placeholder="Enter your phone number"
                                required
                            />
                        </div>
                    )}
                    <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
                </form>
            </div>

            {/* Verification Modal (if needed) */}
            {isVerifying && (
                <Modal 
                    isOpen={modalIsOpen} 
                    onRequestClose={() => setModalIsOpen(false)}
                    className="modal"
                    overlayClassName="overlay"
                >
                    <h2>Verification</h2>
                    <p>Please enter the verification code sent to your email.</p>
                    <form onSubmit={handleVerify} className='verify'>
                        <input
                            type="text"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            placeholder="Enter verification code"
                            required
                        />
                        <button type="submit">Verify</button>
                    </form>
                </Modal>
            )}
        </div>
    );
}

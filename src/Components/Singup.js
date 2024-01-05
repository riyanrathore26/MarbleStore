import React, { useState } from 'react';
import '../Components_css/Signup.css'
import NavigationBar from './NavigationBar';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        try {
            // Send signup data to the server
            const response = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username,email, password }),
            });
            // Handle the response
            const result = await response.json();
            console.log(result);

            // Alert values after successful signup
            alert(`Signup successful! Username: ${username}, Password: ${password}, email: ${email}`);
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };

    return (
        <>
        <NavigationBar/>
        <div className='signup-container'>
            <h2>Signup</h2>
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <br />
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required
            />
            <br />
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <br />
            <button type="button" onClick={handleSignup} className='loginBtn'>
                Signup
            </button>
        </div>
        </>
    );
};

export default Signup;

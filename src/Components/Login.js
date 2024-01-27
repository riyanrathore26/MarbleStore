import React from "react";
import '../Components_css/Login.css'
import NavigationBar from "./NavigationBar";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic client-side validation
    if (!email || !password) {
      setError("Please provide both email and password.");
      return;
    }

    // You can now send the login data to your backend server for validation
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Handle successful login
        // Store email in localStorage
        // Assuming you have set the item
          localStorage.setItem('loggedInEmail', email);

          // Checking if the item is set
          const storedEmail = localStorage.getItem('loggedInEmail');

          if (storedEmail !== null && storedEmail !== undefined) {
            alert('Value successfully set in localStorage: ' + storedEmail);
          } else {
            alert('Failed to set value in localStorage');
          }
        // Redirect to a dashboard or home page
        window.location.href = "/Home";
      } else {
        // Handle unsuccessful login, show an error message
        setError("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError("An error occurred during login. Please try again.");
    }
  };

  return (
    <>
    <NavigationBar/>
    <div className="login-container">
      <h1>Login Page hai</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit" className="loginBtn">Login</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
    </>
  );
};

export default Login;

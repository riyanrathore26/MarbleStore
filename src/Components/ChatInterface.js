// ChatInterface.js (Frontend)
import React, { useState, useEffect } from 'react';
import '../Components_css/ChatInterface.css';
import axios from 'axios';

const ChatInterface = ({ onClose, sender, seller_id, SellerName }) => {
  const [loggedInEmail, setLoggedInEmail] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch initial messages when the chat interface opens
    const storedEmail = localStorage.getItem('loggedInEmail');
    setLoggedInEmail(storedEmail || '');
    console.log("HI", seller_id, "and", storedEmail);
    fetchMessages(storedEmail, seller_id);
  }, []);

  const fetchMessages = async (storedEmail, seller_id) => {
    try {
      const response = await axios.get(`/api/messages/${storedEmail}/${seller_id}`);
      const messages = response.data;
      // Handle messages
      setMessages(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleInputChange = (event) => {
    setUserMessage(event.target.value);
  };

  const handleSend = async () => {
    if (userMessage.trim() === '') {
      return;
    }

    const sellerResponse = `Hi, this is ${seller_id}. You said: ${userMessage}`;

    setMessages((prevMessages) => [...prevMessages, userMessage, sellerResponse]);
    setUserMessage('');

    try {
      // Send the message to the backend for saving
      await axios.post('/api/messages', { storedEmail: loggedInEmail, seller_id, content: userMessage });
      // Fetch updated messages after sending a new one
      fetchMessages(loggedInEmail, seller_id);
      // Clear the input field
      setUserMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chat-interface">
      <div className="header">
        <span>Chat Interface - {SellerName}</span>
        <button onClick={onClose}>X</button>
      </div>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type your message..."
        value={userMessage}
        onChange={handleInputChange}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default ChatInterface;

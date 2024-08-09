// src/ChatWindow.js
import React, { useState, useEffect } from 'react';
import '../ComponentsCss/ChatWindow.css';

const ChatWindow = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // Automatically show initial question
    setMessages([{ text: "Hi! Are you looking for a job?", from: "bot" }]);
  }, []);

  const handleSend = () => {
    if (input.trim() === '') return;

    setMessages([...messages, { text: input, from: "user" }]);
    setInput('');
    setTimeout(() => {
      // Automatically respond to the user's message
      setMessages((prev) => [...prev, { text: "What's next?", from: "bot" }]);
    }, 1000);
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <span className="chat-title">Ask Eli</span>
        <button className="close-button" onClick={onClose}>X</button>
      </div>
      <div className="chat-content">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.from}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;

// src/ChatIcon.js
import React from 'react';

const ChatIcon = ({ onClick }) => {
  return (
    <div className="chat-icon" onClick={onClick}>
      <img src="/path-to-your-icon.png" alt="Chat Icon" />
    </div>
  );
};

export default ChatIcon;

import React from 'react';
import '../Components_css/ChatInterface.css';

const ChatInterface = ({ onClose }) => {
  return (
    <div className="chat-interface">
      <div className="header">
        <span>Chat Interface</span>
        <button onClick={onClose}>X</button>
      </div>
      <div className="messages">
        <h3>How can I assist you, sir?</h3>
      </div>
      <input type="text" placeholder="Type your message..." />
      <button>Send</button>
    </div>
  );
};

export default ChatInterface;

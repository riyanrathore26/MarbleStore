import React, { useState } from 'react';
import ChatInterface from './ChatInterface';
// import '../Components_css/ChatButton.css';

const ChatButton = () => {
  const [isChatOpen, setChatOpen] = useState(false);

  const toggleChat = () => {
    setChatOpen(!isChatOpen);
  };

  const cssStyle = {
    width: '7%',
    height: '15%',
    borderRadius: '50%',
    backgroundColor: 'black',
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    zIndex: 1,
  };
  

  return (
    <div>
      {!isChatOpen && (
        <button onClick={toggleChat} className="chat-button" style={cssStyle}>
          Chat
        </button>
      )}
      {isChatOpen && <ChatInterface onClose={toggleChat} />}
    </div>
  );
};

export default ChatButton;

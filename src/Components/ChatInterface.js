import React, { useState } from 'react';
import '../Components_css/ChatInterface.css';

const ChatInterface = ({ onClose }) => {
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState(['How can I assist you, sir?']);

  const handleInputChange = (event) => {
    setUserMessage(event.target.value);
  };

  const handleSend = async () => {
    // Check if the user has entered a message
    if (userMessage.trim() === '') {
      return;
    }

    // Send the user's message to the ChatGPT API
    const apiKey = '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';
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    try {
// Send the user's message to the ChatGPT API
const response = await fetch(apiUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
  },
  body: JSON.stringify({
    model: 'text-davinci-002', // Specify the model you want to use
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: userMessage },
    ],
  }),
});


      // Log the entire response for debugging
      console.log('API Response:', response);

      // Parse and handle the response
      const result = await response.json();

      // Check for a valid response structure
      if (result && Array.isArray(result.choices) && result.choices.length > 0) {
        const chatGptMessage = result.choices[0]?.message?.content || '';

        // Update the messages
        setMessages((prevMessages) => [...prevMessages, userMessage, chatGptMessage]);
      } else {
        console.error('Unexpected response format:', result);
      }

      // Clear the input field
      setUserMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chat-interface">
      <div className="header">
        <span>Chat Interface</span>
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

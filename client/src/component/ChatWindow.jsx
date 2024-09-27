import React, { useState, useEffect } from 'react';

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
    <div className="chat-window p-0 rounded-lg shadow-md overflow-hidden w-72 bg-white">
      <div className="chat-header bg-red-600 text-white p-2 flex justify-between items-center">
        <span className="chat-title text-sm font-bold">Ask Eli</span>
        <button className="close-button text-black text-base cursor-pointer" onClick={onClose}>X</button>
      </div>
      <div className="chat-content p-2 h-48 overflow-y-auto flex flex-col">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message p-1 my-1 rounded ${msg.from === 'bot' ? 'bg-gray-200 self-start' : 'bg-blue-500 text-white self-end'}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input-container flex border-t border-gray-300 p-2">
        <input
          type="text"
          className="flex-grow p-1 border border-gray-300 rounded mr-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button className="bg-red-600 text-white p-1 px-3 rounded" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}
export default ChatWindow;

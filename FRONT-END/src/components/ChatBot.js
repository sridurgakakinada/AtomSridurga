// src/components/ChatBot.js
import React, { useState } from "react";
import "./ChatBot.css";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    // Add the user's message to the chat
    setMessages([...messages, { text: inputMessage, user: "user" }]);
    setInputMessage("");

    // Simulate a response from the chatbot (you can replace this with your logic)
    setTimeout(() => {
      const response = "I'm just a basic chatbot.";
      setMessages([...messages, { text: response, user: "bot" }]);
    }, 1000);
  };

  return (
    <div className="chat-bot-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.user}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBot;

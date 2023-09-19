// ChatBotIcon.js
import React from "react";
import "./css/ChatBotIcon.css";

function ChatBotIcon({ onClick }) {
  return (
    <div className="chatbot-icon" onClick={onClick}>
      <img
        src="https://images-platform.99static.com/4VNlmbLPzOCSHP8RB4bAwwohd0g=/0x0:1024x1024/500x500/top/smart/99designs-contests-attachments/91/91577/attachment_91577988"
        alt="Chatbot Icon"
      />
    </div>
  );
}

export default ChatBotIcon;

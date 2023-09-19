// src/components/HomePage.js
// import React from "react";

// const HomePage = () => {
//   return (
//     <div>
//       <h1>Welcome to Health App</h1>
//       <p>
//         Explore health-related information and chat with our virtual assistant.
//       </p>
//       {/* Add a button to start the chat */}
//       <button>Start Chat</button>
//     </div>
//   );
// };

// export default HomePage;

import React, { useState } from "react";
import ChatBot from "./ChatBot"; // Import the ChatBot component
import "./ChatBot.css";
import ChatBotIcon from "./ChatBotIcon";
const HomePage = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);

  const toggleChatBot = () => {
    setIsChatBotOpen(!isChatBotOpen);
  };

  return (
    // <div>
    //   <h1>Welcome to Health App</h1>
    //   <p>
    //     Explore health-related information and chat with our virtual assistant.
    //   </p>
    //   {chatOpen ? (
    //     <ChatBot />
    //   ) : (
    //     <button onClick={() => setChatOpen(true)}>Start Chat</button>
    //   )}
    // </div>

    <div className="home-page">
      <h1>Welcome to Health App</h1>
      <p>
        Explore health-related information and chat with our virtual assistant.
      </p>

      {/* Render the ChatBotIcon component */}
      <ChatBotIcon onClick={toggleChatBot} />

      {/* Conditionally render the ChatBot component */}
      {isChatBotOpen && <ChatBot />}
    </div>
  );
};

export default HomePage;

import React, { useState } from 'react';
import "./css/ChatBotIcon.css"; // Import the CSS for the overlay
import { doctorClinicData } from './data';

function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [conversationState, setConversationState] = useState("greeting");
  const [isAskingName, setIsAskingName] = useState(false);

  const toggleChatWindow = () => {
    setChatOpen(!chatOpen);

    if (!chatOpen) {
      // If the chat window is opening, initiate the conversation with a greeting
      setConversationState("greeting");
      setIsAskingName(false);
      setMessages([]); // Clear previous messages
    }
  };

  // Function to handle user input for "Invalid Pin Code"
const handleInvalidPinCode = () => {
    
    // Show the options again
    const optionsMessage = {
      type: 'bot',
      buttons: [
        {
          text: 'Get Health information',
          onClick: () => handleGetHealthInfo('Get Health information'),
        },
        {
          text: 'Find Nearest Client',
          onClick: () => handleFindNearestClient('Find Nearest Client'),
        },
      ],
    };
    setMessages((prevMessages) => [...prevMessages, optionsMessage]);
  
    setConversationState('options');
  };

  // Function to handle user input for "Get Health information"
const handleGetHealthInfo = () => {
    const healthMessage = {
      type: 'bot',
      text: 'You selected "Get Health information." Here is some health information:',
      info: [
        'Maintain a balanced diet with a variety of fruits and vegetables.',
        'Engage in regular physical activity for at least 30 minutes a day.',
        'Ensure proper hydration by drinking an adequate amount of water.',
        'Get enough quality sleep, aiming for 7-9 hours per night.',
        'Manage stress through relaxation techniques like meditation or deep breathing.',
        'Avoid smoking and limit alcohol consumption for better overall health.',
      ],
    };
    setMessages((prevMessages) => [...prevMessages, healthMessage]);
  
    // Follow up with a message asking for the user's next action
    const nextActionMessage = {
      type: 'bot',
      text: 'What else would you like to do?',
      buttons: [
        {
          text: 'Get Health information',
          onClick: () => handleGetHealthInfo('Get Health information'),
        },
        {
          text: 'Find Nearest Client',
          onClick: () => handleFindNearestClient('Find Nearest Client'),
        },
      ],
    };
    setMessages((prevMessages) => [...prevMessages, nextActionMessage]);
  
    setConversationState('options');
  };
  
  

  // Function to handle user input for "Find Nearest Client"
  const handleFindNearestClient = () => {
    const pinCodeRequestMessage = {
      type: 'bot',
      text: 'Please enter the pin code of your location:',
    };
    setMessages((prevMessages) => [...prevMessages, pinCodeRequestMessage]);
    setConversationState('askPinCode');
  };

  const handleUserInput = (text) => {
    const userMessage = {
      type: 'user',
      text,
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);

    if (isAskingName) {
      // Handle the case where we are asking for the user's name
      const userName = text;
      const nameMessage = {
        type: 'bot',
        text: `Nice to meet you, ${userName}! What would you like to know?`,
      };
      setMessages((prevMessages) => [...prevMessages, nameMessage]);

      const optionsMessage = {
        type: 'bot',
        buttons: [
          {
            text: 'Get Health information',
            onClick: () => handleGetHealthInfo('Get Health information'),
          },
          {
            text: 'Find Nearest Client',
            onClick: () => handleFindNearestClient('Find Nearest Client'),
          },
        ],
      };
      setMessages((prevMessages) => [...prevMessages, optionsMessage]);

      setConversationState("options");
      setIsAskingName(false);
    } else {
      // Handle the conversation based on the current state
      switch (conversationState) {
        case "greeting":
          // Greet the user and ask for their name
          if (text.toLowerCase() === "Get Health information" || text.toLowerCase() === "Find Nearest Client") {
            // If the user's input matches one of the options, proceed accordingly
            handleUserInput(text);
          } else {
            const greetingMessage = {
              type: 'bot',
              text: 'Hello! What is your name?',
            };
            setMessages((prevMessages) => [...prevMessages, greetingMessage]);
            setIsAskingName(true);
          }
          break;

        case "options":
          // Handle user options and responses
          if (text.toLowerCase() === "Get Health information") {
            // User selected "Get Health information"
            const healthMessage = {
              type: 'bot',
              text: 'You selected "Get Health information." Here is some health information...',
            };
            setMessages((prevMessages) => [...prevMessages, healthMessage]);
            // You can add the logic for providing health information here
          } else if (text.toLowerCase() === "Find Nearest Client") {
            // User selected "Find Nearest Client"
            const pinCodeRequestMessage = {
              type: 'bot',
              text: 'Please enter the pin code of your location:',
            };
            setMessages((prevMessages) => [...prevMessages, pinCodeRequestMessage]);
            setConversationState("askPinCode"); // This is important to transition to asking for the pin code.
          } else {
            // User input doesn't match any option
            const invalidMessage = {
              type: 'bot',
              text: "I'm sorry, I didn't understand your choice. Please select one of the options.",
            };
            setMessages((prevMessages) => [...prevMessages, invalidMessage]);


          }
          break;

        case "askPinCode":
          console.log('Doctor Clinic Data:', doctorClinicData);

          const pinCode = text;
          const locationData = doctorClinicData[pinCode];
          
          if (locationData) {
            const clinics = locationData.clinics;

            const clinicResponseMessage = {
              type: 'bot',
              text: `Here are the clinics near your location (${pinCode}):`,
              buttons: clinics.map((clinic) => ({
                text: `${clinic.name} - ${clinic.address}`,
                onClick: () => alert(`You clicked on ${clinic.name}`),
              })),
            };
            setMessages((prevMessages) => [...prevMessages, clinicResponseMessage]);

            
            // After displaying clinic info, add a new set of options
          const newOptionsMessage = {
            type: 'bot',
            text: 'What else would you like to do?',
            buttons: [
              {
                text: 'Get Health information',
                onClick: () => handleGetHealthInfo('Get Health information'),
              },
              {
                text: 'Find Nearest Client',
                onClick: () => handleFindNearestClient('Find Nearest Client'),
              },
            ],
          };
          setMessages((prevMessages) => [...prevMessages, newOptionsMessage]);

          setConversationState('options');


          } 
          else {
            const invalidPinCodeMessage = {
              type: 'bot',
              text: "I'm sorry, I couldn't find information for that pin code. Please try again with a valid pin code from the range 10001 to 10030.",
            };
            setMessages((prevMessages) => [...prevMessages, invalidPinCodeMessage]);
            handleInvalidPinCode();
          }
          break;

        default:
          break;
      }
    }

    setInputText('');
  };

  // Determine the text for the button based on the conversation state
  const buttonLabel = conversationState === 'greeting' ? "" : 'Chat';

  return (
    <div className="App">
      <div className="ChatbotContainer">
        <button className={`ChatbotIcon ${chatOpen ? 'active' : ''}`} onClick={toggleChatWindow} 
        title="ChatbotIcon">
          {buttonLabel}
        </button>
        {chatOpen && (
          <div className="ChatWindow">
            <div className="ChatMessages">
              {messages.map((message, index) => (
                <div key={index} className={message.type}>
                  {message.type === 'bot' && message.buttons ? (
                    <div className="ButtonContainer">
                      {message.buttons.map((button, buttonIndex) => (
                        <button key={buttonIndex} onClick={button.onClick}>
                          {button.text}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div>
                      {message.text}
                      {message.info && (
                        <ul>
                          {message.info.map((infoItem, itemIndex) => (
                            <li key={itemIndex}>{infoItem}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="ChatInput">
              <input
                type="text"
                placeholder="Type your message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button onClick={() => handleUserInput(inputText)}>Send</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
}

export default App;
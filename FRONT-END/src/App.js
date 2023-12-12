import logo from "./logo.svg";
import "./App.css";
import HomePage from "./components/HomePage";
import ChatBot from "./components/ChatBot";
import MyChatBot from "./components/MyChatBot";

import Routes from "./components/Routes";
import NavBar from "./components/NavBar";
import { DataProvider } from "./components/DataContext";

import { DoctorAnswersProvider } from "./components/DoctorAnswersContext";
import ChatBotIcon from "./components/ChatBotIcon";

function App() {
  return (
    <div className="App">
      {/* Render the HomePage component */}
      {/* <Routes /> */}
      {/* Wrap your components with the DataProvider */}
      <DoctorAnswersProvider>
        <NavBar />
        <MyChatBot/>
        <Routes />
      </DoctorAnswersProvider>
      {/* Optionally, render the ChatBot component */}
      {/* <ChatBot /> */}
    </div>
  );
}

export default App;

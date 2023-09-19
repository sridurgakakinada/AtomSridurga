import logo from "./logo.svg";
import "./App.css";
import HomePage from "./components/HomePage";
import ChatBot from "./components/ChatBot";

function App() {
  return (
    <div className="App">
      {/* Render the HomePage component */}
      <HomePage />
      {/* Optionally, render the ChatBot component */}
      {/* <ChatBot /> */}
    </div>
  );
}

export default App;

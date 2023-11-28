import logo from "./logo.svg";
import "./App.css";
import HomePage from "./components/HomePage";
import ChatBot from "./components/ChatBot";
import Routes from "./components/Routes";
import NavBar from "./components/NavBar";
import { DataProvider } from "./components/DataContext";
// import UserDashboard from "./UserDashboard";
// import OrganDetail from "./OrganDetail";
function App() {
  return (
    <div className="App">
      {/* Render the HomePage component */}
      {/* <Routes /> */}
      {/* Wrap your components with the DataProvider */}
      <DataProvider>
        <NavBar />
        <Routes />
      </DataProvider>

      {/* Optionally, render the ChatBot component */}
      {/* <ChatBot /> */}
    </div>
  );
}

export default App;

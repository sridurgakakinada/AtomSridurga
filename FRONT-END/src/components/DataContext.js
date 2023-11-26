// DataContext.js
import React, { createContext, useState, useContext } from "react";

// Create a new context
const DataContext = createContext();

// Create a provider component to wrap the components that need access to the context
export const DataProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [organDetails, setOrganDetails] = useState(null);

  return (
    <DataContext.Provider
      value={{ username, setUsername, organDetails, setOrganDetails }}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to consume the context
export const useData = () => useContext(DataContext);

export default DataContext;

import React, { createContext, useContext, useState } from "react";

const DoctorAnswersContext = createContext();

export const useDoctorAnswers = () => {
  return useContext(DoctorAnswersContext);
};

export const DoctorAnswersProvider = ({ children }) => {
  const [doctorAnswers, setDoctorAnswers] = useState([]);

  const addDoctorAnswer = (answer) => {
    setDoctorAnswers((prevAnswers) => [...prevAnswers, answer]);
  };

  return (
    <DoctorAnswersContext.Provider
      value={{
        doctorAnswers,
        addDoctorAnswer,
      }}>
      {children}
    </DoctorAnswersContext.Provider>
  );
};

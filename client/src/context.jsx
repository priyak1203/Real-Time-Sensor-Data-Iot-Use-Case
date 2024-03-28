import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [mustardTheme, setMustardTheme] = useState(false);

  const toggleTheme = () => {
    const newValue = !mustardTheme;
    setMustardTheme(newValue);
    document.body.classList.toggle('mustard-theme', newValue);
  };

  return (
    <AppContext.Provider value={{ mustardTheme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };

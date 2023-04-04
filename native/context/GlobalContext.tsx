import React, { createContext, useState, useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacityBase,
} from "react-native";
import {
  GlobalContextType,
  Props,
  ThemeStyles,
  User,
} from "../interfaces/interfaces";
import { tasks } from "../tempObjects";

const initialThemeStyles = {
  background: "#E8EDF8",
  text: "#333",
  secondary: "#F8FAFF",
  accent: "#8BC34A",
};

const initialContextValue: GlobalContextType = {
  user: {
    firstName: "Alexandros",
    lastName: "Karakitsos",
    points: 0,
  },
  setUser: () => {},
  isDarkMode: false,
  toggleTheme: () => {},
  themeStyles: initialThemeStyles,
  tasks: tasks,
};

const GlobalProvider = ({ children }: Props) => {
  const lightStyles = {
    background: "#E8EDF8",
    text: "#333",
    secondary: "#F8FAFF",
    accent: "#8BC34A",
  };

  const darkStyles = {
    background: "#1C2331",
    text: "#fff",
    secondary: "#333E55",
    accent: "#8BC34A",
  };

  const [themeStyles, setThemeStyles] = useState<ThemeStyles>(lightStyles);
  const [user, setUser] = useState<User>(initialContextValue.user);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  const toggleTheme = () => {
    setIsDarkMode((prevTheme) => !prevTheme);
  };

  const updateThemeStyles = () => {
    setThemeStyles(isDarkMode ? darkStyles : lightStyles);
  };

  useEffect(() => {
    updateThemeStyles();
  }, [isDarkMode]);

  const contextValue: GlobalContextType = {
    user,
    setUser,
    isDarkMode,
    toggleTheme,
    themeStyles,
    tasks,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={themeStyles.background}
      />
      <SafeAreaView
        style={{ flex: 0, backgroundColor: themeStyles.background }}
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: themeStyles.secondary }}>
        {children}
      </SafeAreaView>
    </GlobalContext.Provider>
  );
};

const GlobalContext = createContext(initialContextValue);

export { GlobalContext, GlobalProvider };

import React, { createContext, useState, useEffect } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import {
  GlobalContextType,
  NotificationsInterface,
  Props,
  Task,
  User,
} from "../interfaces/interfaces";

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
  tasks: [],
  setTasks: () => {},
  notifications: [],
  setNotifications: () => {},
};

const GlobalProvider = ({ children }: Props) => {
  const lightStyles = {
    background: "#E8EDF8",
    text: "#333",
    secondary: "#F8FAFF",
    accent: "#8BC34A",
    shouldBackground: "#ECDFC6",
    couldBackground: "#CAE8D0",
    mustBackground: "#294B21",
    shouldText: "#D0982C",
    couldText: "#41B74D",
    mustText: "#D25252",
    placeholderText: "rgba(255, 255, 255, 0.5)",
  };

  const darkStyles = {
    background: "rgba(4, 9, 36, 1)",
    text: "rgba(255, 255, 255, 1)",
    secondary: "rgba(16, 23, 54, 1)",
    accent: "rgba(65, 183, 162, 1)",
    shouldBackground: "rgba(235, 148, 19, 0.35)",
    couldBackground: "rgba(65, 183, 162, 0.35)",
    mustBackground: "rgba(223, 84, 84, 0.35)",
    shouldText: "rgba(235, 148, 19, 1)",
    couldText: "rgba(65, 183, 162, 1)",
    mustText: "rgba(223, 84, 84, 1)",
    placeholderText: "rgba(255, 255, 255, 0.5)",
  };

  const [themeStyles, setThemeStyles] = useState(lightStyles);
  const [user, setUser] = useState<User>(initialContextValue.user);
  const [tasks, setTasks] = useState<Task[]>(initialContextValue.tasks);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [notifications, setNotifications] = useState<NotificationsInterface[]>(
    initialContextValue.notifications
  );

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
    setTasks,
    notifications,
    setNotifications,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={"red"}
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

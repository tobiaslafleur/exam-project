import React, { createContext, useState, ReactNode, useEffect } from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";

interface ThemeStyles {
  background: string;
  text: string;
  secondary: string;
  accent: string;
}

interface GlobalContextType {
  user: any;
  setUser: (user: any) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  themeStyles: ThemeStyles;
}

const initialThemeStyles = {
  background: "#E8EDF8",
  text: "#333",
  secondary: "#F8FAFF",
  accent: "#8BC34A",
};

const initialContextValue: GlobalContextType = {
  user: null,
  setUser: () => {},
  isDarkMode: false,
  toggleTheme: () => {},
  themeStyles: initialThemeStyles,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

interface Props {
  children: ReactNode;
}

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
  const [user, setUser] = useState(initialContextValue.user);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

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
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={themeStyles.background}
      />
      <SafeAreaView style={styles.container}>{children}</SafeAreaView>
    </GlobalContext.Provider>
  );
};

const GlobalContext = createContext(initialContextValue);

export { GlobalContext, GlobalProvider };

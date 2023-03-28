import React, { createContext, useState, ReactNode, useEffect } from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";

interface GlobalContextType {
  user: any;
  setUser: (user: any) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  themeStyles: any;
}

const initialContextValue: GlobalContextType = {
  user: null,
  setUser: () => {},
  isDarkMode: false,
  toggleTheme: () => {},
  themeStyles: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});

interface Props {
  children: ReactNode;
}

const GlobalProvider = ({ children }: Props) => {
  const lightStyles = {
    background: "#fff",
    text: "#000",
  };

  const darkStyles = {
    background: "#000",
    text: "#fff",
  };

  const [themeStyles, setThemeStyles] =
    useState<Record<string, string>>(lightStyles);
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
      <SafeAreaView style={styles.container}>{children}</SafeAreaView>
    </GlobalContext.Provider>
  );
};

const GlobalContext = createContext(initialContextValue);

export { GlobalContext, GlobalProvider };

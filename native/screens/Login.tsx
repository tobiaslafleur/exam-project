import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const Login = () => {
  const { themeStyles, toggleTheme, isDarkMode } = useContext(GlobalContext);

  return (
    <View
      style={[styles.container, { backgroundColor: themeStyles.background }]}
    >
      <Text style={{ color: themeStyles.text }}>Login</Text>
      <TouchableOpacity onPress={toggleTheme}>
        <Text style={{ color: themeStyles.text }}>
          {isDarkMode ? "Change to Light Mode" : "Change to Dark Mode"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

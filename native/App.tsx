import React, { StatusBar } from "react-native";
import { GlobalProvider } from "./context/GlobalContext";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabs from "./components/navigation/BottomTabs";

function App() {
  return (
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>
  );
}

export default () => {
  return (
    <GlobalProvider>
      <App />
    </GlobalProvider>
  );
};

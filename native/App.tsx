import React from "react-native";
import { GlobalProvider } from "./context/GlobalContext";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabs from "./components/BottomTabs";

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

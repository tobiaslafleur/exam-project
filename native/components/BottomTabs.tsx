import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import NewTask from "../screens/NewTask";
import Overview from "../screens/Overview";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const Tab = createBottomTabNavigator();

function BottomTabs() {
  const { themeStyles } = useContext(GlobalContext);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: themeStyles.secondary,
          borderTopWidth: 0,
          height: 50,
        },
        tabBarActiveTintColor: themeStyles.accent,
        tabBarInactiveTintColor: themeStyles.text,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="New Task"
        component={NewTask}
        options={{
          headerShown: false,
          tabBarLabel: "New Task",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="plus-circle"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Overview"
        component={Overview}
        options={{
          headerShown: false,
          tabBarLabel: "Overview",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="eye" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabs;

import { ReactNode } from "react";

interface GlobalContextType {
  user: User;
  setUser: (user: User) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  themeStyles: ThemeStyles;
}

interface ThemeStyles {
  background: string;
  text: string;
  secondary: string;
  accent: string;
}

interface Props {
  children: ReactNode;
}

interface Task extends React.PropsWithChildren {
  title: string;
  description: string;
  time: Date;
  priority: string;
  points: number;
  status: string;
}

interface User {
  firstName: string;
  lastName: string;
  points: number;
}

interface Input {
  onChangeText: (value: string) => void;
  title: string;
  value: string;
  placeholder: string;
}

interface TimeAndDay {
  title: string;
}

interface Priority {
  onPress: (value: string) => void;
  title: string;
}

interface Button {
  title: string;
  onPress: () => void;
}

export {
  Props,
  ThemeStyles,
  GlobalContextType,
  Task,
  User,
  Input,
  Priority,
  Button,
  TimeAndDay,
};

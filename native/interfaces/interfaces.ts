import { ReactNode } from "react";

interface GlobalContextType {
  user: User;
  setUser: (user: User) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  themeStyles: any;
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}

interface Props {
  children: ReactNode;
}

interface Task extends React.PropsWithChildren {
  id: string;
  title: string;
  description: string;
  time: Date;
  priority: TaskRank;
  points: number;
  status: Status;
}

type Status = "COMPLETED" | "NOT_COMPLETED";
type TaskRank = "COULD" | "SHOULD" | "MUST";

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
  GlobalContextType,
  Task,
  User,
  Status,
  Input,
  TimeAndDay,
  Priority,
  Button,
};

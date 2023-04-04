import { ReactNode } from "react";

interface GlobalContextType {
  user: User;
  setUser: (user: User) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  themeStyles: ThemeStyles;
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
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

export { Props, ThemeStyles, GlobalContextType, Task, User, Status };

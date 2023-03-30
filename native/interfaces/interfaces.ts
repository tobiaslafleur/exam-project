import { ReactNode } from "react";

interface GlobalContextType {
  user: any;
  setUser: (user: any) => void;
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

export { Props, ThemeStyles, GlobalContextType, Task };

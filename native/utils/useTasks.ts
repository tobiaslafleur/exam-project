import { useState, useEffect } from "react";
import { Task } from "../interfaces/interfaces";
import { isToday } from "date-fns";

export const useTasks = (tasks: Task[]) => {
  const [todayTasks, setTodayTasks] = useState<number>(0);
  const [todayTasksCompleted, setTodayTasksCompleted] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    tasks.forEach((task) => {
      if (isToday(task.time)) {
        setTodayTasks(() => todayTasks + 1);

        if (task.status === "COMPLETED") {
          setTodayTasksCompleted(() => todayTasksCompleted + 1);
        }

        const currProgress =
          todayTasks > 0 ? todayTasksCompleted / todayTasks : 0;

        setProgress(currProgress);
      }
    });
  }, []);

  return [progress, todayTasks, todayTasksCompleted];
};

import { useState, useEffect } from "react";
import { Task } from "../interfaces/interfaces";
import { isToday } from "date-fns";

export const useTasks = (tasks: Task[]) => {
  const [todayTasks, setTodayTasks] = useState<number>(0);
  const [todayTasksCompleted, setTodayTasksCompleted] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    let daily = 0;
    let dailyCompleted = 0;

    tasks.map((task) => {
      if (isToday(new Date(task.time))) {
        daily = daily + 1;

        if (task.status === "COMPLETED") {
          dailyCompleted = dailyCompleted + 1;
        }
      }
    });

    const currProgress = daily > 0 ? dailyCompleted / daily : 0;

    setTodayTasks(daily);
    setTodayTasksCompleted(dailyCompleted);
    setProgress(currProgress);
  }, [tasks]);

  return [progress, todayTasks, todayTasksCompleted];
};

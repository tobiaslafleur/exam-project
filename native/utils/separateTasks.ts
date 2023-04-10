import { isToday } from "date-fns";
import { Status, Task } from "../interfaces/interfaces";

export function separateTasks(tasks: Task[], status: Status, daily: boolean) {
  const dailyTasks = new Array<Task>();
  const currentTasks = new Array<Task>();
  const completedTasks = new Array<Task>();

  tasks.map((task) => {
    if (isToday(new Date(task.time)) && task.status === "NOT_COMPLETED") {
      return dailyTasks.push(task);
    }

    if (task.status === "NOT_COMPLETED") {
      return currentTasks.push(task);
    }

    return completedTasks.push(task);
  });

  if (daily) return dailyTasks;

  if (status === "NOT_COMPLETED") return currentTasks;

  return completedTasks;
}

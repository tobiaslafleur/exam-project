import { isToday } from "date-fns";
import { Status, Task, TaskRank } from "../interfaces/interfaces";

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

export function getTaskByStatus(tasks: Task[], status: Status) {
  const taskArray = new Array<Task>();

  tasks.map((task) => {
    if (task.status === status) {
      taskArray.push(task);
    }
  });

  return taskArray;
}

export function getTasksLengthByStatusAndPriority(
  tasks: Task[],
  status: Status,
  priority: TaskRank
) {
  const taskArray = new Array<Task>();

  tasks.map((task) => {
    if (task.status === status && task.priority === priority) {
      taskArray.push(task);
    }
  });

  return taskArray.length;
}

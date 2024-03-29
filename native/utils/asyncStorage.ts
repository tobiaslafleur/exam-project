import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";
import { Task } from "../interfaces/interfaces";

const { getItem, setItem } = useAsyncStorage("@exam/tasks");
const { getItem: getPoints, setItem: setPoints } =
  useAsyncStorage("@exam/points");

export const createTask = async (task: Task) => {
  const currentTasks = await getTasks();

  const tasks = [...currentTasks, task];
  const json = JSON.stringify(tasks);

  await setItem(json);

  return getTasks();
};

export const getTask = async (id: string) => {
  const currentTasks = await getTasks();

  for (let i = 0; i < currentTasks.length; i++) {
    if (currentTasks[i].id === id) {
      return currentTasks[i];
    }
  }
};

export const completeTask = async (id: string) => {
  const currentTasks = await getTasks();

  currentTasks.map(async (task) => {
    if (task.id === id) {
      task.status = "COMPLETED";

      let points = await getUserPoints();

      points = points + task.points;

      await setPoints(JSON.stringify(points));
    }
  });

  const json = JSON.stringify(currentTasks);

  await setItem(json);

  return getTasks();
};

export const postPoneTask = async (id: string) => {
  const currentTasks = await getTasks();

  currentTasks.map((task) => {
    if (task.id === id) {
      const newDate = new Date(task.time);
      newDate.setDate(newDate.getDate() + 1);

      task.time = newDate;
    }
  });

  const json = JSON.stringify(currentTasks);

  await setItem(json);

  return getTasks();
};

export const removeTask = async (id: string) => {
  const currentTasks = await getTasks();

  currentTasks.map((task, index) => {
    if (task.id === id) {
      currentTasks.splice(index, 1);
    }
  });

  const json = JSON.stringify(currentTasks);

  await setItem(json);

  return currentTasks;
};

export const getTasks = async () => {
  const unparsed = await getItem();

  if (!unparsed) return [];

  const tasks: Task[] = await JSON.parse(unparsed);

  tasks.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
  return tasks;
};

export const getUserPoints = async () => {
  const unparsed = await getPoints();
  let points = 0;

  if (unparsed) {
    const currentPoints = JSON.parse(unparsed);
    points = currentPoints;
  }

  return points;
};

export const clearStorage = () => {
  AsyncStorage.multiRemove(["@exam/tasks", "@exam/points"]);

  return [];
};

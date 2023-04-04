import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";
import { Task } from "../interfaces/interfaces";

const { getItem, setItem } = useAsyncStorage("@exam/tasks");

export const createTask = async (task: Task) => {
  const currentTasks = await getTasks();

  const tasks = [...currentTasks, task];
  const json = JSON.stringify(tasks);

  await setItem(json);

  return tasks;
};

export const getTask = async (id: string) => {
  const currentTasks = await getTasks();

  currentTasks.map((task) => {
    if (task.id === id) {
      return task;
    }
  });
};

export const getTasks = async () => {
  const unparsed = await getItem();

  if (!unparsed) return [];

  const tasks: Task[] = await JSON.parse(unparsed);

  return tasks;
};

export const clearStorage = () => {
  AsyncStorage.removeItem("@exam/tasks");

  return [];
};

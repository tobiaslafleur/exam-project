import { useContext, useEffect } from "react";
import { Text } from "react-native";
import { GlobalContext } from "../context/GlobalContext";
import { Status, Task } from "../interfaces/interfaces";
import { getTasks } from "../utils/asyncStorage";
import TaskCard from "./TaskCard";

const TaskList = ({ tasks, status }: { tasks: Task[]; status: Status }) => {
  const { themeStyles } = useContext(GlobalContext);

  useEffect(() => {
    getTasks();
  }, []);

  if (tasks.length < 1) {
    return (
      <Text
        style={{
          marginTop: 15,
          fontSize: 14,
          fontWeight: "400",
          color: themeStyles.text,
          opacity: 0.5,
        }}
      >
        {status === "NOT_COMPLETED"
          ? "You have no current tasks."
          : "You have no recent tasks."}
      </Text>
    );
  }

  return (
    <>
      {tasks.map((task, index) => {
        if (task.status === status) {
          return (
            <TaskCard
              id={task.id}
              key={task.id}
              title={task.title}
              description={task.description}
              points={task.points}
              time={task.time}
              priority={task.priority}
              status={task.status}
            >
              {task.title}
            </TaskCard>
          );
        }
      })}
    </>
  );
};

export default TaskList;

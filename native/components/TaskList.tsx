import { useContext, useEffect } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import { GlobalContext } from "../context/GlobalContext";
import { Status, Task, UpdateMethod } from "../interfaces/interfaces";
import {
  completeTask,
  getTasks,
  postPoneTask,
  removeTask,
} from "../utils/asyncStorage";
import TaskCard from "./TaskCard";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { separateTasks } from "../utils/separateTasks";
import {
  cancelNotifications,
  postPoneNotifications,
} from "../utils/notifications";

let styles: any = null;

const TaskList = ({
  tasks,
  status,
  daily = false,
}: {
  tasks: Task[];
  status: Status;
  daily?: boolean;
}) => {
  const { themeStyles, setTasks } = useContext(GlobalContext);

  styles = themeStyles;

  useEffect(() => {
    getTasks();
  }, []);

  const sortedTasks = separateTasks(tasks, status, daily);

  const handleOnPress = async (method: UpdateMethod, id: string) => {
    if (method === "COMPLETE") {
      setTasks(await completeTask(id));
      cancelNotifications(id);
    }
    if (method === "POSTPONE") {
      setTasks(await postPoneTask(id));
      postPoneNotifications(id);
    }
    if (method === "REMOVE") {
      setTasks(await removeTask(id));
      cancelNotifications(id);
    }
  };

  if (sortedTasks.length < 1) {
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
        {daily
          ? "You have no daily tasks!"
          : status === "NOT_COMPLETED"
          ? "You have no upcoming tasks."
          : "You have no previous tasks."}
      </Text>
    );
  }
  return (
    <>
      {sortedTasks.map((task, index) => {
        if (status === "COMPLETED") {
          return (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              points={task.points}
              time={task.time}
              priority={task.priority}
              status={task.status}
            />
          );
        }

        return (
          <GestureHandlerRootView key={task.id}>
            <Swipeable
              renderRightActions={(progress, dragX) =>
                renderRightActions(progress, dragX, task.id, handleOnPress)
              }
              renderLeftActions={(progress, dragX) =>
                renderLeftActions(progress, dragX, task.id, handleOnPress)
              }
              friction={1.5}
              leftThreshold={80}
              rightThreshold={80}
              overshootLeft={false}
              overshootRight={false}
            >
              <TaskCard
                id={task.id}
                title={task.title}
                description={task.description}
                points={task.points}
                time={task.time}
                priority={task.priority}
                status={task.status}
              />
            </Swipeable>
          </GestureHandlerRootView>
        );
      })}
    </>
  );
};

const renderRightActions = (
  progress: any,
  dragX: any,
  id: string,
  handleOnPress: (method: UpdateMethod, id: string) => void
) => {
  const scale1 = dragX.interpolate({
    inputRange: [-140, -100, 0],
    outputRange: [1, 0, 0],
  });

  return (
    <Animated.View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
        padding: 5,
        borderRadius: 5,
        width: 140,
        opacity: scale1,
      }}
    >
      <TouchableOpacity
        style={{
          marginRight: 15,
        }}
        onPress={() => handleOnPress("POSTPONE", id)}
      >
        <MaterialCommunityIcons
          name="arrow-up-thick"
          color={styles.shouldText}
          size={40}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleOnPress("REMOVE", id)}>
        <MaterialCommunityIcons
          name="trash-can-outline"
          color={styles.mustText}
          size={40}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

const renderLeftActions = (
  progress: any,
  dragX: any,
  id: string,
  handleOnPress: (method: UpdateMethod, id: string) => void
) => {
  const scale = dragX.interpolate({
    inputRange: [60, 100],
    outputRange: [0, 1],
  });

  return (
    <Animated.View
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
        padding: 5,
        borderRadius: 5,
        width: 100,
        opacity: scale,
      }}
    >
      <TouchableOpacity onPress={() => handleOnPress("COMPLETE", id)}>
        <MaterialCommunityIcons
          name="check-bold"
          color={styles.couldText}
          size={40}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default TaskList;

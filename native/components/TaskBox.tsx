import { useContext } from "react";
import { Text, View } from "react-native";
import { GlobalContext } from "../context/GlobalContext";
import { Status, TaskRank } from "../interfaces/interfaces";
import { getTasksLengthByStatusAndPriority } from "../utils/separateTasks";

const TaskBox = ({
  priority,
  status,
  middle,
}: {
  priority: TaskRank;
  status: Status;
  middle?: boolean;
}) => {
  const { themeStyles, tasks } = useContext(GlobalContext);

  const count = getTasksLengthByStatusAndPriority(tasks, status, priority);

  return (
    <View
      style={{
        display: "flex",
        backgroundColor:
          priority == "SHOULD"
            ? themeStyles.shouldBackground
            : priority === "COULD"
            ? themeStyles.couldBackground
            : themeStyles.mustBackground,
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        borderRadius: 5,
        aspectRatio: 1,
        marginHorizontal: middle ? 10 : 0,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "600",
          color: themeStyles.text,
          marginBottom: 2,
        }}
      >
        {count}
      </Text>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "600",
          color: themeStyles.text,
        }}
      >
        {priority}
      </Text>
    </View>
  );
};

export default TaskBox;

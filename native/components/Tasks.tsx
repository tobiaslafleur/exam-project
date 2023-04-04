import { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { GlobalContext } from "../context/GlobalContext";
import { Status } from "../interfaces/interfaces";
import TaskList from "./TaskList";

const Tasks = ({ title, status }: { title: string; status: Status }) => {
  const { themeStyles, tasks } = useContext(GlobalContext);

  return (
    <View
      style={{
        display: "flex",
        width: "100%",
        marginTop: 32,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Text
          style={{ fontSize: 18, fontWeight: "600", color: themeStyles.text }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: "400",
            color: themeStyles.text,
            opacity: 0.5,
          }}
        >
          Show more
        </Text>
      </View>
      <TaskList tasks={tasks} status={status} />
    </View>
  );
};

export default Tasks;

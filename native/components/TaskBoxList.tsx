import { useContext } from "react";
import { Text, View } from "react-native";
import { GlobalContext } from "../context/GlobalContext";
import { Status } from "../interfaces/interfaces";
import TaskBox from "./TaskBox";

const TaskBoxList = ({ title, status }: { title: string; status: Status }) => {
  const { themeStyles } = useContext(GlobalContext);

  return (
    <>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          color: themeStyles.text,
          marginTop: 32,
        }}
      >
        {title}
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <TaskBox priority="COULD" status={status} />
        <TaskBox priority="SHOULD" status={status} middle />
        <TaskBox priority="MUST" status={status} />
      </View>
    </>
  );
};

export default TaskBoxList;

import { ScrollView, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import * as Progress from "react-native-progress";
import { getGreetings } from "../../utils/getGreetings";
import { useTasks } from "../../utils/useTasks";
import Tasks from "../../components/Tasks";

const Home = () => {
  const { themeStyles, user, tasks } = useContext(GlobalContext);
  const [greeting, setGreeting] = useState("");
  const [progress, todayTasks, todayTasksCompleted] = useTasks(tasks);

  useEffect(() => {
    if (user) setGreeting(getGreetings(user.firstName));
  }, [user]);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: 25,
        paddingBottom: 25,
        paddingRight: 20,
        paddingLeft: 20,
        minHeight: "100%",
      }}
      style={{
        backgroundColor: themeStyles.background,
      }}
    >
      <Text
        style={{ fontSize: 24, fontWeight: "700", color: themeStyles.text }}
      >
        {greeting}
      </Text>
      <View style={{ display: "flex", width: "100%", marginTop: 32 }}>
        <Text style={{ marginBottom: 10, color: themeStyles.text }}>
          You have completed {todayTasksCompleted} out of {todayTasks} tasks
          today!
        </Text>
        <Progress.Bar
          style={{ opacity: 0.4 }}
          width={null}
          progress={progress}
          height={15}
          borderRadius={15}
          unfilledColor={"gray"}
          borderWidth={0}
          color={
            progress <= 0.33 ? "red" : progress <= 0.66 ? "orange" : "green"
          }
        />
      </View>
      <Tasks title="Current tasks" status="NOT_COMPLETED" />
      <Tasks title="Recent tasks" status="COMPLETED" />
    </ScrollView>
  );
};

export default Home;

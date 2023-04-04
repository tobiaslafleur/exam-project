import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { tasks } from "../../tempObjects";
import TaskCard from "../../components/TaskCard";
import * as Progress from "react-native-progress";
import { getGreeting } from "../../utils/getGreetings";
import { useTasks } from "../../utils/useTasks";

const Home = () => {
  const { themeStyles, user } = useContext(GlobalContext);
  const [greeting, setGreeting] = useState("");
  const [progress, todayTasks, todayTasksCompleted] = useTasks(tasks);

  useEffect(() => {
    if (user) setGreeting(getGreeting(user.firstName));
  }, [user]);

  return (
    <ScrollView
      contentContainerStyle={[styles.container]}
      style={{
        backgroundColor: themeStyles.background,
      }}
    >
      <Text
        style={{ fontSize: 24, fontWeight: "700", color: themeStyles.text }}
      >
        {greeting}
      </Text>
      <View style={styles.innerContainer}>
        <Text style={{ marginBottom: 10, color: themeStyles.text }}>
          You have completed {todayTasksCompleted} out of {todayTasks} tasks
          today!
        </Text>
        <Progress.Bar
          style={{ opacity: 0.4 }}
          width={null}
          progress={0.4}
          height={15}
          borderRadius={15}
          unfilledColor={"gray"}
          borderWidth={0}
          color={"transparent"}
        />
      </View>
      <View style={styles.innerContainer}>
        <View style={styles.row}>
          <Text
            style={{ fontSize: 18, fontWeight: "600", color: themeStyles.text }}
          >
            Current tasks
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

        {tasks?.length > 0 ? (
          <>
            {tasks?.map((task, i) => {
              if (task.status === "NOT_COMPLETED") {
                return (
                  <TaskCard
                    key={i}
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
        ) : (
          <>
            <Text
              style={{
                marginTop: 15,
                fontSize: 14,
                fontWeight: "400",
                color: themeStyles.text,
                opacity: 0.5,
              }}
            >
              You have no tasks today
            </Text>
          </>
        )}
      </View>
      <View style={styles.innerContainer}>
        <View style={styles.row}>
          <Text
            style={{ fontSize: 18, fontWeight: "600", color: themeStyles.text }}
          >
            Recent tasks
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
        {tasks?.length > 0 ? (
          <>
            {tasks?.map((task, i) => {
              if (task.status === "COMPLETED") {
                return (
                  <TaskCard
                    key={i}
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
        ) : (
          <>
            <Text
              style={{
                marginTop: 15,
                fontSize: 12,
                fontWeight: "400",
                color: themeStyles.text,
                opacity: 0.5,
              }}
            >
              You have no completed tasks
            </Text>
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    paddingBottom: 25,
    paddingRight: 20,
    paddingLeft: 20,
    minHeight: "100%",
  },

  innerContainer: {
    display: "flex",
    width: "100%",
    marginTop: 32,
  },

  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
});

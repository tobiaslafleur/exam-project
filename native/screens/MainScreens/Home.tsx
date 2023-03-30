import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { user, tasks } from "../../tempObjects";
import { Task } from "../../interfaces/interfaces";
import TaskCard from "../../components/task/TaskCard";
import * as Progress from "react-native-progress";

const Home = () => {
  const { themeStyles } = useContext(GlobalContext);
  const [greeting, setGreeting] = useState("");
  const [recent, setRecent] = useState<Task[]>([]);
  const [current, setCurrent] = useState<Task[]>([]);
  const [todayTasks, setTodayTasks] = useState<number>(0);
  const [todayTasksCompleted, setTodayTasksCompleted] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const name = user.firstname; //Temp. Ersätts förmodligen med useContext user.name

  /**
   * Beräknar hur många procent av dagens tasks som är avklarade
   */
  const calcProgress = (): void => {
    let todayTasks = 0;
    let todayTasksCompleted = 0;

    tasks.forEach((task) => {
      if (isSameDayAsToday(task)) {
        todayTasks++;
        task.status === "COMPLETED" ? todayTasksCompleted++ : null;
      }
    });

    const progress = todayTasks > 0 ? todayTasksCompleted / todayTasks : 0;
    setTodayTasks(todayTasks);
    setTodayTasksCompleted(todayTasksCompleted);
    setProgress(progress);
  };

  /**
   * Sätter vilken hälsning som ska visas beroende på tid
   */
  const getGreeting = (): void => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    if (currentHour < 12) {
      setGreeting(`Good morning, ${name}!`);
    } else if (currentHour < 18) {
      setGreeting(`Good afternoon, ${name}!`);
    } else if (currentHour < 22) {
      setGreeting(`Good evening, ${name}!`);
    } else {
      setGreeting(`Good night, ${name}!`);
    }
  };

  /**
   * Kollar om tasks dag är samma dag som idag (kanske behöver fixas)
   */
  function isSameDayAsToday(task: Task): boolean {
    const now = new Date();
    return (
      task.time.getFullYear() === now.getFullYear() &&
      task.time.getMonth() === now.getMonth() &&
      task.time.getDate() === now.getDate()
    );
  }

  /**
   * Separerar tasks beroende på om de är klara eller inte (kanske behöver fixas)
   */
  const seperateTasks = (): void => {
    //Check for todays tasks and the 5(?) most recent tasks
    const todayTasks: Task[] = [];
    const recentTasks: Task[] = [];
    tasks.forEach((task) => {
      if (task.status === "COMPLETED") {
        recentTasks.push(task);
        return;
      }
      if (isSameDayAsToday(task)) todayTasks.push(task);
      else recentTasks.push(task);
    });
    setRecent(recentTasks);
    setCurrent(todayTasks);
  };

  useEffect(() => {
    if (name) getGreeting();
    seperateTasks();
    calcProgress();
  }, [name]);

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: themeStyles.background },
      ]}
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
          width={null}
          progress={progress}
          height={15}
          borderRadius={15}
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

        {current?.length > 0 ? (
          <>
            {current?.map((task) => {
              return (
                <TaskCard
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
        {recent?.length > 0 ? (
          <>
            {recent?.map((task) => {
              return (
                <TaskCard
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
    padding: 15,
    minHeight: Dimensions.get("window").height - 50,
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

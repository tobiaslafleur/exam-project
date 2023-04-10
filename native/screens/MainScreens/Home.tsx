import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import * as Progress from "react-native-progress";
import { getGreeting } from "../../utils/getGreeting";
import Tasks from "../../components/Tasks";
import { clearStorage, getTasks } from "../../utils/asyncStorage";
import { useTasks } from "../../utils/useTasks";
import * as Notifications from "expo-notifications";

const Home = () => {
  const { themeStyles, user, tasks, setTasks } = useContext(GlobalContext);
  const [greeting, setGreeting] = useState("");
  const [progress, todayTasks, todayTasksCompleted] = useTasks(tasks);

  useEffect(() => {
    if (user) setGreeting(getGreeting());
  }, [user]);

  useEffect(() => {
    const fn = async () => {
      setTasks(await getTasks());
    };

    fn();
  }, []);

  const addTask = async () => {
    const tasks = clearStorage();

    setTasks(tasks);
  };

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
          {todayTasks === 0
            ? "Du har inga uppgifter planerade idag!"
            : todayTasks === 1
            ? `Du har klarat din dagliga uppgift!`
            : `Du har klarat ${todayTasksCompleted} av ${todayTasks} uppgifter idag!`}
        </Text>
        <Progress.Bar
          style={{ opacity: 0.8 }}
          width={null}
          progress={progress}
          height={15}
          borderRadius={15}
          unfilledColor={"gray"}
          borderWidth={0}
          color={
            progress <= 0.33
              ? themeStyles.mustText
              : progress <= 0.66
              ? themeStyles.shouldText
              : themeStyles.couldText
          }
        />
      </View>
      <Tasks title="Dagens uppgifter" status="NOT_COMPLETED" daily />
      <Tasks title="Kommande uppgifter" status="NOT_COMPLETED" />
      <Tasks title="Tidigare uppgifter" status="COMPLETED" />
      <TouchableOpacity style={styles.button} onPress={() => addTask()}>
        <Text>Ta bort alla uppgifter</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={async () =>
          console.log(await Notifications.getAllScheduledNotificationsAsync())
        }
      >
        <Text>Print all notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={async () =>
          await Notifications.cancelAllScheduledNotificationsAsync()
        }
      >
        <Text>Remove all notifications</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    marginTop: 20,
  },
  countContainer: {
    alignItems: "center",
    padding: 10,
  },
});

export default Home;

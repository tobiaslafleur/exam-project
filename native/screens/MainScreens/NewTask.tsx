import { Button, Pressable, ScrollView, Text } from "react-native";
import React, { useState, useCallback, useContext } from "react";
import CustomInput from "../../components/CustomInput";
import CustomTimeAndDay from "../../components/CustomTimeAndDay";
import CustomPriority from "../../components/CustomPriority";
import { GlobalContext } from "../../context/GlobalContext";
import { createTask } from "../../utils/asyncStorage";

import "react-native-get-random-values";
import { v4 } from "uuid";
import { TaskRank } from "../../interfaces/interfaces";
import { schedulePushNotifications } from "../../utils/notifications";

const NewTask = ({ navigation }: any) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<TaskRank>("COULD");
  const [datetime, setDatetime] = useState<Date>(new Date());
  const { themeStyles, setTasks } = useContext(GlobalContext);

  const setTitleCallback = useCallback(
    (title: string) => {
      setTitle(title);
    },
    [setTitle]
  );

  const setDescriptionCallback = useCallback(
    (description: string) => {
      setDescription(description);
    },
    [setDescription]
  );

  const setPriorityCallback = useCallback(
    (priority: TaskRank) => {
      setPriority(priority);
    },
    [setPriority]
  );

  const setDateTimeCallback = useCallback(
    (datetime: Date) => {
      setDatetime(datetime);
    },
    [setDatetime]
  );

  const onAddTask = async () => {
    let newline = description.replace(/(\r\n|\n|\r)/gm, " ");
    let final = newline.replace(/  +/g, " ");

    if (title === "") return;

    const taskId = v4();

    const tasks = await createTask({
      id: taskId,
      title: title,
      description: final,
      time: datetime,
      priority: priority,
      points: priority === "COULD" ? 1 : priority === "SHOULD" ? 3 : 5,
      status: "NOT_COMPLETED",
    });
    setTasks(tasks);

    setTitle("");
    setDescription("");

    navigation.navigate("Home");

    schedulePushNotifications(title, final, datetime, taskId);
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="never"
      style={{
        paddingTop: 25,
        paddingBottom: 25,
        paddingRight: 20,
        paddingLeft: 20,
        minHeight: "100%",
        backgroundColor: themeStyles.background,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "700",
          color: themeStyles.text,
          paddingBottom: 20,
        }}
      >
        Skapa en ny uppgift
      </Text>
      <CustomInput
        title="Titel"
        onChangeText={setTitleCallback}
        placeholder="Ex. Ringa doktorn"
        value={title}
      />
      <CustomInput
        multiline
        title="Beskrivning (valfritt)"
        onChangeText={setDescriptionCallback}
        placeholder="Ex. Fråga doktorn om ny medicin"
        value={description}
      />
      <CustomTimeAndDay onSetDate={setDateTimeCallback} />
      <CustomPriority title="Välj prioritet" onPress={setPriorityCallback} />
      <Pressable
        style={{
          width: "100%",
          backgroundColor: themeStyles.accent,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 5,
        }}
        onPress={onAddTask}
      >
        <Text
          style={{ fontSize: 16, fontWeight: "bold", color: themeStyles.text }}
        >
          Lägg till uppgift
        </Text>
      </Pressable>
    </ScrollView>
  );
};

export default NewTask;

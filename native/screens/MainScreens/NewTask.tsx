import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState, useCallback, useContext } from "react";
import CustomInput from "../../components/CustomInput";
import CustomTimeAndDay from "../../components/CustomTimeAndDay";
import CustomPriority from "../../components/CustomPriority";
import CustomButton from "../../components/CustomButton";
import { GlobalContext } from "../../context/GlobalContext";

const NewTask = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [datetime, setDatetime] = useState<Date>();
  const { themeStyles } = useContext(GlobalContext);

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
    (priority: string) => {
      setPriority(priority);
    },
    [setPriority]
  );
  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: 25,
        paddingBottom: 25,
        paddingRight: 20,
        paddingLeft: 20,
        minHeight: "100%",
        backgroundColor: themeStyles.background,
      }}
    >
      <Text
        style={{ fontSize: 24, fontWeight: "700", color: themeStyles.text }}
      >
        Create a new task
      </Text>
      <Text style={{ fontSize: 14, color: themeStyles.text }}>
        Lorem ipsum dolor amet inits polemo.
      </Text>
      <CustomInput
        title="Title"
        onChangeText={setTitleCallback}
        placeholder="Enter title of the task"
        value={title}
      />
      <CustomInput
        title="Description"
        onChangeText={setDescriptionCallback}
        placeholder="Describe your task"
        value={description}
      />
      <CustomTimeAndDay />
      <CustomPriority title="Select priority" onPress={setPriorityCallback} />
      <CustomButton />
    </ScrollView>
  );
};

export default NewTask;

const styles = StyleSheet.create({});

import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Task } from "../interfaces/interfaces";
import { GlobalContext } from "../context/GlobalContext";
import { formatRelative } from "date-fns";
import { sv, enUS } from "date-fns/locale";

const TaskCard = ({
  title,
  description,
  time,
  priority,
  points,
  children,
  status,
}: Task) => {
  const { themeStyles } = useContext(GlobalContext);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            status === "NOT_COMPLETED" ? "red" : themeStyles.secondary,
          opacity: status === "NOT_COMPLETED" ? 1 : 0.25,
        },
      ]}
    >
      <View style={styles.row}>
        <Text style={{ fontSize: 12, color: themeStyles.text, opacity: 0.5 }}>
          {formatRelative(new Date(time), new Date(), { locale: enUS })}
        </Text>
        <Text style={{ color: "blue", fontSize: 10, fontWeight: "600" }}>
          {priority.toUpperCase()}
        </Text>
      </View>
      <Text
        style={{ fontSize: 16, fontWeight: "700", color: themeStyles.text }}
      >
        {title}
      </Text>
      <Text
        style={{ fontSize: 14, fontWeight: "300", color: themeStyles.text }}
      >
        {description}
      </Text>
    </View>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    width: "100%",
    display: "flex",
    backgroundColor: "red",
    marginTop: 15,
    borderRadius: 5,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
});

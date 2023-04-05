import { Text, View } from "react-native";
import React, { useContext } from "react";
import { Task } from "../interfaces/interfaces";
import { GlobalContext } from "../context/GlobalContext";
import { formatRelative } from "date-fns";
import { enUS, sv } from "date-fns/locale";

const TaskCard = ({ title, description, time, priority }: Task) => {
  const { themeStyles } = useContext(GlobalContext);

  return (
    <View
      style={{
        padding: 8,
        width: "100%",
        display: "flex",
        backgroundColor:
          priority === "SHOULD"
            ? themeStyles.shouldBackground
            : priority === "COULD"
            ? themeStyles.couldBackground
            : themeStyles.mustBackground,
        opacity: 1,
        marginTop: 15,
        borderRadius: 5,
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
          style={{
            fontSize: 12,
            color: themeStyles.text,
            opacity: 0.4,
            paddingBottom: 5,
          }}
        >
          {formatRelative(new Date(time), new Date(), { locale: sv })}
        </Text>
        <Text
          style={{
            color:
              priority === "SHOULD"
                ? themeStyles.shouldText
                : priority === "COULD"
                ? themeStyles.couldText
                : themeStyles.mustText,
            fontSize: 12,
            fontWeight: "600",
          }}
        >
          {priority}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "700",
          color: themeStyles.text,
          paddingBottom: 5,
        }}
      >
        {title}
      </Text>
      {description !== "" && (
        <Text
          style={{ fontSize: 14, fontWeight: "300", color: themeStyles.text }}
        >
          {description}
        </Text>
      )}
    </View>
  );
};

export default TaskCard;

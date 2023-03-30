import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Task } from "../../interfaces/interfaces";
import { GlobalContext } from "../../context/GlobalContext";

const TaskCard = ({
  title,
  description,
  time,
  priority,
  points,
  children,
  status,
}: Task) => {
  const [bg, setBg] = useState<string>("");
  const [txt, setTxt] = useState<string>("");
  const [timeString, setTimeString] = useState<string>("");
  const { isDarkMode, themeStyles } = useContext(GlobalContext);

  //Sets the color of the card
  const setColors = (): void => {
    interface Colors {
      [key: string]: {
        light: { bg: string; txt: string };
        dark: { bg: string; txt: string };
      };
    }

    const colors: Colors = {
      Should: {
        light: { bg: "#ECDFC6", txt: "#D0982C" },
        dark: { bg: "#8D6516", txt: "#DEBF52" },
      },
      Could: {
        light: { bg: "#CAE8D0", txt: "#41B74D" },
        dark: { bg: "#294B21", txt: "#41B74D" },
      },
      Must: {
        light: { bg: "#E8CBD1", txt: "#D25252" },
        dark: { bg: "#72332F", txt: "#D25252" },
      },
    };

    const { bg, txt } = isDarkMode
      ? colors[priority].dark
      : colors[priority].light;

    setBg(bg);
    setTxt(txt);
  };

  const determineTimeString = () => {
    const now = new Date();
    const diff = Math.floor(
      (time.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diff === 0) {
      const hours = time.getHours().toString().padStart(2, "0");
      const minutes = time.getMinutes().toString().padStart(2, "0");
      setTimeString(`Today - ${hours}:${minutes}`);
    } else if (diff === 1) {
      setTimeString("Tomorrow");
    } else if (diff === -1) {
      setTimeString("Yesterday");
    } else if (diff > 1) {
      setTimeString(`${diff} days from now`);
    } else {
      setTimeString(`${Math.abs(diff)} days ago`);
    }
  };

  useEffect(() => {
    determineTimeString();
    setColors();
  }, []);
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            status === "NOT_COMPLETED" ? bg : themeStyles.secondary,
          opacity: status === "NOT_COMPLETED" ? 1 : 0.25,
        },
      ]}
    >
      <View style={styles.row}>
        <Text style={{ fontSize: 12, color: themeStyles.text, opacity: 0.5 }}>
          {timeString}
        </Text>
        <Text style={{ color: txt, fontSize: 10, fontWeight: "600" }}>
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

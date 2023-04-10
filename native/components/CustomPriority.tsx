import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
import { Priority, TaskRank } from "../interfaces/interfaces";
import { GlobalContext } from "../context/GlobalContext";

const CustomPriority = ({ title, onPress }: Priority) => {
  const [selected, setSelected] = useState<TaskRank>("COULD");
  const { themeStyles } = useContext(GlobalContext);
  return (
    <View style={{ paddingBottom: 30 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "700",
          color: themeStyles.text,
          paddingBottom: 10,
        }}
      >
        {title}
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={[
            styles.priorityBox,
            {
              backgroundColor: themeStyles.couldBackground,
              opacity: selected === "COULD" ? 1 : 0.3,
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5,
            },
          ]}
          onPress={() => {
            onPress("COULD");
            setSelected("COULD");
          }}
        >
          <Text
            style={{ fontSize: 14, fontWeight: "700", color: themeStyles.text }}
          >
            COULD
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.priorityBox,
            {
              backgroundColor: themeStyles.shouldBackground,
              opacity: selected === "SHOULD" ? 1 : 0.3,
            },
          ]}
          onPress={() => {
            onPress("SHOULD");
            setSelected("SHOULD");
          }}
        >
          <Text
            style={{ fontSize: 14, fontWeight: "700", color: themeStyles.text }}
          >
            SHOULD
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.priorityBox,
            {
              backgroundColor: themeStyles.mustBackground,
              opacity: selected === "MUST" ? 1 : 0.3,
              borderTopRightRadius: 5,
              borderBottomRightRadius: 5,
            },
          ]}
          onPress={() => {
            onPress("MUST");
            setSelected("MUST");
          }}
        >
          <Text
            style={{ fontSize: 14, fontWeight: "700", color: themeStyles.text }}
          >
            MUST
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomPriority;

const styles = StyleSheet.create({
  priorityContainer: {},

  priorityBox: {
    width: 100,
    height: 35,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

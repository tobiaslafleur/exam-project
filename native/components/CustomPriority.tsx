import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
import { Priority } from "../interfaces/interfaces";
import { GlobalContext } from "../context/GlobalContext";

const CustomPriority = ({ title, onPress }: Priority) => {
  const [selected, setSelected] = useState<string>("could");
  const { themeStyles } = useContext(GlobalContext);
  return (
    <View style={{}}>
      <Text
        style={{ fontSize: 16, fontWeight: "700", color: themeStyles.text }}
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
              backgroundColor: "#72D859",
              opacity: selected === "could" ? 1 : 0.1,
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5,
            },
          ]}
          onPress={() => {
            onPress("could");
            setSelected("could");
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: "700", color: "#41B74D" }}>
            COULD
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.priorityBox,
            {
              backgroundColor: "#FAB630",
              opacity: selected === "should" ? 1 : 0.1,
            },
          ]}
          onPress={() => {
            onPress("should");
            setSelected("should");
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: "700", color: "#D0982C" }}>
            SHOULD
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.priorityBox,
            {
              backgroundColor: "#E8645C",
              opacity: selected === "must" ? 1 : 0.1,
              borderTopRightRadius: 5,
              borderBottomRightRadius: 5,
            },
          ]}
          onPress={() => {
            onPress("must");
            setSelected("must");
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: "700", color: "#B03B3B" }}>
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

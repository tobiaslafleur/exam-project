import { ScrollView, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import * as Progress from "react-native-progress";
import TaskBoxList from "../../components/TaskBoxList";
import { getUserPoints } from "../../utils/asyncStorage";

const Overview = () => {
  const { themeStyles, tasks } = useContext(GlobalContext);
  const [points, setPoints] = useState<number>(0);

  useEffect(() => {
    const fetch = async () => {
      setPoints(await getUserPoints());
    };

    fetch();
  }, [tasks]);

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
        Överblick
      </Text>
      <View style={{ display: "flex", width: "100%", marginTop: 32 }}>
        <Text
          style={{ fontSize: 18, fontWeight: "600", color: themeStyles.text }}
        >
          Poängsamling
        </Text>
        <Text
          style={{ marginBottom: 10, color: themeStyles.text, marginTop: 10 }}
        >
          {`Du har samlat ${points} poäng utav 1000 möjliga!`}
        </Text>
        <Progress.Bar
          style={{ opacity: 0.8 }}
          width={null}
          progress={points / 1000}
          height={15}
          borderRadius={15}
          unfilledColor={"gray"}
          borderWidth={0}
          color={
            points / 1000 <= 0.33
              ? themeStyles.mustText
              : points / 1000 <= 0.66
              ? themeStyles.shouldText
              : themeStyles.couldText
          }
        />
      </View>
      <View style={{ display: "flex", width: "100%" }}>
        <TaskBoxList title="Oklarade uppgifter" status="NOT_COMPLETED" />
        <TaskBoxList title="Klarade uppgifter" status="COMPLETED" />
      </View>
    </ScrollView>
  );
};

export default Overview;

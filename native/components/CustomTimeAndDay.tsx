import { StyleSheet, Text, View, Button } from "react-native";
import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import DatePicker from "react-native-date-picker";

const CustomTimeAndDay = () => {
  const { themeStyles } = useContext(GlobalContext);
  const [open, setOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  return (
    <View>
      <Text
        style={{ fontSize: 16, fontWeight: "700", color: themeStyles.text }}
      >
        Set time and date
      </Text>
      <Button title="Open" onPress={() => setOpen(true)} />
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
};

export default CustomTimeAndDay;

const styles = StyleSheet.create({});

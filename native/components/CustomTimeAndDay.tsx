import { Text, View, Button } from "react-native";
import React, { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import { Datetime } from "../interfaces/interfaces";

const CustomTimeAndDay = ({ onSetDate }: Datetime) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date: Date) => {
    date.setSeconds(0);
    setSelectedDate(date);
    onSetDate(date);
    hideDatePicker();
  };

  return (
    <View
      style={{
        padding: 20,
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 20,
          color: "white",
        }}
      >
        {selectedDate
          ? format(selectedDate, "dd/LL/yyyy - HH:mm")
          : "No date selected"}
      </Text>
      <Button title="Select a date" onPress={showDatePicker} />
      <DateTimePickerModal
        date={selectedDate}
        isVisible={datePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        locale={"sv"}
      />
    </View>
  );
};

export default CustomTimeAndDay;

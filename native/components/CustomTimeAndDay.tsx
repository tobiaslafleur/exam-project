import { Text, View, Button, Pressable } from "react-native";
import React, { useContext, useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { intlFormat } from "date-fns";
import { Datetime } from "../interfaces/interfaces";
import { GlobalContext } from "../context/GlobalContext";

const CustomTimeAndDay = ({ onSetDate }: Datetime) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const { themeStyles } = useContext(GlobalContext);

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
    <View style={{ paddingBottom: 20 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "700",
          marginBottom: 10,
          color: "white",
        }}
      >
        Välj datum och tid
      </Text>
      <Pressable
        style={{
          width: "100%",
          backgroundColor: "rgba(128,128,128, 0.35)",
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 5,
        }}
        onPress={showDatePicker}
      >
        <Text
          style={{
            fontSize: 16,
            color: "white",
            fontWeight: "bold",
          }}
        >
          {selectedDate
            ? intlFormat(selectedDate, {
                weekday: "short",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })
            : "Ingen tid vald"}
        </Text>
      </Pressable>

      <DateTimePickerModal
        date={selectedDate}
        isVisible={datePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        locale={"sv"}
        confirmTextIOS={"Välj"}
        cancelTextIOS={"Avbryt"}
      />
    </View>
  );
};

export default CustomTimeAndDay;

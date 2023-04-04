import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useContext } from "react";
import { Input } from "../interfaces/interfaces";
import { GlobalContext } from "../context/GlobalContext";

const CustomInput = ({ onChangeText, title, value, placeholder }: Input) => {
  const { themeStyles } = useContext(GlobalContext);
  return (
    <View>
      <Text
        style={{ fontSize: 16, fontWeight: "700", color: themeStyles.text }}
      >
        {title}
      </Text>
      <View>
        <TextInput
          placeholderTextColor={themeStyles.text}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
        ></TextInput>
      </View>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({});

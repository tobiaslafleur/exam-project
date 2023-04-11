import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useContext } from "react";
import { Input } from "../interfaces/interfaces";
import { GlobalContext } from "../context/GlobalContext";

const CustomInput = ({
  onChangeText,
  title,
  value,
  placeholder,
  multiline,
}: Input) => {
  const { themeStyles } = useContext(GlobalContext);

  return (
    <View style={{ paddingBottom: 20 }}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "700",
          color: themeStyles.text,
          paddingBottom: 10,
        }}
      >
        {title}
      </Text>
      <View>
        {multiline ? (
          <TextInput
            multiline
            placeholderTextColor={themeStyles.placeholderText}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            style={{
              height: 140,
              padding: 10,
              borderRadius: 5,
              color: themeStyles.text,
              backgroundColor: themeStyles.secondary,
              textAlignVertical: "top",
            }}
          />
        ) : (
          <TextInput
            placeholderTextColor={themeStyles.placeholderText}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            style={{
              height: 40,
              padding: 10,
              borderRadius: 5,
              color: themeStyles.text,
              backgroundColor: themeStyles.secondary,
            }}
          />
        )}
      </View>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({});

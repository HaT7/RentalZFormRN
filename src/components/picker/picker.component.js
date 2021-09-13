import React from "react";
import { StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import Icon from "react-native-vector-icons/Entypo.js";
import { TextInput } from "react-native-paper";
import { colors } from "../../infrastructure/theme/colors";
Icon.loadFont();

export const Picker = ({ value, onValueChange, label, items }) => {
  return (
    <TextInput
      mode="outlined"
      label={label}
      value={value}
      render={() => (
        <RNPickerSelect
          items={items}
          selectedValue={value}
          onValueChange={onValueChange}
          placeholder={{ label: "", value: "" }}
          useNativeAndroidPickerStyle={false}
          style={pickerStyles}
          Icon={() => <Icon name="chevron-down" size={24} color="gray" />}
        />
      )}
    />
  );
};

const pickerStyles = StyleSheet.create({
  iconContainer: {
    justifyContent: "center",
    height: "100%",
    marginRight: 5,
  },
  inputIOS: {
    fontSize: 16,
    height: 56,
    paddingHorizontal: 14,
    color: colors.ui.secondary,
    textAlignVertical: "center",
    width: "100%",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    height: 56,
    paddingHorizontal: 14,
    color: colors.ui.secondary,
    textAlignVertical: "center",
    width: "100%",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

import { StyleSheet, TextInput } from "react-native";

const CustomInputText = ({placeholder,style,value,onChangeText,...props}) => (
  <TextInput
    style={[styles.input, style]}
    placeholder={placeholder}
    value={value}
    onChangeText={onChangeText}
    {...props}
  />
);

const styles = StyleSheet.create({
  input: {
    borderWidth: 0,
    borderColor: "transparent",
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
    fontSize: 16,
    backgroundColor: "#fff",
  },
});

export default CustomInputText;

import { StyleSheet, Text } from "react-native";

const CustomText = ({ children, style, variant = "body", ...props }) => {
  const variantStyle = styles[variant] || styles.body;
  return (
    <Text style={[variantStyle, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 28,
    fontWeight: "700",
    color: "#ece9f3ff",
  },
  h2: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
  },
  body: {
    fontSize: 16,
    color: "#333",
  },

});

export default CustomText;

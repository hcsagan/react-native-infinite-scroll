import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");

interface CircleProps {
  text: string;
}

const Circle = ({ text }: CircleProps) => {
  return (
    <View style={styles.circle}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default Circle;

const styles = StyleSheet.create({
  circle: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: width * 0.125,
    margin: (width * 0.4) / 6,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowRadius: width * 0.05,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 0 },
  },
  text: {
    fontSize: 12,
    fontWeight: "200",
  },
});

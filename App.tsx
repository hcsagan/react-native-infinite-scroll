import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Circle from "./src/components/Circle";
import InfiniteScroll from "./src/components/InfiniteScroll";

const { width, height } = Dimensions.get("window");

export default function App() {
  const arr = [
    "S1",
    "asd",
    "s2",
    "şkler",
    "lkfwef",
    "mlfwşf",
    "efşwef",
    "mfel",
    "ödlfe",
    "eşwflef",
    "lğp3f",
    "mşwlv",
    "123r2",
    "rl23ör",
    "wefwewe2",
    "23f23",
    "f32f2",
    "ever43",
    "reverv",
    "34g34",
    "sasasa",
  ];
  return (
    <View style={styles.container}>
      <InfiniteScroll width={width} height={height}>
        <View
          style={{
            flexDirection: "row",
            width,
            height,
            flexWrap: "wrap",
          }}
        >
          {arr.map((item) => (
            <Circle text={item} key={item} />
          ))}
        </View>
      </InfiniteScroll>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

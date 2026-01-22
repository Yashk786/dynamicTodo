import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TodoScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo App</Text>
    </View>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
});

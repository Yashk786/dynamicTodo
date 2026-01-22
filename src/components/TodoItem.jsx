import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onToggle(todo.id)}>
        <Text
          style={[
            styles.text,
            todo.completed && styles.completed,
          ]}
        >
          {todo.title}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => onDelete(todo.id)}>
        <Text style={styles.delete}>✕</Text>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(TodoItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: "space-between",
  },
  text: {
    fontSize: 16,
    color: "#111827",
  },
  completed: {
    textDecorationLine: "line-through",
    color: "#9CA3AF",
  },
  delete: {
    fontSize: 18,
    color: "#EF4444",
    fontWeight: "600",
  },
});

import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const TodoItem = ({ todo, onToggle, onEdit, onDelete }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onToggle(todo.id)} style={styles.textContainer}>
        <Text
          style={[
            styles.text,
            todo.completed && styles.completed,
          ]}
        >
          {todo.title}
        </Text>
      </TouchableOpacity>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onEdit(todo)} style={styles.editButton}>
          <Text style={styles.edit}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(todo.id)}>
          <Text style={styles.delete}>✕</Text>
        </TouchableOpacity>
      </View>
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
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    color: "#111827",
  },
  completed: {
    textDecorationLine: "line-through",
    color: "#9CA3AF",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  editButton: {
    paddingHorizontal: 8,
    marginRight: 4,
  },
  edit: {
    fontSize: 14,
    color: "#6366F1",
    fontWeight: "600",
  },
  delete: {
    fontSize: 18,
    color: "#EF4444",
    fontWeight: "600",
  },
});

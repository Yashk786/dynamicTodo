import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const TodoItem = ({ todo, onToggle, onEdit, onDelete }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={() => onToggle(todo.id)} 
        style={styles.textContainer}
        activeOpacity={0.7}
      >
        <View style={[styles.checkbox, todo.completed && styles.checkboxCompleted]}>
          {todo.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
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
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  checkboxCompleted: {
    backgroundColor: "#6366F1",
    borderColor: "#6366F1",
  },
  checkmark: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    color: "#111827",
    flex: 1,
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

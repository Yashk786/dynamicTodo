import React, { useState, useCallback, useMemo } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TodoScreen = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);

  /**
   * Add or update todo
   */
  const handleSubmit = useCallback(() => {
    if (!input.trim()) return;

    if (editingId) {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === editingId
            ? { ...todo, title: input }
            : todo
        )
      );
      setEditingId(null);
    } else {
      setTodos((prev) => [
        {
          id: Date.now().toString(),
          title: input,
          completed: false,
        },
        ...prev,
      ]);
    }

    setInput("");
  }, [input, editingId]);

  /**
   * Toggle complete
   */
  const toggleTodo = useCallback((id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }, []);

  /**
   * Delete todo
   */
  const deleteTodo = useCallback((id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  /**
   * Start editing
   */
  const startEdit = useCallback((todo) => {
    setInput(todo.title);
    setEditingId(todo.id);
  }, []);

  /**
   * Progress calculation
   */
  const progress = useMemo(() => {
    if (todos.length === 0) return 0;
    const completed = todos.filter((t) => t.completed).length;
    return Math.round((completed / todos.length) * 100);
  }, [todos]);

  /**
   * Render todo item
   */
  const renderItem = ({ item }) => (
    <View style={styles.todoItem}>
      <TouchableOpacity
        style={styles.todoTextWrapper}
        onPress={() => toggleTodo(item.id)}
      >
        <Text
          style={[
            styles.todoText,
            item.completed && styles.completedText,
          ]}
        >
          {item.title}
        </Text>
      </TouchableOpacity>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => startEdit(item)}>
          <Text style={styles.edit}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteTodo(item.id)}>
          <Text style={styles.delete}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Todo App</Text>

        <Text style={styles.progress}>
          Progress: {progress}%
        </Text>

        {/* Input */}
        <View style={styles.inputRow}>
          <TextInput
            placeholder="Enter todo..."
            value={input}
            onChangeText={setInput}
            style={styles.input}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleSubmit}
          >
            <Text style={styles.addText}>
              {editingId ? "Update" : "Add"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Todo List */}
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={styles.empty}>
              No todos yet. Add one!
            </Text>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F9FAFB",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
  },
  progress: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  addButton: {
    marginLeft: 8,
    backgroundColor: "#6366F1",
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  addText: {
    color: "#FFF",
    fontWeight: "600",
  },
  todoItem: {
    backgroundColor: "#FFF",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  todoTextWrapper: {
    flex: 1,
  },
  todoText: {
    fontSize: 16,
    color: "#111827",
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#9CA3AF",
  },
  actions: {
    flexDirection: "row",
    marginLeft: 12,
  },
  edit: {
    marginRight: 12,
    color: "#2563EB",
    fontWeight: "600",
  },
  delete: {
    color: "#DC2626",
    fontWeight: "600",
  },
  empty: {
    textAlign: "center",
    color: "#6B7280",
    marginTop: 40,
  },
});

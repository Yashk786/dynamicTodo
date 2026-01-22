import React, { useState, useCallback, useMemo, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AddTodoInput from "../components/AddTodoInput";
import TodoItem from "../components/TodoItem";
import ProgressBar from "../components/ProgressBar";
import { saveTodos, loadTodos } from "../utils/storage";

const TodoScreen = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [deletedTodo, setDeletedTodo] = useState(null);
  const undoTimeoutRef = useRef(null);
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const getTodos = async () => {
      const saved = await loadTodos();
      setTodos(saved);
    };
    getTodos();
  }, []);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  useEffect(() => {
    return () => {
      if (undoTimeoutRef.current) {
        clearTimeout(undoTimeoutRef.current);
      }
    };
  }, []);

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
    hideUndo();
  }, [input, editingId, hideUndo]);

  const toggleTodo = useCallback((id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }, []);

  const hideUndo = useCallback(() => {
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
    }).start(() => {
      setDeletedTodo(null);
    });
    
    if (undoTimeoutRef.current) {
      clearTimeout(undoTimeoutRef.current);
      undoTimeoutRef.current = null;
    }
  }, [slideAnim]);

  const deleteTodo = useCallback((id) => {
    const todoToDelete = todos.find((todo) => todo.id === id);
    if (todoToDelete) {
      setDeletedTodo(todoToDelete);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
      
      Animated.spring(slideAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();

      if (undoTimeoutRef.current) {
        clearTimeout(undoTimeoutRef.current);
      }

      undoTimeoutRef.current = setTimeout(() => {
        hideUndo();
      }, 5000);
    }
  }, [todos, slideAnim, hideUndo]);

  const undoDelete = useCallback(() => {
    if (deletedTodo) {
      setTodos((prev) => [deletedTodo, ...prev]);
      hideUndo();
    }
  }, [deletedTodo, hideUndo]);

  const startEdit = useCallback((todo) => {
    setInput(todo.title);
    setEditingId(todo.id);
  }, []);

  const progress = useMemo(() => {
    if (todos.length === 0) return 0;
    const completed = todos.filter((t) => t.completed).length;
    return completed / todos.length;
  }, [todos]);

  const completedCount = useMemo(() => {
    return todos.filter((t) => t.completed).length;
  }, [todos]);

  const totalCount = todos.length;

  const renderItem = useCallback(
    ({ item }) => (
      <TodoItem
        todo={item}
        onToggle={toggleTodo}
        onEdit={startEdit}
        onDelete={deleteTodo}
      />
    ),
    [toggleTodo, startEdit, deleteTodo]
  );

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
      <View style={styles.container}>
        <Text style={styles.title}>Todo App</Text>

        <ProgressBar 
          progress={progress} 
          completed={completedCount}
          total={totalCount}
        />

        <AddTodoInput
          value={input}
          onChange={setInput}
          onSubmit={handleSubmit}
          isEditing={!!editingId}
        />

        <FlatList
          data={todos}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={styles.empty}>
              No todos yet. Add one!
            </Text>
          }
          contentContainerStyle={
            todos.length === 0 && styles.emptyContainer
          }
          showsVerticalScrollIndicator={false}
        />

        {deletedTodo && (
          <Animated.View
            style={[
              styles.undoContainer,
              {
                transform: [
                  {
                    translateY: slideAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [100, 0],
                    }),
                  },
                ],
                opacity: slideAnim,
              },
            ]}
          >
            <Text style={styles.undoText}>
              Todo deleted
            </Text>
            <TouchableOpacity onPress={undoDelete} style={styles.undoButton}>
              <Text style={styles.undoButtonText}>Undo</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
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
    color: "#111827",
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  empty: {
    textAlign: "center",
    color: "#6B7280",
    fontSize: 16,
    marginTop: 40,
  },
  undoContainer: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: "#1F2937",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  undoText: {
    color: "#FFF",
    fontSize: 14,
    flex: 1,
  },
  undoButton: {
    marginLeft: 12,
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: "#6366F1",
    borderRadius: 6,
  },
  undoButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
  },
});

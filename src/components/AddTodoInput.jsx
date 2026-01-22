import React, { useState, useCallback } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from "react-native";

const AddTodoInput = ({ onAdd }) => {
  const [text, setText] = useState("");

  const handleAdd = useCallback(() => {
    if (!text.trim()) return;
    onAdd(text.trim());
    setText("");
  }, [text, onAdd]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Add a new todo..."
        value={text}
        onChangeText={setText}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(AddTodoInput);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 12,
  },
  input: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  button: {
    marginLeft: 8,
    backgroundColor: "#6366F1",
    paddingHorizontal: 16,
    justifyContent: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "600",
  },
});

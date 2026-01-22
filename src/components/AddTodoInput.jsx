import React from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from "react-native";

const AddTodoInput = ({ value, onChange, onSubmit, isEditing }) => {
  const handleSubmit = () => {
    if (!value.trim()) return;
    onSubmit();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Add a new todo..."
        value={value}
        onChangeText={onChange}
        style={styles.input}
        onSubmitEditing={handleSubmit}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{isEditing ? "Update" : "Add"}</Text>
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

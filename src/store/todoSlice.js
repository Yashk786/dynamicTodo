import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  input: "",
  editingId: null,
  deletedTodo: null,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    setInput: (state, action) => {
      state.input = action.payload;
    },
    setEditingId: (state, action) => {
      state.editingId = action.payload;
    },
    addTodo: (state, action) => {
      state.todos.unshift(action.payload);
      state.input = "";
    },
    updateTodo: (state, action) => {
      const { id, title } = action.payload;
      const todo = state.todos.find((t) => t.id === id);
      if (todo) {
        todo.title = title;
      }
      state.editingId = null;
      state.input = "";
    },
    toggleTodo: (state, action) => {
      const id = action.payload;
      const todo = state.todos.find((t) => t.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      const id = action.payload;
      const todoToDelete = state.todos.find((t) => t.id === id);
      if (todoToDelete) {
        state.deletedTodo = { ...todoToDelete };
        state.todos = state.todos.filter((t) => t.id !== id);
      }
    },
    undoDelete: (state) => {
      if (state.deletedTodo) {
        state.todos.unshift(state.deletedTodo);
        state.deletedTodo = null;
      }
    },
    clearDeletedTodo: (state) => {
      state.deletedTodo = null;
    },
  },
});

export const {
  setTodos,
  setInput,
  setEditingId,
  addTodo,
  updateTodo,
  toggleTodo,
  deleteTodo,
  undoDelete,
  clearDeletedTodo,
} = todoSlice.actions;

export default todoSlice.reducer;


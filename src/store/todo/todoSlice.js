import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  searchTodos,
  fetchPaginatedTodos,
} from "./todoThunk";

const initialState = {
  todos: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {}, // You can add other reducers if needed
  extraReducers: (builder) => {
    builder
      // Handle fetchTodos async actions
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPaginatedTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPaginatedTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload.todos;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchPaginatedTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle createTodo async actions
      .addCase(createTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos.push(action.payload); // Add newly created todo to state
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle updateTodo async actions
      .addCase(updateTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.todos.findIndex(
          (todo) => todo._id === action.payload._id
        );
        if (index !== -1) {
          state.todos[index] = action.payload; // Update todo in state
        }
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle deleteTodo async actions
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = state.todos.filter((todo) => todo._id !== action.payload); // Remove deleted todo from state
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // 🔍 SEARCH TODOS
      .addCase(searchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(searchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default todoSlice.reducer;

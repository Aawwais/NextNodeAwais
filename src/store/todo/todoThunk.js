import { createAsyncThunk } from "@reduxjs/toolkit";
import { todoRepository } from "../../api/todoRepository"; // Assuming you have the todoRepository

// Async thunk to fetch all todos
export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await todoRepository.getTodos();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle errors
    }
  }
);

// Async thunk to create a new todo
export const createTodo = createAsyncThunk(
  "todos/createTodo",
  async (todoData, { rejectWithValue }) => {
    try {
      const response = await todoRepository.createTodo(todoData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to update an existing todo
export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ id, todoData }, { rejectWithValue }) => {
    try {
      const response = await todoRepository.updateTodo(id, todoData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to delete a todo
export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id, { rejectWithValue }) => {
    try {
      await todoRepository.deleteTodo(id);
      return id; // Return id to remove from state
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//  search todo

export const searchTodos = createAsyncThunk(
  "todos/searchTodos",
  async (query, { rejectWithValue }) => {
    try {
      let response = await todoRepository.searchTodo(query);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
//  search todo

export const fetchPaginatedTodos = createAsyncThunk(
  "todos/fetchPaginatedTodos",
  async (page, { rejectWithValue }) => {
    try {
      let response = await todoRepository.paginationTodos(page);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

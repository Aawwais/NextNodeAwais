import axiosInstance from "./axiosInstance";

// Create a new Todo
const createTodo = (todoData) => {
  return axiosInstance.post("/todos", todoData);
};

// Get all Todos
const getTodos = () => {
  return axiosInstance.get("/todos");
};

// Update a Todo
const updateTodo = (id, todoData) => {
  return axiosInstance.put(`/todos/${id}`, todoData);
};

// Delete a Todo
const deleteTodo = (id) => {
  return axiosInstance.delete(`/todos/${id}`);
};

//  search
const searchTodo = (query) => {
  return axiosInstance.get(`/todos/search/?query=${query}`);
};

//  pagination

const paginationTodos = (page) => {
  return axiosInstance.get(`/todos/pagination?page=${page}`);
};
// Export all functions
export const todoRepository = {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
  searchTodo,
  paginationTodos,
};

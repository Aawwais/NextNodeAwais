"use client";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../../../store/todo/todoThunk";

const Page = () => {
  const dispatch = useDispatch();
  let fileRef = useRef();
  const { todos, loading, error } = useSelector((state) => state.todos);
  const [newTodo, setNewTodo] = useState("");
  const [image, setImage] = useState(null);
  const [editTodo, setEditTodo] = useState(null);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      const formData = new FormData();
      formData.append("title", newTodo);
      if (image) formData.append("image", image);

      dispatch(createTodo(formData));
      setNewTodo("");
      setImage(null);
      fileRef.current.value = null;
    }
  };

  const handleEditTodo = (todo) => {
    setEditTodo(todo);
    setNewTodo(todo.title);
  };

  const handleUpdateTodo = () => {
    if (editTodo && newTodo.trim()) {
      const formData = new FormData();
      formData.append("title", newTodo);
      if (image) formData.append("image", image);

      dispatch(updateTodo({ id: editTodo._id, todoData: formData }));
      setNewTodo("");
      setImage(null);
      setEditTodo(null);
      fileRef.current.value = null;
    }
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-2xl rounded-xl mt-10">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        Todo App with Image Upload
      </h1>

      <div className="mb-4 space-y-3">
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
          placeholder="Add new todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="w-full border border-dashed border-gray-400 p-2 rounded-lg"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button
          onClick={editTodo ? handleUpdateTodo : handleAddTodo}
          className="w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700 transition-all duration-200"
        >
          {editTodo ? "Update Todo" : "Add Todo"}
        </button>
      </div>

      {loading && <p className="text-center text-blue-600">Loading...</p>}
      {error && (
        <div className="text-center text-red-500">
          Error:{" "}
          {typeof error === "string"
            ? error
            : error?.message || "Unknown error"}
        </div>
      )}

      <div className="space-y-4 mt-6">
        {todos.map((todo) => (
          <div
            key={todo._id}
            className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow"
          >
            <div className="flex items-center space-x-4">
              {todo.image && (
                <img
                  src={todo.image}
                  alt="todo"
                  className="w-16 h-16 rounded object-cover border"
                />
              )}
              <span
                className={`text-lg font-medium ${
                  todo.completed
                    ? "line-through text-gray-500"
                    : "text-gray-800"
                }`}
              >
                {todo.title}
              </span>
            </div>
            <div>
              <button
                onClick={() => handleEditTodo(todo)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteTodo(todo)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;

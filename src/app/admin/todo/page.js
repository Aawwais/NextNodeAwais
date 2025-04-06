"use client";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../../../store/todo/todoThunk";
import { FaTimes } from "react-icons/fa"; // Import FontAwesome Times icon for cross

const Page = () => {
  const dispatch = useDispatch();
  let fileRef = useRef();
  const { todos, loading, error } = useSelector((state) => state.todos);
  const [newTodo, setNewTodo] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // To store the image preview
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
      setImagePreview(null); // Reset the image preview
      fileRef.current.value = null;
    }
  };

  const handleEditTodo = (todo) => {
    setEditTodo(todo);
    setNewTodo(todo.title);
    setImagePreview(todo.image);
    fileRef.current.value = null;
  };

  const handleUpdateTodo = () => {
    if (editTodo && newTodo.trim()) {
      const formData = new FormData();
      formData.append("title", newTodo);
      if (image) formData.append("image", image);

      dispatch(updateTodo({ id: editTodo._id, todoData: formData }));
      setNewTodo("");
      setImage(null);
      setImagePreview(null); // Reset the image preview
      setEditTodo(null);
      fileRef.current.value = null;
    }
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result); // Show the image preview
    };
    if (selectedImage) {
      reader.readAsDataURL(selectedImage);
    }
  };

  // Handle image deletion
  const handleDeleteImage = () => {
    setImage(null);
    setImagePreview(null);
    fileRef.current.value = null; // Reset the file input
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
          onChange={handleImageChange}
        />

        {/* Show image preview if available */}
        {imagePreview && (
          <div className="mt-4 relative flex justify-end">
            <img
              src={imagePreview}
              alt="Selected"
              className="w-32 h-32 object-contain rounded-lg border"
            />
            <button
              onClick={handleDeleteImage}
              className="absolute top-0 left-full bg-red-500 text-white p-1 rounded-full"
            >
              <FaTimes size={10} />
            </button>
          </div>
        )}

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
                  className="w-16 h-16 rounded object-contain border"
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
                onClick={() => handleDeleteTodo(todo._id)}
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

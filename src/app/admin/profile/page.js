"use client";
import { updateProfile } from "@/store/auth/authThunk";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user.user);
  console.log(user);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (user) {
      setPhoneNumber(user.phoneNumber || "");
      setPreview(user.profilePicture || "/default-avatar.png");
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("phoneNumber", phoneNumber);
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    dispatch(
      updateProfile({
        data: formData,
        onSuccess: () => {
          console.log("Profile Updated Successfully");
        },
      })
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden shadow-md mb-4">
            <img
              src={preview || "/default-avatar.png"}
              alt="Profile Preview"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            {user?.name || "Your Name"}
          </h2>
          <p className="text-gray-500 text-sm">
            {user?.email || "your@email.com"}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4"
          encType="multipart/form-data"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md shadow-sm transition"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;

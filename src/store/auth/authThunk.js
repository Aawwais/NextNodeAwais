import { authRepository } from "@/api/authRepository";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setCookie } from "cookies-next";
import { toast } from "react-toastify";

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ data, onSuccess }, thunkAPI) => {
    try {
      const response = await authRepository.login(data);
      console.log("response", response);
      if (response) {
        await setCookie("token", response.data.token);
        onSuccess();
        return response.data;
      } else {
        toast.error(response.message);
        return thunkAPI.rejectWithValue(response);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const singupUser = createAsyncThunk(
  "user/register",
  async (data, thunkAPI) => {
    try {
      console.log("data", data);
      const response = await authRepository.register(data);
      if (response) {
        return response.data;
      } else {
        toast.error(response.message);
        return thunkAPI.rejectWithValue(response);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async ({ data, onSuccess }, thunkAPI) => {
    try {
      for (let [key, value] of data.entries()) {
        console.log(`${key}:`, value);
      }
      const response = await authRepository.updateProfile(data);
      console.log("Profile Update Response:", response, data);

      if (response?.data) {
        toast.success("Profile updated successfully! 🎉");
        if (onSuccess) onSuccess(); // optional callback
        return response.data;
      } else {
        toast.error(response?.message || "Update failed");
        return thunkAPI.rejectWithValue(response);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

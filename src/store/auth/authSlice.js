import { createSlice } from "@reduxjs/toolkit";
import { loginUser, singupUser, updateProfile } from "./authThunk";
import { toast } from "react-toastify";
import { setCookie } from "cookies-next";
import Cookies from "js-cookie";

const initialState = {
  user: null,
  isLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      Cookies.remove("token");
      localStorage.removeItem("auth");
    },
    removeExistingUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        toast.success("Login successful!");
        setCookie("token", action.payload.token);
      })

      .addCase(singupUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = {
          ...state.user,
          ...action.payload,
        };
        toast.success("Profile updated successfully!");
      })

      .addMatcher(
        (action) => action.type.startsWith("user/"),
        (state, action) => {
          const status = action.type.split("/")[2];
          switch (status) {
            case "pending":
              state.isLoading = true;
              break;
            case "fulfilled":
              state.isLoading = false;
              break;
            case "rejected":
              state.isLoading = false;
              toast.error("Something went wrong!");
              break;
          }
        }
      );
  },
});

export const { logoutUser, removeExistingUser } = userSlice.actions;
export const resetAllSlices = () => {
  return { type: "RESET_ALL_SLICES" };
};
export default userSlice.reducer;

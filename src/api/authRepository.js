import axiosInstance from "./axiosInstance";

const register = (userData) => {
  return axiosInstance.post("/auth/register", userData);
};

const login = (credentials) => {
  return axiosInstance.post("/auth/login", credentials);
};

const getUser = () => {
  return axiosInstance.get("/auth/user");
};

const logout = () => {
  return axiosInstance.post("/auth/logout");
};

// Export all functions
export const authRepository = {
  register,
  login,
  getUser,
  logout,
};

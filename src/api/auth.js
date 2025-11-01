import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE + "/api/auth";

export const loginUser = async (userData) => {
  const res = await axios.post(`${API_URL}/login`, userData);
  return res.data;
};

export const registerUser = async (userData) => {
  const res = await axios.post(`${API_URL}/signup`, userData);
  return res.data;
};

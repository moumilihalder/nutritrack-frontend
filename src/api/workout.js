import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";
const URL = `${API_BASE}/api/workouts`;

const getToken = () => localStorage.getItem("token");

export const fetchWorkouts = async () => {
  const res = await axios.get(URL, { headers: { Authorization: `Bearer ${getToken()}` } });
  return res.data;
};

export const createWorkout = async (payload) => {
  const res = await axios.post(URL, payload, { headers: { Authorization: `Bearer ${getToken()}` } });
  return res.data;
};

export const editWorkout = async (id, payload) => {
  const res = await axios.put(`${URL}/${id}`, payload, { headers: { Authorization: `Bearer ${getToken()}` } });
  return res.data;
};

export const removeWorkout = async (id) => {
  const res = await axios.delete(`${URL}/${id}`, { headers: { Authorization: `Bearer ${getToken()}` } });
  return res.data;
};

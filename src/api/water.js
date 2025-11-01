import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";
const API_URL = `${API_BASE}/api/water`;

export const getWater = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const upsertWater = async (glasses) => {
  const token = localStorage.getItem("token");
  const res = await axios.post(
    API_URL,
    { glasses },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};

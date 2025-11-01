import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TrackProgress = ({ compact }) => {
  const [data, setData] = useState([]);
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState("");
  const [calories, setCalories] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token") || user?.token;

  
  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

 
  const fetchProgress = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${API_BASE}/api/track`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(res.data);
    } catch (err) {
      console.error("❌ Error fetching progress:", err);
      if (err.response?.status === 401) {
        alert("Session expired. Please log in again.");
        localStorage.clear();
        window.location.href = "/login";
      }
    }
  };

  useEffect(() => {
    fetchProgress();
  }, [token]);


  const handleAddProgress = async (e) => {
    e.preventDefault();
    if (!weight || !bmi) {
      alert("Please enter both weight and BMI!");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/track`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ weight, bmi, calories }),
      });

      const result = await res.json();

      if (res.ok) {
        alert("Progress added successfully!");
        setWeight("");
        setBmi("");
        setCalories("");
        fetchProgress();
      } else {
        console.error("❌ Error response:", result);
        alert(result.message || "Failed to save progress");
      }
    } catch (err) {
      console.error("❌ Error adding progress:", err);
      alert("Something went wrong. Try again later.");
    }
  };

  
  const containerClasses = compact
    ? "bg-gray-50 dark:bg-gray-900 flex flex-col items-center p-2 space-y-3 text-sm transition-colors duration-300"
    : "min-h-screen bg-gray-50 dark:bg-gray-900 p-6 flex flex-col items-center transition-colors duration-300";

  const cardClasses = compact
    ? "bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 w-full max-w-md transition-colors duration-300"
    : "bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8 w-full max-w-md transition-colors duration-300";

  const chartClasses = compact
    ? "bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 w-full max-w-3xl transition-colors duration-300"
    : "bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 w-full max-w-4xl transition-colors duration-300";

  return (
    <div className={containerClasses}>
      <h1
        className={`font-bold text-green-700 dark:text-green-400 ${compact ? "text-lg mb-3" : "text-3xl mb-8"}`}
      >
        Your Fitness Progress
      </h1>

      <form onSubmit={handleAddProgress} className={cardClasses}>
        <h2
          className={`text-gray-700 dark:text-gray-200 font-semibold mb-3 ${compact ? "text-base" : "text-xl"}`}
        >
          Add New Progress
        </h2>

        <input
          type="number"
          step="0.1"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-1.5 mb-2 text-sm
                     text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 
                     bg-transparent focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          required
        />

        <input
          type="number"
          step="0.1"
          placeholder="BMI"
          value={bmi}
          onChange={(e) => setBmi(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-1.5 mb-2 text-sm
                     text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 
                     bg-transparent focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          required
        />

        <input
          type="number"
          step="0.1"
          placeholder="Calories (optional)"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-1.5 mb-3 text-sm
                     text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 
                     bg-transparent focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
        >
          Add Record
        </button>
      </form>

      {data.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300 text-sm mt-4">
          No progress data yet. Add your first record!
        </p>
      ) : (
        <div className={chartClasses}>
          <ResponsiveContainer width="100%" height={compact ? 220 : 350}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
              <XAxis dataKey="date" tickFormatter={(d) => new Date(d).toLocaleDateString()} stroke="currentColor" />
              <YAxis stroke="currentColor" />
              <Tooltip
                labelFormatter={(d) => new Date(d).toLocaleDateString()}
                contentStyle={{
                  backgroundColor: "#1f2937",
                  color: "#fff",
                  borderRadius: "8px",
                }}
              />
              <Line type="monotone" dataKey="weight" stroke="#16a34a" strokeWidth={2} name="Weight (kg)" />
              <Line type="monotone" dataKey="bmi" stroke="#8884d8" strokeWidth={2} name="BMI" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default TrackProgress;

import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import BMICheck from "./BMICheck.jsx";
import DietPlan from "./DietPlan.jsx";
import TrackProgress from "./TrackProgress.jsx";
import FoodCaloriesList from "./FoodCaloriesList.jsx";
import WaterTracker from "../components/WaterTracker.jsx";
import WorkoutTracker from "./WorkoutTracker.jsx";
import CustomDietPlanner from "./CustomDietPlanner.jsx";
import { useTheme } from "../hooks/useTheme.js";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { theme, toggleTheme } = useTheme();

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!user) navigate("/login");
  }, [navigate, user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 relative transition-colors duration-300">
      <div
        className={`fixed md:static top-0 left-0 z-50 h-full bg-green-600 text-white transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        style={{ width: 240 }}
      >
        <Sidebar onLogout={handleLogout} onClose={() => setSidebarOpen(false)} />
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {!sidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="md:hidden fixed top-3 left-3 z-50 text-xl bg-green-700 text-white px-2 py-1 rounded-md shadow-md"
          style={{
            fontSize: "18px",
            lineHeight: "18px",
          }}
        >
          ☰
        </button>
      )}

      <div className="flex-1 md:ml-[240px] flex flex-col h-screen overflow-hidden">
        <main className="flex-1 overflow-auto relative">
          <div className="absolute top-3 right-4 z-50 flex flex-col gap-2 items-end">
            <button
              onClick={toggleTheme}
              className="border border-gray-300 dark:border-gray-700 px-3 py-2 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
            </button>
          </div>

          <div className="min-h-screen flex flex-col justify-center items-center p-6 xl:items-start xl:pl-16">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full max-w-3xl text-center mb-6 transition-colors">
              <h1 className="text-2xl font-semibold text-green-700 dark:text-green-400">
                Welcome, {user?.name || "User"} 👋
              </h1>
              <p className="text-gray-700 dark:text-gray-200 text-sm mt-3">
                <span className="font-medium text-green-700 dark:text-green-400">
                  Gender:
                </span>{" "}
                {user?.gender || "N/A"}{" "}
                <span className="font-medium text-green-700 dark:text-green-400">|</span>{" "}
                <span className="font-medium text-green-700 dark:text-green-400">
                  Age:
                </span>{" "}
                {user?.age || "N/A"}{" "}
                <span className="font-medium text-green-700 dark:text-green-400">|</span>{" "}
                <span className="font-medium text-green-700 dark:text-green-400">
                  Email:
                </span>{" "}
                {user?.email || "N/A"}
              </p>
            </div>

            <div className="w-full max-w-3xl">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-colors">
                <Routes>
                  <Route
                    index
                    element={
                      <div className="flex flex-col items-center text-center space-y-4">
                        <p className="text-gray-600 dark:text-gray-300">
                          Select an option from the sidebar.
                        </p>

                        <button
                          onClick={() => navigate("/")}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow-md transition duration-200"
                        >
                          Back to Home Page
                        </button>
                      </div>
                    }
                  />
                  <Route path="bmi" element={<BMICheck />} />
                  <Route path="diet" element={<DietPlan />} />
                  <Route path="progress" element={<TrackProgress />} />
                  <Route path="food-list" element={<FoodCaloriesList />} />
                  <Route path="water-tracker" element={<WaterTracker />} />
                  <Route path="workout-tracker" element={<WorkoutTracker />} />
                  <Route path="custom-diet-planner" element={<CustomDietPlanner />} />
                </Routes>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

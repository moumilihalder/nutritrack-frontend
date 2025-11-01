import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import BMICheck from "./pages/BMICheck.jsx";
import DietPlan from "./pages/DietPlan.jsx";
import TrackProgress from "./pages/TrackProgress.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectRoute from "./components/ProtectRoute.jsx";
import FoodCaloriesList from "./pages/FoodCaloriesList.jsx";
import WaterTracker from "./components/WaterTracker.jsx";
import WorkoutTracker from "./pages/WorkoutTracker.jsx";
import NotificationManager from "./components/NotificationManager.jsx";
import "./App.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard/*"
          element={
            <ProtectRoute>
              <Dashboard />
            </ProtectRoute>
          }
        />
        <Route
          path="/bmi"
          element={
            <ProtectRoute>
              <BMICheck />
            </ProtectRoute>
          }
        />
        <Route
          path="/diet"
          element={
            <ProtectRoute>
              <DietPlan />
            </ProtectRoute>
          }
        />
        <Route
          path="/progress"
          element={
            <ProtectRoute>
              <TrackProgress />
            </ProtectRoute>
          }
        />
      <Route
          path="/food-calories"
          element={
            <ProtectRoute>
              <FoodCaloriesList />
            </ProtectRoute>
          }
        />
        <Route
          path="/water-tracker"
          element={
            <ProtectRoute>
              <WaterTracker />
            </ProtectRoute>
          }
        />
        <Route
          path="/workout-tracker"
          element={
            <ProtectRoute>
              <WorkoutTracker />
            </ProtectRoute>
          }
        />
      </Routes>
      <NotificationManager />
    </div>
  );
}

export default App;

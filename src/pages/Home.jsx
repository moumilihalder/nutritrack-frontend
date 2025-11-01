import React, { useState } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [featureOpen, setFeatureOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));


  const handleFeatureClick = (path) => {
    if (!user) {
      alert("⚠️ You must log in to access this feature!");
      return;
    }
    navigate(path);
    setFeatureOpen(false);
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 shadow-sm relative transition-colors duration-300">
        <div className="flex items-center space-x-2">
          <div className="text-green-600 text-2xl">🍏</div>
          <h1 className="text-2xl font-semibold">NutriTrack</h1>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-gray-700 dark:text-gray-100 font-medium relative">
          <li>
            <Link to="/" className="hover:text-green-600">Home</Link>
          </li>

          {/* Features Dropdown */}
          <li className="relative">
            <button
              onClick={() => setFeatureOpen(!featureOpen)}
              className="flex items-center hover:text-green-600"
            >
              Features
              <svg
                className={`w-4 h-4 ml-1 transform transition-transform ${featureOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {featureOpen && (
              <ul className="absolute top-8 left-0 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-md w-48 py-2 z-50">
                <li>
                  <button
                    onClick={() => handleFeatureClick("/dashboard/bmi")}
                    className={`block w-full text-left px-4 py-2 ${user
                        ? "hover:bg-green-50 hover:text-green-600 dark:hover:bg-gray-600"
                        : "text-gray-400 cursor-not-allowed"
                      }`}
                  >
                    BMI Check
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleFeatureClick("/dashboard/diet")}
                    className={`block w-full text-left px-4 py-2 ${user
                        ? "hover:bg-green-50 hover:text-green-600 dark:hover:bg-gray-600"
                        : "text-gray-400 cursor-not-allowed"
                      }`}
                  >
                    Diet Plan
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleFeatureClick("/dashboard/progress")}
                    className={`block w-full text-left px-4 py-2 ${user
                        ? "hover:bg-green-50 hover:text-green-600 dark:hover:bg-gray-600"
                        : "text-gray-400 cursor-not-allowed"
                      }`}
                  >
                    Track Progress
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleFeatureClick("/dashboard/food-list")}
                    className={`block w-full text-left px-4 py-2 ${user
                        ? "hover:bg-green-50 hover:text-green-600 dark:hover:bg-gray-600"
                        : "text-gray-400 cursor-not-allowed"
                      }`}
                  >
                    Food Calories
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleFeatureClick("/dashboard/water-tracker")}
                    className={`block w-full text-left px-4 py-2 ${user
                        ? "hover:bg-green-50 hover:text-green-600 dark:hover:bg-gray-600"
                        : "text-gray-400 cursor-not-allowed"
                      }`}
                  >
                    Water Tracker
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleFeatureClick("/dashboard/workout-tracker")}
                    className={`block w-full text-left px-4 py-2 ${user
                        ? "hover:bg-green-50 hover:text-green-600 dark:hover:bg-gray-600"
                        : "text-gray-400 cursor-not-allowed"
                      }`}
                  >
                    Workout Tracker
                  </button>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link to="/about" className="hover:text-green-600">About</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-green-600">Contact</Link>
          </li>
        </ul>

        {/* Right side buttons (Theme + Login/Logout) */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
          </button>

          {/* Login / Logout */}
          {!user ? (
            <Link
              to="/login"
              className="hidden md:block ml-4 border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={() => {
                localStorage.removeItem("user");
                window.location.reload();
              }}
              className="hidden md:block ml-4 border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              Logout
            </button>
          )}
        </div>

        <button
          className="md:hidden text-gray-700 dark:text-gray-200 text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </button>

        {menuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white dark:bg-gray-800 shadow-md z-50 flex flex-col items-center py-4 space-y-4 md:hidden">
            <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-green-600" onClick={() => setMenuOpen(false)}>Home</Link>

            {/* Mobile Features Dropdown */}
            <div className="w-full flex flex-col items-center">
              <button
                onClick={() => setFeatureOpen(!featureOpen)}
                className="flex items-center justify-center text-gray-700 dark:text-gray-200 hover:text-green-600 font-medium"
              >
                Features
                <svg
                  className={`w-4 h-4 ml-1 transform transition-transform ${featureOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {featureOpen && (
                <div className="mt-2 w-48 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-md text-gray-800 dark:text-gray-200">
                  <button
                    onClick={() => handleFeatureClick("/dashboard/bmi")}
                    className={`block w-full px-4 py-2 text-center ${user
                        ? "hover:bg-green-50 hover:text-green-600 dark:hover:bg-gray-600"
                        : "text-gray-400 cursor-not-allowed"
                      }`}
                  >
                    BMI Check
                  </button>
                  <button
                    onClick={() => handleFeatureClick("/dashboard/diet")}
                    className={`block w-full px-4 py-2 text-center ${user
                        ? "hover:bg-green-50 hover:text-green-600 dark:hover:bg-gray-600"
                        : "text-gray-400 cursor-not-allowed"
                      }`}
                  >
                    Diet Plan
                  </button>
                  <button
                    onClick={() => handleFeatureClick("/dashboard/custom-diet-planner")}
                    className={`block w-full px-4 py-2 text-center ${user
                        ? "hover:bg-green-50 hover:text-green-600 dark:hover:bg-gray-600"
                        : "text-gray-400 cursor-not-allowed"
                      }`}
                  >
                    Custom Diet Planner
                  </button>
                  <button
                    onClick={() => handleFeatureClick("/dashboard/progress")}
                    className={`block w-full px-4 py-2 text-center ${user
                        ? "hover:bg-green-50 hover:text-green-600 dark:hover:bg-gray-600"
                        : "text-gray-400 cursor-not-allowed"
                      }`}
                  >
                    Track Progress
                  </button>
                </div>
              )}
            </div>

            <Link to="/about" className="text-gray-700 dark:text-gray-200 hover:text-green-600" onClick={() => setMenuOpen(false)}>About</Link>
            <Link to="/contact" className="text-gray-700 dark:text-gray-200 hover:text-green-600" onClick={() => setMenuOpen(false)}>Contact</Link>

            {!user ? (
              <Link
                to="/login"
                className="border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={() => {
                  localStorage.removeItem("user");
                  window.location.reload();
                }}
                className="border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-8 lg:px-20 py-16 bg-white dark:bg-gray-800 rounded-3xl shadow-sm mt-6 mx-4 lg:mx-10 transition-colors duration-300">
        <div className="lg:w-1/2 space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900 dark:text-gray-100">
            Track your nutrition,<br />weight, and health
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Personalized diet and fitness for everyone
          </p>
          <button
            onClick={() => navigate(user ? "/dashboard" : "/login")}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            {user ? "Go to Dashboard" : "Get Started"}
          </button>
        </div>

        {/* Right Image */}
        <div className="lg:w-1/2 mb-8 lg:mb-0 flex justify-center">
          <img src={assets.image} alt="Illustration" className="w-auto h-70" />
        </div>
      </section>

      {/* Features Section */}
      <section className="px-8 lg:px-20 py-12 bg-white dark:bg-gray-800 rounded-3xl shadow-sm mt-6 mx-4 lg:mx-10 transition-colors duration-300">
        <h3 className="text-2xl font-bold mb-8">Features</h3>
        <div className="grid md:grid-cols-3 gap-5 text-center md:text-left">
          {/* BMI Check */}
          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="text-3xl text-green-600">❤️</div>
            <h4 className="text-xl font-semibold">BMI Check</h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Calculate your Body Mass Index (BMI) to assess whether you are
              underweight, normal, or overweight.
            </p>
          </div>

          {/* Diet Plan */}
          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="text-3xl text-green-600">🍽️</div>
            <h4 className="text-xl font-semibold">Diet Plan</h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Get personalized diet plans based on your BMI and health goals.
            </p>
          </div>

          {/* Track Progress */}
          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="text-3xl text-green-600">📈</div>
            <h4 className="text-xl font-semibold">Track Progress</h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Monitor your progress by tracking your daily calorie intake and weight.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

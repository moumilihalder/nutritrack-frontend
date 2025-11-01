import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold text-green-600 mb-4">About NutriTrack</h1>
      <p className="text-gray-700 max-w-lg text-center mb-8">
        NutriTrack helps you monitor your health, create personalized diet plans,
        and track your daily progress with ease.
      </p>

      <Link
        to="/"
        className="mt-4 bg-green-100 text-green-700 px-5 py-2 rounded-lg hover:bg-green-200 transition"
      >
        ← Back to Home
      </Link>
    </div>
  );
};

export default About;

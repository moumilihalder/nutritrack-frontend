import React from "react";
import { Link } from "react-router-dom";

const DietPlan = () => {
  const diet = [
    {
      day: "Monday",
      meals: [
        "Breakfast: Oats with milk and fruits",
        "Lunch: Brown rice with grilled chicken & salad",
        "Dinner: Vegetable soup and wheat roti",
      ],
    },
    {
      day: "Tuesday",
      meals: [
        "Breakfast: Poha with peanuts",
        "Lunch: Quinoa with dal and mixed vegetables",
        "Dinner: Grilled paneer with salad",
      ],
    },
    {
      day: "Wednesday",
      meals: [
        "Breakfast: Smoothie with banana and oats",
        "Lunch: Chapati with sabzi and dal",
        "Dinner: Vegetable stir-fry with tofu",
      ],
    },
    {
      day: "Thursday",
      meals: [
        "Breakfast: Boiled eggs and toast",
        "Lunch: Brown rice with rajma",
        "Dinner: Clear soup and steamed vegetables",
      ],
    },
    {
      day: "Friday",
      meals: [
        "Breakfast: Upma with veggies",
        "Lunch: Millet khichdi with curd",
        "Dinner: Light dal soup and salad",
      ],
    },
    {
      day: "Saturday",
      meals: [
        "Breakfast: Paratha with curd",
        "Lunch: Grilled fish/chicken with rice",
        "Dinner: Roasted veggies and soup",
      ],
    },
    {
      day: "Sunday",
      meals: [
        "Breakfast: Pancakes with honey",
        "Lunch: Rice, dal, and sabzi",
        "Dinner: Fruit salad and soup",
      ],
    },
  ];

  return (
    <div className="w-full flex flex-col items-center p-2 md:p-4">
      <h1 className="text-2xl md:text-3xl font-bold text-green-700 mb-6 text-center">
        7-Day Diet Plan
      </h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center w-full">
        {diet.map((item) => (
          <div
            key={item.day}
            className="bg-green-50 shadow-md rounded-xl p-4 border border-green-100 w-full max-w-[250px] mx-auto transition-transform hover:scale-[1.02]"
          >
            <h2 className="text-lg font-semibold text-green-600 mb-2 text-center">
              {item.day}
            </h2>
            <ul className="text-gray-700 space-y-1 text-sm">
              {item.meals.map((meal, i) => (
                <li key={i}>• {meal}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Link
        to="/dashboard"
        className="mt-6 inline-block bg-green-100 text-green-700 font-medium px-5 py-2 rounded-lg hover:bg-green-200 transition"
      >
        ← Back to Dashboard
      </Link>
    </div>
  );
};

export default DietPlan;

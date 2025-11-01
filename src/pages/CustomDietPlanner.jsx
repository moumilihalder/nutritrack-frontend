import React, { useState, useEffect } from "react";

const CustomDietPlanner = () => {
  const [calories, setCalories] = useState("");
  const [preference, setPreference] = useState("");
  const [allergies, setAllergies] = useState("");
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    document.title = "Custom Diet Planner | NutriTrack";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!calories || !preference) {
      alert("⚠️ Please enter your calorie goal and dietary preference.");
      return;
    }

    const vegMeals = [
      { meal: "Breakfast", items: "Oats with fruits + Almonds" },
      { meal: "Lunch", items: "Brown rice + Mixed veg curry + Curd" },
      { meal: "Dinner", items: "Roti + Paneer + Salad" },
    ];

    const nonVegMeals = [
      { meal: "Breakfast", items: "Boiled eggs + Toast + Banana" },
      { meal: "Lunch", items: "Grilled chicken + Rice + Veg salad" },
      { meal: "Dinner", items: "Fish curry + Roti + Soup" },
    ];

    const basePlan = preference === "veg" ? vegMeals : nonVegMeals;

    const filtered = allergies
      ? basePlan.map((m) => ({
        ...m,
        items: m.items
          .split("+")
          .map((i) => i.trim())
          .filter((i) => !i.toLowerCase().includes(allergies.toLowerCase()))
          .join(" + "),
      }))
      : basePlan;

    const generatedPlan = {
      calories,
      preference,
      allergies,
      meals: filtered,
    };

    setPlan(generatedPlan);
    localStorage.setItem("customDiet", JSON.stringify(generatedPlan));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors p-6">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-2xl text-center transition-colors">
        <h1 className="text-2xl font-semibold text-green-600 dark:text-green-400 mb-4">
          🥗 Custom Diet Planner
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            placeholder="Enter your daily calorie goal"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:outline-none"
          />

          <select
            value={preference}
            onChange={(e) => setPreference(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:outline-none"
          >
            <option value="">Select Dietary Preference</option>
            <option value="veg">Vegetarian</option>
            <option value="non-veg">Non-Vegetarian</option>
          </select>

          <input
            type="text"
            placeholder="Enter allergies (e.g. egg, milk, nuts)"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:outline-none"
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition"
          >
            🍽️ Generate Diet Plan
          </button>
        </form>

        {plan && (
          <div className="mt-8 text-left">
            <h2 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-3">
              Your Personalized Diet Plan
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              <strong>Calories:</strong> {plan.calories} kcal/day
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              <strong>Preference:</strong>{" "}
              {plan.preference === "veg" ? "Vegetarian" : "Non-Vegetarian"}
            </p>
            {plan.allergies && (
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>Allergies:</strong> {plan.allergies}
              </p>
            )}
            <ul className="space-y-2">
              {plan.meals.map((m, index) => (
                <li
                  key={index}
                  className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md shadow-sm"
                >
                  <strong>{m.meal}:</strong> {m.items}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={() => (window.location.href = "/dashboard")}
          className="mt-6 w-full bg-gray-400 hover:bg-gray-500 text-white py-2 rounded-md transition"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default CustomDietPlanner;

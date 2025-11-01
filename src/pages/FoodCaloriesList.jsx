import React, { useState } from "react";

const FoodCaloriesList = () => {
  const [query, setQuery] = useState("");
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchFoodCalories = async (foodName) => {
    if (!foodName) {
      setError("Please enter a food name.");
      return;
    }

    setLoading(true);
    setError("");
    setFoods([]);

    try {
     const API_KEY = import.meta.env.VITE_FOOD_API_KEY;

      const searchUrl = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(
        foodName
      )}&pageSize=5&api_key=${API_KEY}`;

      const res = await fetch(searchUrl);
      if (!res.ok) throw new Error("Failed to fetch data");

      const data = await res.json();

      if (!data.foods || data.foods.length === 0) {
        setError("No food found. Try another item.");
      } else {
        setFoods(data.foods);
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching food data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchFoodCalories(query);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-4 md:p-6 rounded-xl shadow-sm min-h-screen transition-colors duration-300">
      <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-6 text-center">
        🥗 Food & Calorie Finder
      </h2>
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row gap-3 justify-center mb-6"
      >
        <input
          type="text"
          placeholder="Search food (e.g., apple, pizza, rice)"
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-green-500 
                     text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 
                     bg-transparent transition"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Search
        </button>
      </form>

      {loading && (
        <p className="text-center text-gray-700 dark:text-gray-300 font-medium">
          Loading...
        </p>
      )}
      {error && (
        <p className="text-center text-red-500 font-medium">{error}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {foods.map((food, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-lg transition-colors duration-300"
          >
            <h3 className="text-lg font-semibold text-green-700 dark:text-green-400 mb-2">
              {food.description}
            </h3>

            {food.foodNutrients?.length > 0 ? (
              <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
                {food.foodNutrients.slice(0, 5).map((nutrient, index) => (
                  <li key={index}>
                    <strong>{nutrient.nutrientName}:</strong>{" "}
                    {nutrient.value} {nutrient.unitName}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                No nutrition data found.
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodCaloriesList;

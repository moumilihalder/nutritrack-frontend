import React, { useEffect, useState } from "react";
import { getWater, upsertWater } from "../api/water";

const WaterTracker = () => {
  const [glasses, setGlasses] = useState(0);
  const GOAL = 8;

  useEffect(() => {
    const fetchWater = async () => {
      try {
        const data = await getWater();
        setGlasses(data.glasses || 0);
      } catch (error) {
        console.error("Error fetching water data:", error);
      }
    };
    fetchWater();
  }, []);

  const handleClickGlass = async () => {
    try {
      const newCount = glasses + 1;
      setGlasses(newCount);
      await upsertWater(newCount);
    } catch (error) {
      console.error("Could not save water data:", error);
      alert("Could not save water data. Try again.");
    }
  };

  const progressPercent = Math.min((glasses / GOAL) * 100, 100);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 dark:bg-gray-900 transition-colors duration-300 p-6">
      <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-2xl shadow-lg p-6 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-400">
          💧 Water Tracker
        </h2>

        <p className="mb-4 text-lg font-medium">
          You’ve had{" "}
          <span className="text-green-600 dark:text-green-300 font-semibold">
            {glasses}
          </span>{" "}
          of {GOAL} glasses today!
        </p>

        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-4 overflow-hidden">
          <div
            className="bg-green-500 h-4 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        <button
          onClick={handleClickGlass}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-xl shadow-md transition duration-300"
        >
          + Add Glass
        </button>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {[...Array(GOAL)].map((_, index) => (
            <span
              key={index}
              className={`text-3xl transition ${index < glasses ? "opacity-100" : "opacity-30"
                }`}
            >
              🥛
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WaterTracker;

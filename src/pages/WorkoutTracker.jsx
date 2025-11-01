import React, { useEffect, useState } from "react";
import { fetchWorkouts, createWorkout, editWorkout, removeWorkout } from "../api/workout.js";
import dayjs from "dayjs";

const WorkoutTracker = () => {
  const [workouts, setWorkouts] = useState([]);
  const [exercise, setExercise] = useState("");
  const [duration, setDuration] = useState("");
  const [calories, setCalories] = useState("");
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetchWorkouts();
      setWorkouts(res.data || []);
    } catch (err) {
      console.error("Error loading workouts:", err);
      alert("Failed to load workouts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const resetForm = () => {
    setExercise("");
    setDuration("");
    setCalories("");
    setDate(dayjs().format("YYYY-MM-DD"));
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!exercise || !duration || !calories) {
      alert("Please fill exercise, duration and calories");
      return;
    }
    const payload = {
      exercise,
      duration: Number(duration),
      calories: Number(calories),
      date: new Date(date),
    };

    try {
      if (editingId) {
        await editWorkout(editingId, payload);
      } else {
        await createWorkout(payload);
      }
      await load();
      resetForm();
    } catch (err) {
      console.error("Save error:", err);
      alert("Failed to save workout");
    }
  };

  const handleEdit = (w) => {
    setEditingId(w._id);
    setExercise(w.exercise);
    setDuration(String(w.duration));
    setCalories(String(w.calories));
    setDate(dayjs(w.date).format("YYYY-MM-DD"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this workout?")) return;
    try {
      await removeWorkout(id);
      await load();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete");
    }
  };

  const totalCalories = workouts.reduce((s, w) => s + (w.calories || 0), 0);
  const totalMinutes = workouts.reduce((s, w) => s + (w.duration || 0), 0);

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-6 transition-colors">
          <h2 className="text-2xl font-semibold text-green-700 dark:text-green-400 mb-3">Workout / Exercise Tracker</h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-700 dark:text-gray-200 mb-1">Exercise</label>
              <input
                value={exercise}
                onChange={(e) => setExercise(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-transparent text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500"
                placeholder="e.g., Running, Push-ups"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-200 mb-1">Duration (min)</label>
              <input
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-transparent text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500"
                type="number"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-200 mb-1">Calories</label>
              <input
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-transparent text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500"
                type="number"
                min="0"
              />
            </div>

            <div className="md:col-span-4 flex gap-2 mt-2">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-transparent text-gray-900 dark:text-gray-100"
              />
              <button type="submit" className="ml-auto bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                {editingId ? "Save Changes" : "Add Workout"}
              </button>
              {editingId && (
                <button type="button" onClick={resetForm} className="px-4 py-2 border rounded">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">History</h3>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Total: <span className="font-medium">{workouts.length}</span> • Minutes: <span className="font-medium">{totalMinutes}</span> • Calories: <span className="font-medium">{totalCalories}</span>
            </div>
          </div>

          {loading ? (
            <p className="text-center text-gray-600 dark:text-gray-300">Loading...</p>
          ) : workouts.length === 0 ? (
            <p className="text-center text-gray-600 dark:text-gray-300">No workouts logged yet.</p>
          ) : (
            <ul className="space-y-3">
              {workouts.map((w) => (
                <li key={w._id} className="flex items-center justify-between p-3 border border-gray-100 dark:border-gray-700 rounded">
                  <div>
                    <div className="font-medium text-gray-800 dark:text-gray-100">{w.exercise}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {dayjs(w.date).format("DD MMM YYYY")} • {w.duration} min • {w.calories} kcal
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(w)} className="px-3 py-1 border rounded text-sm">Edit</button>
                    <button onClick={() => handleDelete(w._id)} className="px-3 py-1 border rounded text-sm text-red-600">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutTracker;

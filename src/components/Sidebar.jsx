import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Sidebar = ({ onLogout, onClose }) => {
  const location = useLocation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "BMI Check", path: "/dashboard/bmi" },
    { name: "Diet Plan", path: "/dashboard/diet" },
    { name: "Custom Diet Planner", path: "/dashboard/custom-diet-planner" },
    { name: "Track Progress", path: "/dashboard/progress" },
    { name: "Food Calories", path: "/dashboard/food-list" },
    { name: "Water Tracker", path: "/dashboard/water-tracker" },
    { name: "Workout Tracker", path: "/dashboard/workout-tracker" },
  ];


  const toggleNotifications = async () => {
    if (Notification.permission !== "granted") {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        alert("Please allow notifications to enable reminders.");
        return;
      }
    }

    setNotificationsEnabled(true);
    alert("✅ Notifications enabled! You’ll receive reminders soon.");
  };


  const sendReminder = () => {
    const messages = [
      "💪 It’s time for your workout!",
      "💧 Stay hydrated — drink some water!",
      "🧘 Take a short stretch break!",
      "🚶 Move a little — walk around!",
    ];
    const message = messages[Math.floor(Math.random() * messages.length)];
    new Notification("NutriTrack Reminder", { body: message, icon: "/logo.png" });
  };


  useEffect(() => {
    let interval;
    if (notificationsEnabled) {
      sendReminder();
      interval = setInterval(sendReminder, 30 * 60 * 1000);
    }
    return () => clearInterval(interval);
  }, [notificationsEnabled]);

  return (
    <div
      className="flex flex-col h-full p-4 bg-green-900 text-white transition-transform duration-300"
      style={{ minWidth: 240 }}
    >

      <button
        onClick={onClose}
        className="md:hidden self-end text-2xl mb-2 hover:text-red-400"
      >
        ✕
      </button>

      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold">NutriTrack</h2>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={onClose}
            className={`block px-3 py-2 rounded-md font-medium ${location.pathname === item.path
                ? "bg-green-700"
                : "hover:bg-green-800"
              }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="mt-4 space-y-2">
        <button
          onClick={toggleNotifications}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md"
        >
          {notificationsEnabled ? "Notifications On ✅" : "Enable Notifications 🔔"}
        </button>

        <button
          onClick={onLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

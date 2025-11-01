import { useEffect } from "react";

const NotificationManager = () => {
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("✅ Notifications allowed");
          startReminders();
        } else {
          console.log("❌ Notifications blocked");
        }
      });
    }
  }, []);

  const startReminders = () => {
    setInterval(() => {
      new Notification("💧 Hydration Reminder", {
        body: "Time to drink a glass of water!",
        icon: "/icons/water.png",
      });
    }, 2 * 60 * 60 * 1000);

    const now = new Date();
    const sevenAM = new Date();
    sevenAM.setHours(7, 0, 0, 0);
    if (sevenAM < now) sevenAM.setDate(now.getDate() + 1);

    const timeUntilWorkout = sevenAM - now;
    setTimeout(() => {
      new Notification("🏋️ Workout Time!", {
        body: "It's time for your daily workout!",
        icon: "/icons/workout.png",
      });
    }, timeUntilWorkout);
  };

  return null;
};

export default NotificationManager;

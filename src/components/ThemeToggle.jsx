import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { Sun, Moon } from "lucide-react"; 

const ThemeToggle = () => {
  const { dark, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full border border-gray-300 dark:border-gray-600 
                 bg-white dark:bg-gray-800 hover:scale-105 transition-transform duration-200"
    >
      {dark ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-gray-800" />
      )}
    </button>
  );
};

export default ThemeToggle;

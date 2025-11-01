import React, { useState } from "react";

const BMICheck = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [advice, setAdvice] = useState("");
  const [diseases, setDiseases] = useState([]);

  const calculateBMI = () => {
    if (!height || !weight) {
      alert("Please enter both height and weight.");
      return;
    }

    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    setBmi(bmiValue);

    let bmiCategory = "";
    let healthAdvice = "";
    let diseaseList = [];

    if (bmiValue < 18.5) {
      bmiCategory = "Underweight";
      healthAdvice = "You may be undernourished. Consider consulting a nutritionist.";
      diseaseList = [
        "Anemia (low iron levels)",
        "Osteoporosis (weak bones)",
        "Weak immune system",
        "Infertility (especially in females)",
        "Malnutrition-related disorders",
      ];
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      bmiCategory = "Normal weight";
      healthAdvice = "Great! Maintain a balanced diet and regular exercise.";
      diseaseList = [
        "Lower risk of major diseases — maintain this range!",
        "Continue regular checkups and fitness routines.",
      ];
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      bmiCategory = "Overweight";
      healthAdvice = "Try to include more physical activity and a healthy diet.";
      diseaseList = [
        "High blood pressure (Hypertension)",
        "Type 2 Diabetes risk",
        "Joint or back pain",
        "Sleep apnea",
        "Fatty liver disease",
      ];
    } else {
      bmiCategory = "Obese";
      healthAdvice =
        "You may be at risk of heart disease, diabetes, or hypertension. Please consult a doctor.";
      diseaseList = [
        "Heart disease & stroke",
        "Type 2 Diabetes",
        "Certain cancers (breast, colon, etc.)",
        "Sleep apnea & breathing issues",
        "Gallbladder disease",
        "Osteoarthritis",
      ];
    }

    setCategory(bmiCategory);
    setAdvice(healthAdvice);
    setDiseases(diseaseList);
  };

  const getCategoryColor = () => {
    if (category === "Underweight") return "text-yellow-500";
    if (category === "Normal weight") return "text-green-500";
    if (category === "Overweight") return "text-orange-500";
    if (category === "Obese") return "text-red-500";
    return "text-gray-800 dark:text-gray-200";
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md transition-colors duration-300">
      <h2 className="text-2xl font-semibold text-green-700 dark:text-green-400 mb-4 text-center">
        BMI Calculator
      </h2>

      <div className="mb-4">
        <label className="block text-gray-800 dark:text-gray-200 font-medium mb-2">
          Gender:
        </label>
        <div className="flex gap-6">
          <label className="flex items-center text-gray-700 dark:text-gray-300">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={gender === "male"}
              onChange={(e) => setGender(e.target.value)}
              className="mr-2 accent-green-600"
            />
            Male
          </label>
          <label className="flex items-center text-gray-700 dark:text-gray-300">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={gender === "female"}
              onChange={(e) => setGender(e.target.value)}
              className="mr-2 accent-green-600"
            />
            Female
          </label>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-800 dark:text-gray-200 font-medium mb-2">
          Height (cm):
        </label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 dark:text-gray-100 bg-transparent"
          placeholder="Enter your height"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-800 dark:text-gray-200 font-medium mb-2">
          Weight (kg):
        </label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 dark:text-gray-100 bg-transparent"
          placeholder="Enter your weight"
        />
      </div>

      <button
        onClick={calculateBMI}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
      >
        Calculate BMI
      </button>

      {bmi && (
        <div className="mt-6 text-center">
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Your BMI: <span className="text-green-600 dark:text-green-400">{bmi}</span>
          </p>
          <p className={`text-md mt-1 font-medium ${getCategoryColor()}`}>
            Category: {category}
          </p>
          <p className="mt-3 text-gray-700 dark:text-gray-300 italic">{advice}</p>

          {diseases.length > 0 && (
            <div className="mt-4 text-left bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-inner">
              <h4 className="text-md font-semibold text-green-700 dark:text-green-300 mb-2">
                Possible Health Risks:
              </h4>
              <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
                {diseases.map((disease, index) => (
                  <li key={index}>{disease}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BMICheck;

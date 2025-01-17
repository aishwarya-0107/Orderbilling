import React, { useState } from "react";
import OrderBillingForm from "./OrderBillingForm";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      } flex flex-col items-center justify-center`}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleDarkMode}
        className={`absolute top-4 right-4 px-4 py-2 rounded-lg ${
          isDarkMode
            ? "bg-yellow-400 text-gray-900"
            : "bg-gray-800 text-white"
        } shadow-md transition`}
      >
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>

      {/* Pass Dark Mode State to Form */}
      <OrderBillingForm isDarkMode={isDarkMode} />
    </div>
  );
};

export default App;

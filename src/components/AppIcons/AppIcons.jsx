import React from "react";
import { useNavigate } from "react-router-dom";
import "./AppIcons.css";

const AppIcons = () => {
  const navigate = useNavigate();

  // Define app icons with their respective routes and labels
  const icons = [
    { id: 1, name: "Lawn Mower", icon: "🌱" },
    { id: 2, name: "Autorickshaw", icon: "🛺", path: "/autorickshaw" }, // Correct path for Autorickshaw
    { id: 3, name: "Food Delivery", icon: "🍲" },
    { id: 4, name: "Add Auto Driver", icon: "🚖", path: "/addadr" }, // Correct path for Add Auto Driver
  ];

  const handleNavigation = (path) => {
    if (path) {
      console.log(`Navigating to: ${path}`); // Debug: log the path to ensure it's correct
      navigate(path); // Navigate to the specified path
    } else {
      console.log("No path specified for this icon."); // Debug: log when no path exists
    }
  };

  return (
    <div className="app-icons">
      {icons.map((app) => (
        <div
          key={app.id}
          className="icon-item"
          onClick={() => handleNavigation(app.path)} // Use the updated navigation handler
          style={{
            cursor: app.path ? "pointer" : "default", // Only show pointer cursor for icons with paths
          }}
        >
          <div className="icon">{app.icon}</div>
          <div className="icon-container"></div>
          <p className="icon-label">{app.name}</p>
        </div>
      ))}
    </div>
  );
};

export default AppIcons;

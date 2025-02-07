import React from "react";
import "./AppIcons.css";

const AppIcons = () => {
  const icons = [
    { id: 1, name: "Lawn Mower", icon: "🌱" },
    { id: 2, name: "Autorickshaw", icon: "🛺" },
    { id: 3, name: "Food Delivery", icon: "🍲" },
  ];

  return (
    <div className="app-icons">
      {icons.map((app) => (
        <div key={app.id} className="icon-item">
          <div className="icon">{app.icon}</div> {/* Icon floating above */}
          <div className="icon-container"></div> {/* Glassmorphism box */}
          <p className="icon-label">{app.name}</p> {/* Text below the container */}
        </div>
      ))}
    </div>
  );
};

export default AppIcons;

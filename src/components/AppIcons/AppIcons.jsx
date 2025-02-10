import React from "react";
import { useNavigate } from "react-router-dom";
import "./AppIcons.css";

const AppIcons = () => {
  const navigate = useNavigate();

  const icons = [
    { id: 1, name: "Lawn Mower", icon: "🌱" },
    { id: 2, name: "Autorickshaw", icon: "🛺", path: "/autorickshaw" },
    { id: 3, name: "Food Delivery", icon: "🍲" },
    { id: 4, name: "Add Auto Driver", icon: "🚖", path: "/add-auto-driver" }, // New Icon
  ];

  return (
    <div className="app-icons">
      {icons.map((app) => (
        <div
          key={app.id}
          className="icon-item"
          onClick={() => app.path && navigate(app.path)} // Navigate only if 'path' exists
          style={{ cursor: app.path ? "pointer" : "default" }} // Pointer cursor for interactive icons
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

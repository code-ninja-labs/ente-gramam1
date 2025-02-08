import React from "react";
import "./AppIcons.css";

// Import all child components from the IconsPage folder
import LawnMower from "./IconsPage/LawnMower";
import Autorickshaw from "./IconsPage/Autorickshaw";
import FoodDelivery from "./IconsPage/FoodDelivery";

const components = {
  LawnMower: LawnMower,
  Autorickshaw: Autorickshaw,
  FoodDelivery: FoodDelivery,
};

const AppIcons = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);

  // Icons list
  const icons = [
    { id: 1, name: "LawnMower", icon: "🌱" },
    { id: 2, name: "Autorickshaw", icon: "🛺" },
    { id: 3, name: "FoodDelivery", icon: "🍲" },
  ];

  // Handle click event to set the corresponding component
  const handleIconClick = (name) => {
    setSelectedComponent(name); // Set the selected component's name
  };

  return (
    <div className="app-icons">
      {/* Render icons */}
      {icons.map((app) => (
        <div
          key={app.id}
          className="icon-item"
          onClick={() => handleIconClick(app.name)}
        >
          <div className="icon">{app.icon}</div> {/* Display icon emoji */}
          <div className="icon-container"></div> {/* Glassmorphism container */}
          <p className="icon-label">{app.name}</p> {/* Display icon name */}
        </div>
      ))}

      {/* Render selected component */}
      {selectedComponent && (
        <div className="component-viewer">
          {React.createElement(components[selectedComponent])} {/* Dynamically render the component */}
        </div>
      )}
    </div>
  );
};

export default AppIcons;

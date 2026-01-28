import { useState } from "react";
import "./Sidebar.css";
import PillShape from "./PillShape";
import PolygonCone from "./PolygonCone";

const menuItems = ["Home", "Profile", "Settings", "Logout"];

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="sidebar">
      {menuItems.map((item, index) => (
        <div
          key={index}
          className="menu-item"
          onClick={() => setActiveIndex(index)}
        >
          <span className="menu-text">{item}</span>
          <PillShape />
          <PolygonCone isActive={activeIndex === index} />
        </div>
      ))}
    </div>
  );
};

export default Sidebar;

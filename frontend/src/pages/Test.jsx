import { useState } from "react";
import { motion } from "framer-motion";
import "./Test.css";

const menuItems = ["Home", "Profile", "Settings", "Logout"];

const Test = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="test-page">
      <h1>Test Playground</h1>

      <p className="test-description">
        Sandbox for layout, animation, and interaction experiments.
      </p>

      <div className="test-sandbox">
        <div className="sidebar">
          {menuItems.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={index}
                className={`menu-item ${isActive ? "active" : ""}`}
                onClick={() => setActiveIndex(index)}
              >
                <span className="menu-text">{item}</span>

                {/* Left pill */}
                <div className="pill-left"></div>

                {/* Polygon cone */}
                <svg
                  className="active-bar-svg"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    className="active-bar-path"
                    initial={false}
                    animate={{
                      d: isActive
                        ? // Expanded: right → left toward pill
                          "M100,5 L100,90 L20,80 C10,80 10,20 20,20 Z"
                        : // Collapsed: thin line at right
                          "M100,5 L100,90 L100,90 C100,90 100,5 100,5 Z",
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </svg>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Test;

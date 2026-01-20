import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

                {/* Animate mask rectangles */}
                <AnimatePresence>
                  {isActive && (
                    <>
                      <motion.span
                        className="mask-top"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                      />
                      <motion.span
                        className="mask-bottom"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                      />
                    </>
                  )}
                </AnimatePresence>

                {/* Polygon cone with 3D gradient and shadow */}
                <svg
                  className="active-bar-svg"
                  viewBox="0 0 100 150"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id={`activeBarGradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#dfe6f3" stopOpacity="1" />
                    </linearGradient>
                  </defs>

                  <motion.path
                    className="active-bar-path"
                    initial={false}
                    animate={{
                      d: isActive
                        ? // Expanded polygon
                          "M100,0 L100,140 L40,120 C5,120 5,10 40,10 Z"
                        : // Collapsed thin line
                          "M100,0 L100,140 L100,130 C100,130 100,5 100,5 Z",
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    fill={`url(#activeBarGradient-${index})`}
                    style={{ filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.12))" }}
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

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./LeftSection.css";

const menuItems = ["🦷 My Teeth", "❤️ Saved Cards", "📅 Reminders", "⚙️ Settings"];

const LeftSection = ({ activeIndex: initialIndex = 0, onSelect }) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const buttonRefs = useRef([]);

  const handleClick = (index) => {
    setActiveIndex(index);
    if (onSelect) onSelect(index);
  };

  return (
    <aside className="profile-sidebar">
      <h2 className="sidebar-title">My Health</h2>

      <nav className="sidebar-nav">
        {menuItems.map((label, index) => {
          const isActive = activeIndex === index;
          const width = buttonRefs.current[index]?.offsetWidth || 100;

          return (
            <motion.button
              key={label}
              ref={(el) => (buttonRefs.current[index] = el)}
              className={`menu-item ${isActive ? "active" : ""}`}
              onClick={() => handleClick(index)}
              layout
              animate={{
                height: isActive ? 200 : 120,
                scaleY: isActive ? 1 : 0.88,
                y: !isActive
                  ? index < activeIndex
                    ? 25 * (activeIndex - index)
                    : -35 * (index - activeIndex)
                  : 0,
              }}
              transition={{
                layout: { duration: 0.45, ease: "easeInOut" },
                scaleY: { duration: 0.3 },
                y: { type: "spring", stiffness: 220, damping: 24 },
              }}
            >
              <span
                className="menu-text"
                style={{
                  fontWeight: isActive ? 700 : 400,
                  fontSize: isActive ? "1.2rem" : "1rem",
                  color: isActive ? "#0c0c0c" : "#cfc5d2",
                }}
              >
                {label}
              </span>

              {/* Mask rectangles */}
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

              {/* Active polygon */}
              <svg
                className="active-bar-svg"
                viewBox={`0 0 ${width} 500`}
                preserveAspectRatio="none"
              >
                <motion.path
                  className="active-bar-path"
                  initial={false}
                  animate={{
                    d: isActive
                      ? `M${width},0 L${width},500 L70,430 C10,450 0,100 60,80 Z`
                      : `M${width},0 L${width},500 L${width},480 C${width},480 ${width},20 ${width},20 Z`,
                  }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                />
              </svg>
            </motion.button>
          );
        })}
      </nav>
    </aside>
  );
};

export default LeftSection;

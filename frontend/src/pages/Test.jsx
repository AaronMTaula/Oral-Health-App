import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Test.module.css";

const menuItems = ["Providers", "Reminders"];

const Test = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [buttonWidths, setButtonWidths] = useState([]);
  const buttonRefs = useRef([]);

  // Measure button widths after first render
  useEffect(() => {
    const widths = buttonRefs.current.map((btn) => btn?.offsetWidth || 100);
    setButtonWidths(widths);
  }, []);

  return (
    <div className={styles.profileDashboard}>
      <aside className={`${styles.profileSidebar} ${styles.rightSidebar}`}>
        <h2 className={styles.sidebarTitle}>Right Sidebar</h2>

        <nav className={styles.sidebarNav}>
          {menuItems.map((label, index) => {
            const isActive = activeIndex === index;
            const width = buttonWidths[index] || 100; // use measured width

            return (
              <motion.button
                key={label}
                ref={(el) => (buttonRefs.current[index] = el)}
                className={`${styles.menuItem} ${isActive ? styles.active : ""}`}
                onClick={() => setActiveIndex(index)}
                layout
                transition={{ layout: { duration: 0.45, ease: "easeInOut" } }}
              >
                <span className={styles.menuText}>{label}</span>

                {/* Masks */}
                <AnimatePresence>
                  {isActive && (
                    <>
                      <motion.span
                        className={styles.maskTop}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        transition={{ duration: 0.45, ease: "easeInOut" }}
                      />
                      <motion.span
                        className={styles.maskBottom}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        transition={{ duration: 0.45, ease: "easeInOut" }}
                      />
                    </>
                  )}
                </AnimatePresence>

                {/* Active Bar */}
                <svg
                  className={styles.activeBarSvg}
                  viewBox={`0 0 ${width} 500`}
                  preserveAspectRatio="none"
                >
                  <motion.path
                    className={styles.activeBarPath}
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
    </div>
  );
};

export default Test;

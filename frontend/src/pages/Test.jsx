import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Test.module.css";

const menuItems = ["Providers", "Reminders"];

// Single provider (focused scope)
const provider = {
  name: "Smile Dental Clinic",
  rating: 4.7,
  reviews: 123,
  distance: "1.2 km",
  address: "123 Main Street",
  services: ["Clean", "Removal", "Crown", "CheckUp"],
};

const Test = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expanded, setExpanded] = useState(true);
  const [buttonWidths, setButtonWidths] = useState([]);
  const buttonRefs = useRef([]);

  // Measure widths once (important for SVG correctness)
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
            const width = buttonWidths[index] || 100;

            return (
              <motion.div key={label}>
                {/* =========================
                   MENU BUTTON (UNCHANGED)
                ========================= */}
                <motion.button
                  ref={(el) => (buttonRefs.current[index] = el)}
                  className={`${styles.menuItem} ${isActive ? styles.active : ""}`}
                  onClick={() => setActiveIndex(index)}
                  layout
                  transition={{ layout: { duration: 0.45, ease: "easeInOut" } }}
                >
                  <span className={styles.menuText}>{label}</span>

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

                {/* =========================
                   PROVIDER CONTENT
                ========================= */}
                {isActive && label === "Providers" && (
                  <motion.div
                    className={styles.providerCard}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                  >
                    <div
                      className={styles.expandArrow}
                      onClick={() => setExpanded((v) => !v)}
                    >
                      {expanded ? "▼" : "▶"}
                    </div>

                    <div className={styles.providerBody}>
                      <div className={styles.providerHeader}>
                        <div className={styles.providerName}>
                          {provider.name}
                        </div>
                        <div className={styles.providerRating}>
                          ⭐ {provider.rating} ({provider.reviews})
                        </div>
                      </div>

                      <AnimatePresence initial={false}>
                        {expanded && (
                          <motion.div
                            key="expanded"
                            className={styles.providerExpanded}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: "easeInOut" }}
                          >
                            <div className={styles.providerMeta}>
                              {provider.distance} — {provider.address}
                            </div>

                            <div className={styles.serviceTags}>
                              {provider.services.map((s) => (
                                <span key={s} className={styles.serviceTag}>
                                  {s}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}

                {/* =========================
                   REMINDERS PLACEHOLDER
                ========================= */}
                {isActive && label === "Reminders" && (
                  <div className={styles.remindersPlaceholder}>
                    Reminders coming soon
                  </div>
                )}
              </motion.div>
            );
          })}
        </nav>
      </aside>
    </div>
  );
};

export default Test;

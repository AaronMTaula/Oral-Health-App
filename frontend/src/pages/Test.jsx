import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Test.module.css";

const menuItems = ["Providers", "Reminders"];

// Providers (static for now)
const providers = [
  {
    name: "Smile Dental Clinic",
    rating: 4.6,
    reviews: 124,
    distance: "1.2 km",
    address: "123 Queen Street",
    services: ["Clean", "Removal", "Crown", "CheckUp"],
  },
  {
    name: "Bright Smile Dental",
    rating: 4.4,
    reviews: 98,
    distance: "2.1 km",
    address: "45 Victoria Road",
    services: ["Clean", "Whitening", "CheckUp"],
  },
  {
    name: "Happy Teeth Dentistry",
    rating: 4.8,
    reviews: 212,
    distance: "2.9 km",
    address: "78 Dominion Ave",
    services: ["Clean", "Crown", "Implant"],
  },
];

const Test = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [buttonWidths, setButtonWidths] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const buttonRefs = useRef([]);

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
                {/* MENU BUTTON */}
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
                        <motion.span className={styles.maskTop} />
                        <motion.span className={styles.maskBottom} />
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

                {/* PROVIDERS */}
                {isActive && label === "Providers" && (
                  <>
                    {providers.map((provider, i) => {
                      const isExpanded = expandedIndex === i;

                      return (
                        <div key={provider.name} className={styles.providerCard}>
                          <button
                            className={`${styles.expandToggle} ${
                              isExpanded ? styles.expanded : ""
                            }`}
                            onClick={() =>
                              setExpandedIndex(isExpanded ? null : i)
                            }
                          >
                            ▾
                          </button>

                          <div className={styles.providerContent}>
                            <h3 className={styles.providerName}>
                              {provider.name}
                            </h3>

                            <div className={styles.rating}>
                              ⭐ {provider.rating} ({provider.reviews})
                            </div>

                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                >
                                  <div className={styles.meta}>
                                    {provider.distance} • {provider.address}
                                  </div>

                                  <div className={styles.tags}>
                                    {provider.services.map((service) => (
                                      <span
                                        key={service}
                                        className={styles.tag}
                                      >
                                        {service}
                                      </span>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}

                {/* REMINDERS */}
                {isActive && label === "Reminders" && (
                  <div className={styles.remindersPlaceholder}>
                    No reminders yet.
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

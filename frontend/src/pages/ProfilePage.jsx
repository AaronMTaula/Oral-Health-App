import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/useAuth";
import { User, Mail, Heart, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./ProfilePage.css";

const menuItems = ["🦷 My Teeth", "❤️ Saved Cards", "📅 Reminders", "⚙️ Settings"];

const ProfilePage = () => {
  const { currentUser, loading: authLoading, token } = useAuth();
  const [userData, setUserData] = useState(null);
  const [apiLoading, setApiLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const buttonRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (authLoading || !currentUser) return;

    const fetchUserProfile = async () => {
      try {
        const response = await fetch("/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Could not load profile");
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setApiLoading(false);
      }
    };

    fetchUserProfile();
  }, [currentUser, authLoading, token]);

  if (authLoading || apiLoading)
    return <div className="profile-loading">Loading your profile…</div>;
  if (!currentUser)
    return <div className="profile-loading">Please log in to view your profile.</div>;
  if (error) return <div className="profile-loading">Error: {error}</div>;

  const favourites = userData?.favouriteCards || [];

  return (
    <div className="profile-dashboard">
      {/* =========================
          SIDEBAR WITH POLYGON & MASK
      ========================= */}
      <aside className="profile-sidebar">
        <h2 className="sidebar-title">My Health</h2>

        <nav className="sidebar-nav">
          {menuItems.map((label, index) => {
            const isActive = activeIndex === index;

            return (
              <button
                key={label}
                ref={(el) => (buttonRefs.current[index] = el)}
                className={`menu-item ${isActive ? "active" : ""}`}
                onClick={() => setActiveIndex(index)}
              >
                <span className="menu-text">{label}</span>

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

                {/* Polygon cone that fills the menu item width */}
                <svg
                  className="active-bar-svg"
                  viewBox={`0 0 ${buttonRefs.current[index]?.offsetWidth || 100} 100`}
                  preserveAspectRatio="none"
                >
                  <motion.path
                    className="active-bar-path"
                    initial={false}
                    animate={{
                      d: isActive
                        ? `M${buttonRefs.current[index]?.offsetWidth || 100},0 L${buttonRefs.current[index]?.offsetWidth || 100},100 L20,80 C5,80 5,20 20,20 Z`
                        : `M${buttonRefs.current[index]?.offsetWidth || 100},0 L${buttonRefs.current[index]?.offsetWidth || 100},100 L${buttonRefs.current[index]?.offsetWidth || 100},90 C${buttonRefs.current[index]?.offsetWidth || 100},90 ${buttonRefs.current[index]?.offsetWidth || 100},5 ${buttonRefs.current[index]?.offsetWidth || 100},5 Z`,
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </svg>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* =========================
          MAIN CONTENT
      ========================= */}
      <main className="profile-main">
        <section className="profile-card">
          <div className="profile-card-header">
            <User className="icon-blue" />
            <h2>About Me</h2>
          </div>

          <p className="profile-help-text">
            This is your dental health profile. It helps you keep your smile healthy 🦷
          </p>

          <div className="profile-details">
            <div>
              <Mail size={18} />
              <span>{userData.email}</span>
            </div>
            <div>
              <User size={18} />
              <span>{userData.name || "Name not added yet"}</span>
            </div>
          </div>
        </section>

        <section className="profile-card">
          <div className="profile-card-header">
            <Heart className="icon-pink" />
            <h2>Saved Health Cards</h2>
          </div>

          {favourites.length === 0 ? (
            <p className="profile-help-text">
              You haven’t saved any health cards yet. Explore the health section and tap ❤️ on a
              card.
            </p>
          ) : (
            <div className="saved-cards-grid">
              {favourites.map((card) => (
                <div key={card.id} className="saved-card">
                  {card.title}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* =========================
          RIGHT PANEL
      ========================= */}
      <aside className="profile-progress">
        <div className="progress-card">
          <Shield className="icon-green" />
          <h3>Your Progress</h3>
          <ul>
            <li>⭐ Cards saved: {favourites.length}</li>
            <li>🪥 Learning healthy habits</li>
            <li>🎯 Goal: Brush twice daily</li>
          </ul>

          <button onClick={() => navigate("/security")} className="progress-button">
            Account Safety
          </button>
        </div>
      </aside>
    </div>
  );
};

export default ProfilePage;

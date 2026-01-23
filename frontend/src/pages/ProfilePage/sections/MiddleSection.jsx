import React, { useState } from "react";
import "./MiddleSection.css";

// =========================
// PROFILE CARD
// =========================
const ProfileCard = () => {
  const [editing, setEditing] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [cropPos, setCropPos] = useState({ x: 0, y: 0 });

  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    school: "Sample School",
    dob: "2009-01-01",
    contact: "0123456789",
  });

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSave = () => setEditing(false);

  return (
    <div className="middle-card profile-card">
      <div className="profile-left">
        <div className="profile-avatar">
          <img
            src={photo || "https://via.placeholder.com/180"}
            alt="Profile"
            style={{ transform: `translate(${cropPos.x}px, ${cropPos.y}px)` }}
          />
        </div>

        {editing ? (
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="profile-name-input"
          />
        ) : (
          <h2 className="profile-name">{profile.name}</h2>
        )}

        {editing && (
          <input type="file" className="upload-input" onChange={handlePhotoUpload} />
        )}
      </div>

      <div className="profile-info">
        {["email", "school", "dob", "contact"].map((field) => (
          <div key={field} className="profile-row">
            <label>{field.toUpperCase()}</label>
            {editing ? (
              <input
                type="text"
                value={profile[field]}
                onChange={(e) => setProfile({ ...profile, [field]: e.target.value })}
              />
            ) : (
              <span>{profile[field]}</span>
            )}
          </div>
        ))}
      </div>

      <button
        className="save-profile-button"
        onClick={() => {
          if (editing) handleSave();
          setEditing(!editing);
        }}
      >
        {editing ? "Save" : "Edit"}
      </button>
    </div>
  );
};

// =========================
// PROGRESS CARD
// =========================
const ProgressCard = ({ completedToday = 0 }) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const now = new Date();
  const todayIndex = (now.getDay() + 6) % 7; // Monday as first day
  const minutesNow = now.getHours() * 60 + now.getMinutes();
  const DOT_END = 7 * 60;
  const DAY_END = 24 * 60 - 1;

  const dotProgress = minutesNow <= DOT_END ? minutesNow / DOT_END : 1;
  const barProgress = minutesNow <= DOT_END ? 0 : (minutesNow - DOT_END) / (DAY_END - DOT_END);

  return (
    <section className="middle-card progress-card">
      <h3>Weekly Progress</h3>

      <div className="checkpoint-bar">
        {days.map((day, index) => {
          const isPast = index < todayIndex;
          const isToday = index === todayIndex;

          return (
            <div className="checkpoint" key={day}>
              <div
                className={`checkpoint-dot ${
                  isPast || (isToday && (dotProgress === 1 || completedToday > 0))
                    ? "filled"
                    : ""
                }`}
                style={
                  isToday && dotProgress < 1
                    ? {
                        background: `conic-gradient(#4caf50 ${dotProgress * 360}deg, #ddd 0deg)`,
                      }
                    : undefined
                }
              >
                <span className="checkpoint-number">
                  {isPast ? 3 : isToday ? Math.min(3, completedToday) : 0}
                </span>
              </div>

              {index < days.length - 1 && (
                <div className="checkpoint-line">
                  <div
                    className="checkpoint-line-fill"
                    style={{
                      width: isPast ? "100%" : isToday ? `${Math.min(barProgress * 100, 100)}%` : "0%",
                    }}
                  />
                </div>
              )}

              <span className="checkpoint-label">{day}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

// =========================
// MIDDLE SECTION
// =========================
const MiddleSection = () => {
  const [dailyGoals, setDailyGoals] = useState([]);
  const [customGoals, setCustomGoals] = useState([]);
  const [history, setHistory] = useState([]);
  const [completedToday, setCompletedToday] = useState(0);

  return (
    <main className="profile-main">
      <ProfileCard />
      <ProgressCard completedToday={completedToday} />
      {/* GoalsCard and HistoryCard can also be added here in the future */}
    </main>
  );
};

export default MiddleSection;

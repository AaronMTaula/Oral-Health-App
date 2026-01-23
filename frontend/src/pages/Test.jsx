import React, { useState } from "react";
import "./test.css";

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

  const handleSave = () => {
    setEditing(false);
  };

  return (
    <div className="test-card profile-card">
      <div className="profile-left">
        <div className="profile-avatar">
          <img
            src={photo || "https://via.placeholder.com/180"}
            alt="Profile"
            style={{
              transform: `translate(${cropPos.x}px, ${cropPos.y}px)`,
            }}
          />
        </div>

        {editing ? (
          <input
            type="text"
            value={profile.name}
            onChange={(e) =>
              setProfile({ ...profile, name: e.target.value })
            }
            className="profile-name-input"
          />
        ) : (
          <h2 className="profile-name">{profile.name}</h2>
        )}

        {editing && (
          <input
            type="file"
            className="upload-input"
            onChange={handlePhotoUpload}
          />
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
                onChange={(e) =>
                  setProfile({ ...profile, [field]: e.target.value })
                }
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
  const todayIndex = (now.getDay() + 6) % 7;
  const minutesNow = now.getHours() * 60 + now.getMinutes();
  const DOT_END = 7 * 60;
  const DAY_END = 24 * 60 - 1;

  const dotProgress = minutesNow <= DOT_END ? minutesNow / DOT_END : 1;
  const barProgress =
    minutesNow <= DOT_END
      ? 0
      : (minutesNow - DOT_END) / (DAY_END - DOT_END);

  return (
    <section className="test-card" style={{ paddingBottom: "2.4rem" }}>
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
                        background: `conic-gradient(
                          #4caf50 ${dotProgress * 360}deg,
                          #ddd 0deg
                        )`,
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
                      width: isPast
                        ? "100%"
                        : isToday
                        ? `${Math.min(barProgress * 100, 100)}%`
                        : "0%",
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
// GOALS CARD
// =========================
const GoalsCard = ({
  dailyGoals,
  setDailyGoals,
  customGoals,
  setCustomGoals,
  historySetter,
  onGoalCompleted,
}) => {
  const [newGoalText, setNewGoalText] = useState("");
  const [newGoalTimeframe, setNewGoalTimeframe] = useState("Day");
  const [newGoalTimeOfDay, setNewGoalTimeOfDay] = useState("Morning");

  const toggleGoalCheckbox = (index, type) => {
    const goals = type === "daily" ? [...dailyGoals] : [...customGoals];
    goals[index].status = "confirm";
    type === "daily" ? setDailyGoals(goals) : setCustomGoals(goals);
  };

const confirmGoal = (index, confirmed, type) => {
  const goals = type === "daily" ? [...dailyGoals] : [...customGoals];

  if (confirmed) {
    // Push goal to history regardless of timeframe
    const goal = {
      ...goals[index],
      status: "done",
      completedAt: new Date(),
      type, // keep original type: "daily" or "custom"
    };
    goals.splice(index, 1);
    historySetter(goal); // send to history always
    onGoalCompleted?.();
  } else {
    goals[index].status = "pending";
  }

  type === "daily" ? setDailyGoals(goals) : setCustomGoals(goals);
};

  const addCustomGoal = () => {
    if (!newGoalText) return;

    setCustomGoals([
      ...customGoals,
      {
        text: newGoalText,
        timeframe: newGoalTimeframe,
        timeOfDay: newGoalTimeOfDay,
        status: "pending",
        createdAt: new Date(),
        type: "custom", // important: mark custom goals as custom even if timeframe is "Day"
      },
    ]);

    setNewGoalText("");
  };

  const renderGoal = (goal, index, type) => (
    <div key={index} className="goal-item">
      <span className="goal-text">{goal.text}</span>

      <div className="goal-tags">
        <span className="timeframe">{goal.timeframe}</span>
        {goal.timeOfDay && <span className="time-of-day">{goal.timeOfDay}</span>}
      </div>

      <div className="goal-actions">
        {goal.status === "confirm" ? (
          <div className="confirm-actions">
            <button
              className="confirm-yes"
              onClick={() => confirmGoal(index, true, type)}
            >
              ✔
            </button>
            <button
              className="confirm-no"
              onClick={() => confirmGoal(index, false, type)}
            >
              ✖
            </button>
          </div>
        ) : (
          <input
            type="checkbox"
            onChange={() => toggleGoalCheckbox(index, type)}
          />
        )}
      </div>
    </div>
  );

  return (
    <div className="test-card">
      <div className="section-header">
        <h2>Goals</h2>
      </div>

      <div className="daily-goals-card">
        <div className="section-header small">
          <h2>Daily Goals</h2>
        </div>
        {dailyGoals.map((goal, index) => renderGoal(goal, index, "daily"))}
      </div>

      <div className="goals-list">
        <div className="section-header small">
          <h2>Custom Goals</h2>
        </div>
        {customGoals.map((goal, index) => renderGoal(goal, index, "custom"))}
      </div>

      <div className="add-goal">
        <input
          value={newGoalText}
          onChange={(e) => setNewGoalText(e.target.value)}
          placeholder="New Goal"
        />
        <select
          value={newGoalTimeframe}
          onChange={(e) => setNewGoalTimeframe(e.target.value)}
        >
          <option value="Day">Day</option>
          <option value="Week">Week</option>
          <option value="Month">Month</option>
        </select>
        <select
          value={newGoalTimeOfDay}
          onChange={(e) => setNewGoalTimeOfDay(e.target.value)}
        >
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
          <option value="Evening">Evening</option>
          <option value="Night">Night</option>
        </select>
        <button onClick={addCustomGoal}>Add</button>
      </div>
    </div>
  );
};
// =========================
// HISTORY CARD
// =========================
const HistoryCard = ({
  history,
  setHistory,
  setDailyGoals,
  setCustomGoals,
  setCompletedToday,
}) => {
  const [tab, setTab] = useState("Daily");

  const handleRestore = (goal) => {
    if (!window.confirm("Restore this goal?")) return;

    if (goal.type === "daily") {
      setDailyGoals((prev) => [
        ...prev,
        { ...goal, status: "pending", completedAt: null },
      ]);
    } else if (goal.type === "custom") {
      setCustomGoals((prev) => [
        ...prev,
        { ...goal, status: "pending", completedAt: null },
      ]);
    }

    if (goal.completedAt) {
      setCompletedToday((prev) => Math.max(prev - 1, 0));
    }

    // Remove goal from history using functional update
    setHistory((prev) => prev.filter((g) => g !== goal));
  };

  const filteredHistory = history.filter((goal) => {
  if (tab === "Daily") return goal.type === "daily" || (goal.type === "custom" && goal.timeframe === "Day");
  if (tab === "Weekly") return goal.timeframe === "Week";
  if (tab === "Monthly") return goal.timeframe === "Month";
  return false;
});


  return (
    <div className="test-card">
      <h3>History</h3>
      <div className="history-tabs">
        {["Daily", "Weekly", "Monthly"].map((t) => (
          <button
            key={t}
            className={tab === t ? "active" : ""}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="history-list">
        {filteredHistory.length === 0 ? (
          <p className="empty-history">No completed goals yet.</p>
        ) : (
          filteredHistory.map((goal, index) => (
            <div key={index} className="history-goal">
              <div className="history-goal-info">
                <span className="history-text">{goal.text}</span>
                <div className="history-tags">
                  <span className="tag">{goal.timeframe}</span>
                  {goal.timeOfDay && <span className="tag">{goal.timeOfDay}</span>}
                </div>
              </div>
              <button
                className="restore-goal"
                onClick={() => handleRestore(goal)}
                title="Restore goal"
              >
                ⟳
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// =========================
// MAIN PAGE
// =========================
const TestPage = () => {
  const [dailyGoals, setDailyGoals] = useState([
    {
      text: "Brush Teeth",
      timeframe: "Day",
      timeOfDay: "Morning",
      status: "pending",
      createdAt: new Date(0),
      type: "daily",
    },
    {
      text: "Brush Teeth",
      timeframe: "Day",
      timeOfDay: "Evening",
      status: "pending",
      createdAt: new Date(0),
      type: "daily",
    },
    {
      text: "Floss Teeth",
      timeframe: "Day",
      timeOfDay: "Evening",
      status: "pending",
      createdAt: new Date(0),
      type: "daily",
    },
  ]);
  const [customGoals, setCustomGoals] = useState([]);
  const [history, setHistory] = useState([]);
  const [completedToday, setCompletedToday] = useState(0);

  return (
    <div className="test-page">
      <div className="test-profile-main">
        <ProfileCard />
        <ProgressCard completedToday={completedToday} />
        <GoalsCard
          dailyGoals={dailyGoals}
          setDailyGoals={setDailyGoals}
          customGoals={customGoals}
          setCustomGoals={setCustomGoals}
          historySetter={(goal) =>
            setHistory((prevHistory) => [...prevHistory, goal])
          }
          onGoalCompleted={() =>
            setCompletedToday((prev) => Math.min(prev + 1, 3))
          }
        />
        <HistoryCard
          history={history}
          setHistory={setHistory}
          setDailyGoals={setDailyGoals}
          setCustomGoals={setCustomGoals}
          setCompletedToday={setCompletedToday}
        />
      </div>
    </div>
  );
};

export default TestPage;

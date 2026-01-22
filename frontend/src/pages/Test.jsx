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
    // save logic here
  };

  return (
    <div className="test-card profile-card">
      {/* LEFT COLUMN */}
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

        {/* NAME (single render) */}
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

        {/* UPLOAD BUTTON (editing only) */}
        {editing && (
          <input
            type="file"
            className="upload-input"
            onChange={handlePhotoUpload}
          />
        )}
      </div>

      {/* RIGHT COLUMN */}
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

      {/* EDIT / SAVE BUTTON */}
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
const ProgressCard = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const todayIndex = new Date().getDay() - 1; // 0 = Monday
  const todayProgress = 0.5; // 50% for demo, can be dynamic

  const isDotFilled = (index, todayIndex) => index < todayIndex;

  return (
    <section className="test-card" style={{ paddingBottom: "2.4rem" }}>
      <h3>Weekly Progress</h3>
      <div className="checkpoint-bar">
        {days.map((day, index) => (
          <div className="checkpoint" key={day}>
            <div
              className={`checkpoint-dot ${
                isDotFilled(index, todayIndex) ? "filled" : ""
              }`}
            >
              <span className="checkpoint-number">
                {index < todayIndex ? 3 : index === todayIndex ? 1 : 0}
              </span>
            </div>
            {index < days.length - 1 && (
              <div className="checkpoint-line">
                <div
                  className="checkpoint-line-fill"
                  style={{
                    width:
                      index < todayIndex
                        ? "100%"
                        : index === todayIndex
                        ? `${todayProgress * 100}%`
                        : "0%",
                  }}
                />
              </div>
            )}
            <span className="checkpoint-label">{day}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

// =========================
// GOALS CARD
// =========================
const GoalsCard = ({ historySetter }) => {
  const [dailyGoals, setDailyGoals] = useState([
    { text: "Brush your teeth", timeframe: "Morning", status: "pending", createdAt: new Date(0) },
    { text: "Floss your teeth", timeframe: "Evening", status: "pending", createdAt: new Date(0) },
    { text: "Brush your teeth", timeframe: "Morning", status: "pending", createdAt: new Date(0) },
  ]);

  const [customGoals, setCustomGoals] = useState([]);
  const [newGoalText, setNewGoalText] = useState("");
  const [newGoalTimeframe, setNewGoalTimeframe] = useState("Day");

  const toggleGoalCheckbox = (index, type) => {
    const goals = type === "daily" ? [...dailyGoals] : [...customGoals];
    goals[index].status = "confirm";
    type === "daily" ? setDailyGoals(goals) : setCustomGoals(goals);
  };

  const confirmGoal = (index, confirmed, type) => {
    const goals = type === "daily" ? [...dailyGoals] : [...customGoals];
    if (confirmed) {
      const goal = { ...goals[index], status: "done", completedAt: new Date() };
      goals.splice(index, 1);

      // Move to history in correct tab
      historySetter(goal);
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
        status: "pending",
        createdAt: new Date(),
      },
    ]);
    setNewGoalText("");
  };

  return (
    <div className="test-card">
      <h3>Goals</h3>

      <div className="daily-goals-card">
        <h4>Daily Goals</h4>
        {dailyGoals.map((goal, index) => (
          <div key={index} className="goal-item">
            {goal.status === "confirm" ? (
              <>
                <span>{goal.text}</span>
                <div className="confirm-actions">
                  <button
                    className="confirm-yes"
                    onClick={() => confirmGoal(index, true, "daily")}
                  >
                    ✔
                  </button>
                  <button
                    className="confirm-no"
                    onClick={() => confirmGoal(index, false, "daily")}
                  >
                    ✖
                  </button>
                </div>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={goal.status === "done"}
                  onChange={() => toggleGoalCheckbox(index, "daily")}
                />
                <span>{goal.text}</span>
                <span className="timeframe">{goal.timeframe}</span>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="goals-list">
        <h4>Custom Goals</h4>
        {customGoals.map((goal, index) => (
          <div key={index} className="goal-item">
            {goal.status === "confirm" ? (
              <>
                <span>{goal.text}</span>
                <div className="confirm-actions">
                  <button
                    className="confirm-yes"
                    onClick={() => confirmGoal(index, true, "custom")}
                  >
                    ✔
                  </button>
                  <button
                    className="confirm-no"
                    onClick={() => confirmGoal(index, false, "custom")}
                  >
                    ✖
                  </button>
                </div>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={goal.status === "done"}
                  onChange={() => toggleGoalCheckbox(index, "custom")}
                />
                <span>{goal.text}</span>
                <span className="timeframe">{goal.timeframe}</span>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="add-goal">
        <input
          type="text"
          placeholder="New Goal"
          value={newGoalText}
          onChange={(e) => setNewGoalText(e.target.value)}
        />
        <select
          value={newGoalTimeframe}
          onChange={(e) => setNewGoalTimeframe(e.target.value)}
        >
          <option value="Day">Day</option>
          <option value="Week">Week</option>
          <option value="Month">Month</option>
        </select>
        <button onClick={addCustomGoal}>Add</button>
      </div>
    </div>
  );
};

// =========================
// HISTORY CARD
// =========================
const HistoryCard = ({ history, setHistory, restoreToGoals }) => {
  const [tab, setTab] = useState("Daily");

  const handleRestore = (goal) => {
    if (window.confirm("Restore this goal?")) {
      // Move back to goals
      restoreToGoals(goal);
      // Remove from history
      setHistory(history.filter((g) => g !== goal));
    }
  };

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
        {history
          .filter((goal) => {
            if (tab === "Daily") return goal.timeframe === "Morning" || goal.timeframe === "Day";
            if (tab === "Weekly") return goal.timeframe === "Week";
            if (tab === "Monthly") return goal.timeframe === "Month";
          })
          .map((goal, index) => (
            <div key={index} className="history-goal">
              <span>{goal.text}</span>
              <button
                className="restore-goal"
                onClick={() => handleRestore(goal)}
              >
                ⟳
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

// =========================
// MAIN PAGE
// =========================
const TestPage = () => {
  const [history, setHistory] = useState([]);

  const restoreToGoals = (goal) => {
    // Based on timeframe, restore to correct list in GoalsCard
    console.log("Restore:", goal);
    // Implementation can use a callback to GoalsCard if managing state globally
  };

  return (
    <div className="test-page">
      <div className="test-profile-main">
        <ProfileCard />
        <ProgressCard />
        <GoalsCard historySetter={(goal) => setHistory([...history, goal])} />
        <HistoryCard
          history={history}
          setHistory={setHistory}
          restoreToGoals={restoreToGoals}
        />
      </div>
    </div>
  );
};

export default TestPage;

import React, { useState, useRef, useEffect } from "react";
import diagnosesData, { symptomCardsData } from "../data/diagnosesData";
import { useAuth } from "../context/useAuth";
import mouthDiagram from "../images/Diagram Mouth.jpg";
import AppBanner from "../components/Banner.jsx";
import "./FindMyTeeth.css";

const FindMyTeeth = () => {
  const { currentUser } = useAuth();
  const isAdminUser = currentUser?.role === "admin";

  const [conditions, setConditions] = useState([...diagnosesData]);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [activeCondition, setActiveCondition] = useState(null);
  const [draggingConditionId, setDraggingConditionId] = useState(null);

  const [flippedSymptom, setFlippedSymptom] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const diagramRef = useRef(null);

  // Load saved pin positions if available
  useEffect(() => {
    const savedPositions = localStorage.getItem("fmtMuseumPositions");
    if (!savedPositions) return;
    try {
      const parsed = JSON.parse(savedPositions);
      setConditions(prev =>
        prev.map(item => {
          const match = parsed.find(p => p.id === item.id);
          return match ? { ...item, top: match.top, left: match.left } : item;
        })
      );
    } catch (e) {
      console.error("Failed to load museum pin positions", e);
    }
  }, []);

  // Admin Pin Dragging Logic
  const handlePinMouseDown = (e, conditionId) => {
    if (!isAdminMode) return;
    e.stopPropagation();
    setDraggingConditionId(conditionId);
  };

  const handleDiagramMouseMove = (e) => {
    if (!draggingConditionId || !diagramRef.current) return;
    const rect = diagramRef.current.getBoundingClientRect();
    const xPct = Math.max(5, Math.min(95, ((e.clientX - rect.left) / rect.width) * 100));
    const yPct = Math.max(5, Math.min(95, ((e.clientY - rect.top) / rect.height) * 100));

    setConditions(prev =>
      prev.map(c => (c.id === draggingConditionId ? { ...c, top: Math.round(yPct), left: Math.round(xPct) } : c))
    );
  };

  const handleDiagramMouseUp = () => {
    if (draggingConditionId) {
      setDraggingConditionId(null);
    }
  };

  const saveAdminPositions = () => {
    const positions = conditions.map(c => ({ id: c.id, top: c.top, left: c.left }));
    localStorage.setItem("fmtMuseumPositions", JSON.stringify(positions));
    alert("Museum diagram positions updated and saved!");
  };

  useEffect(() => {
    window.addEventListener("mousemove", onDrag);
    window.addEventListener("mouseup", stopDrag);
    return () => {
      window.removeEventListener("mousemove", onDrag);
      window.removeEventListener("mouseup", stopDrag);
    };
  });

  const activeDiagnosis = activeDot
    ? allDiagnoses.filter((d) => d.id.toString() === activeDot.diagnosisId.toString())
    : [];

  const symptomCards = [
    { title: "Cold", desc: "Does it feel cold?", img: coldImg },
    { title: "Hot", desc: "Is it hot or warmer than normal?", img: hotImg },
    { title: "Bleed", desc: "Is there blood, does it bleed a lot or a little?", img: bleedImg },
    { title: "Loose", desc: "Wobble marks around it and movement when hovering", img: looseImg },
    { title: "Sensitive", desc: "Is it sensitive, sharp pain?", img: sensitiveImg },
  ];

  return (
    <div className="fmt-container">
      <div className="fmt-header-row">
        <h1 className="fmt-title">Find My Teeth</h1>

        {/* ADMIN MODE TOGGLE (ADMIN USERS ONLY) */}
        {isAdminUser && (
          <div className="admin-controls-wrapper">
            <button
              className={`admin-toggle-btn ${isAdminMode ? "active-admin" : ""}`}
              onClick={() => setIsAdminMode(!isAdminMode)}
            >
              {isAdminMode ? "👁️ Switch to Patient View" : "⚙️ Switch to Admin View"}
            </button>
            {isAdminMode && (
              <button className="admin-save-btn" onClick={saveAdminPositions}>
                💾 Save Diagram Positions
              </button>
            )}
          </div>
        )}
      </div>

      {/* PERMANENT MUSEUM MOUTH DIAGRAM */}
      <div
        className={`mouth-diagram ${isAdminMode ? "admin-editing-mode" : ""}`}
        ref={diagramRef}
        onMouseMove={handleDiagramMouseMove}
        onMouseUp={handleDiagramMouseUp}
      >
        <img src={mouthDiagram} alt="Mouth diagram" draggable={false} />

        {/* PERMANENT CONDITION PINS */}
        {conditions.map((c) => (
          <div
            key={c.id}
            className={`mouth-pin ${activeCondition?.id === c.id ? "active-pin" : ""} ${
              isAdminMode ? "draggable-pin" : ""
            }`}
            style={{ top: `${c.top}%`, left: `${c.left}%` }}
            onMouseDown={(e) => handlePinMouseDown(e, c.id)}
            onClick={() => setActiveCondition(activeCondition?.id === c.id ? null : c)}
            title={c.colloquialName}
          >
            <span className="pin-number">{c.id}</span>
            <span className="pin-label">{c.colloquialName}</span>
          </div>
        ))}
      </div>

      {/* CONDITION DETAIL CARD */}
      {activeCondition && (
        <div className="condition-detail-card">
          <div className="detail-header">
            <h3>
              {activeCondition.colloquialName} <span>({activeCondition.scientificName})</span>
            </h3>
            <button className="close-btn" onClick={() => setActiveCondition(null)}>
              ✕
            </button>
          </div>
          <div className="detail-body">
            <p className="detail-description">{activeCondition.description}</p>
            <p className="detail-treatment">
              <strong>Treatment / Action:</strong> {activeCondition.treatment}
            </p>
          </div>
        </div>
      )}

      {/* SYMPTOM CARDS ROW ("Is it more of a feeling?") */}
      <section className="symptoms-section">
        <h2>Is it more of a feeling?</h2>
        <div className="symptom-cards-row">
          {symptomCardsData.map((card) => (
            <div
              key={card.id}
              className={`symptom-card ${flippedSymptom === card.id ? "flipped" : ""}`}
              onClick={() =>
                setFlippedSymptom(flippedSymptom === card.id ? null : card.id)
              }
            >
              <div className="symptom-card-inner">
                <div className="symptom-card-front">
                  <img src={card.image} alt={card.title} />
                  <h3>{card.title}</h3>
                  <span className="flip-hint">Click to flip 🔄</span>
                </div>
                <div className="symptom-card-back">
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* App Banner */}
      <AppBanner />
    </div>
  );
};

export default FindMyTeeth;

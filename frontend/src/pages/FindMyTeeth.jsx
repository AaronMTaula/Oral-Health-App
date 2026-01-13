import React, { useState, useRef, useMemo, useEffect } from "react";
import diagnosesData from "../data/diagnosesData";
import mouthDiagram from "../images/Diagram Mouth.jpg";
import "./FindMyTeeth.css";

const FindMyTeeth = () => {
  /* =========================
     CORE STATE
  ========================= */
  const [allDiagnoses, setAllDiagnoses] = useState([...diagnosesData]);
  const [dots, setDots] = useState([]); // { number, top, left, diagnosisId }
  const [pendingDot, setPendingDot] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [activeDot, setActiveDot] = useState(null); // dot clicked for info box

  const [addingNewDiagnosis, setAddingNewDiagnosis] = useState(false);
  const [newDiagnosisName, setNewDiagnosisName] = useState("");

  /* =========================
     CARD STATE
  ========================= */
  const [flippedCard, setFlippedCard] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);
  const [blurredCard, setBlurredCard] = useState(null);
  const [favourites, setFavourites] = useState([]);

  const diagramRef = useRef(null);

  /* =========================
     LOAD SAVED DOTS ON INIT
  ========================= */
  useEffect(() => {
    const saved = localStorage.getItem("fmtAssignments");
    if (saved) {
      const parsed = JSON.parse(saved);
      setDots(parsed);
      // Check if all assigned -> confirmed
      if (parsed.length === allDiagnoses.length) setConfirmed(true);
    }
  }, [allDiagnoses.length]);

  /* =========================
     DERIVED DATA
  ========================= */
  const assignedDiagnosisIds = useMemo(() => dots.map((d) => d.diagnosisId), [dots]);

  const availableDiagnoses = useMemo(
    () => allDiagnoses.filter((d) => !assignedDiagnosisIds.includes(d.id)),
    [allDiagnoses, assignedDiagnosisIds]
  );

  /* =========================
     STATE MACHINE
  ========================= */
  const assignmentState = (() => {
    if (confirmed) return "LOCKED";
    if (pendingDot) return "PLACING_DOT";
    if (dots.length < allDiagnoses.length) return "ASSIGNING";
    return "READY_TO_CONFIRM";
  })();

  /* =========================
     DIAGRAM CLICK
  ========================= */
  const handleDiagramClick = (e) => {
    if (assignmentState === "LOCKED" || pendingDot) return;
    if (
      e.target.closest(".dot-selector") ||
      e.target.closest(".undo-btn") ||
      e.target.closest(".confirm-btn")
    )
      return;

    const rect = diagramRef.current.getBoundingClientRect();
    setPendingDot({
      top: e.clientY - rect.top,
      left: e.clientX - rect.left,
    });

    setAddingNewDiagnosis(false);
    setNewDiagnosisName("");
  };

  /* =========================
     ASSIGN DIAGNOSIS
  ========================= */
  const assignDiagnosisToDot = (diagnosisId) => {
    if (!pendingDot || !diagnosisId) return;

    const newDot = {
      number: dots.length + 1,
      top: pendingDot.top,
      left: pendingDot.left,
      diagnosisId: diagnosisId.toString(),
    };

    const updatedDots = [...dots, newDot];
    setDots(updatedDots);
    setPendingDot(null);
    setAddingNewDiagnosis(false);
    setNewDiagnosisName("");

    // SAVE IMMEDIATELY
    localStorage.setItem("fmtAssignments", JSON.stringify(updatedDots));
  };

  /* =========================
     ADD NEW DIAGNOSIS
  ========================= */
  const addNewDiagnosis = () => {
    if (!newDiagnosisName.trim()) return;

    const newDiag = {
      id: `custom-${Date.now()}`,
      colloquialName: newDiagnosisName.trim(),
      scientificName: newDiagnosisName.trim(),
      description: "No description provided.",
      treatment: "No treatment listed.",
    };

    setAllDiagnoses((prev) => [...prev, newDiag]);
    assignDiagnosisToDot(newDiag.id);
  };

  /* =========================
     UNDO
  ========================= */
  const undoLastDot = () => {
    const updatedDots = dots.slice(0, -1);
    setDots(updatedDots);
    setPendingDot(null);
    setConfirmed(false);

    // SAVE IMMEDIATELY
    localStorage.setItem("fmtAssignments", JSON.stringify(updatedDots));
  };

  /* =========================
     CONFIRM
  ========================= */
  const handleConfirm = () => {
    if (dots.length === allDiagnoses.length) {
      setConfirmed(true);
      setPendingDot(null);
      // Already saved on assignment, but we can reaffirm
      localStorage.setItem("fmtAssignments", JSON.stringify(dots));
    } else {
      alert("Please assign all diagnoses before confirming.");
    }
  };

  /* =========================
     CARD VISIBILITY
  ========================= */
  const visibleDiagnoses = confirmed
    ? allDiagnoses.filter((d) => dots.some((dot) => dot.diagnosisId === d.id))
    : allDiagnoses;

  /* =========================
     RENDER
  ========================= */
  return (
    <div className="fmt-container">
      <h1 className="fmt-title">Find My Teeth</h1>

      {/* STATE MACHINE VISUAL */}
      <div style={{ marginBottom: "2rem", fontSize: "0.85rem", color: "#666" }}>
        <strong>State Machine:</strong> NO_DOTS → PLACING_DOT → ASSIGNING → READY_TO_CONFIRM → LOCKED
        <br />
        <strong>Current:</strong> {assignmentState}
      </div>

      {/* MOUTH DIAGRAM */}
      <div className="mouth-diagram" ref={diagramRef} onClick={handleDiagramClick}>
        <img src={mouthDiagram} alt="Mouth diagram" />

        {/* Existing dots */}
        {dots.map((dot) => {
          const diagnosis = allDiagnoses.find((d) => d.id.toString() === dot.diagnosisId.toString());
          return (
            <div
              key={dot.number}
              className="mouth-dot"
              style={{ top: dot.top, left: dot.left }}
              title={`${dot.number}. ${diagnosis?.colloquialName || ""}`}
              onClick={(e) => {
                e.stopPropagation();
                setActiveDot(dot);
              }}
            >
              {dot.number}
            </div>
          );
        })}

        {/* Pending dot selector */}
        {pendingDot && (
          <div
            className="dot-selector"
            style={{
              top: pendingDot.top,
              left: pendingDot.left,
              transform: "translate(-50%, -120%)",
            }}
          >
            {!addingNewDiagnosis ? (
              <select
                autoFocus
                defaultValue=""
                onChange={(e) => {
                  if (e.target.value === "ADD_NEW") {
                    setAddingNewDiagnosis(true);
                  } else {
                    assignDiagnosisToDot(e.target.value);
                  }
                }}
              >
                <option value="" disabled>
                  Assign diagnosis
                </option>
                {availableDiagnoses.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.colloquialName}
                  </option>
                ))}
                <option value="ADD_NEW">+ Add new diagnosis</option>
              </select>
            ) : (
              <div style={{ display: "flex", gap: "0.4rem" }}>
                <input
                  autoFocus
                  value={newDiagnosisName}
                  onChange={(e) => setNewDiagnosisName(e.target.value)}
                  placeholder="Diagnosis name"
                />
                <button onClick={addNewDiagnosis}>Add</button>
              </div>
            )}
          </div>
        )}

        {/* Controls */}
        {!confirmed && (
          <>
            <button className="undo-btn" onClick={undoLastDot}>
              Undo
            </button>
            <button
              className="confirm-btn"
              onClick={handleConfirm}
              disabled={dots.length !== allDiagnoses.length}
            >
              Confirm
            </button>
          </>
        )}
      </div>

      {/* Active Dot Info Box */}
      {activeDot && (
        <div className="dot-info-box">
          <button onClick={() => setActiveDot(null)}>Close</button>
          {allDiagnoses
            .filter((d) => d.id.toString() === activeDot.diagnosisId.toString())
            .map((diag) => (
              <div key={diag.id}>
                <h3>{diag.colloquialName}</h3>
                <p>{diag.description}</p>
                <p>Treatment: {diag.treatment}</p>
              </div>
            ))}
        </div>
      )}

      {/* CARDS */}
      <div className="fmt-grid">
        {visibleDiagnoses.map((diag) => {
          const isExpanded = expandedCard === diag.id;
          const isFavourited = favourites.includes(diag.id);

          return (
            <div
              key={diag.id}
              className={`fmt-card
                ${blurredCard === diag.id ? "front-unblurred" : ""}
                ${flippedCard === diag.id ? "flipped" : ""}
                ${isExpanded ? "expanded" : ""}
              `}
              onClick={() => {
                if (blurredCard !== diag.id) {
                  setBlurredCard(diag.id);
                  setFlippedCard(null);
                  setExpandedCard(null);
                } else {
                  setFlippedCard(flippedCard === diag.id ? null : diag.id);
                }
              }}
            >
              <div className="fmt-card-inner">
                <div className="fmt-card-front">
                  <img src={diag.image} alt={diag.colloquialName} />
                </div>

                <div className="fmt-card-back">
                  <h2>
                    {diag.scientificName} <span>({diag.colloquialName})</span>
                  </h2>
                  <p>{diag.description}</p>

                  <div className="fmt-actions">
                    <button
                      className="fmt-icon-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedCard(expandedCard === diag.id ? null : diag.id);
                        setFlippedCard(diag.id);
                        setBlurredCard(diag.id);
                      }}
                    >
                      ❓
                    </button>
                    <button
                      className={`fmt-icon-btn ${isFavourited ? "favourited" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setFavourites((prev) =>
                          prev.includes(diag.id)
                            ? prev.filter((f) => f !== diag.id)
                            : [...prev, diag.id]
                        );
                      }}
                    >
                      ❤️
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="fmt-treatment">
                      <h3>Treatment</h3>
                      <p>{diag.treatment}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FindMyTeeth;

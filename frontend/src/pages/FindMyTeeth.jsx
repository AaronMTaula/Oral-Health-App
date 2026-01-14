import React, { useState, useRef, useMemo, useEffect } from "react";
import diagnosesData from "../data/diagnosesData";
import mouthDiagram from "../images/Diagram Mouth.jpg";
import coldImg from "../images/cold.jpg";
import hotImg from "../images/hot.jpg";
import bleedImg from "../images/bleed.jpg";
import looseImg from "../images/loose.jpg";
import sensitiveImg from "../images/sensitive.jpg";
import AppBanner from "../components/Banner.jsx";
import "./FindMyTeeth.css";

const FindMyTeeth = () => {
  const [allDiagnoses, setAllDiagnoses] = useState([...diagnosesData]);
  const [dots, setDots] = useState([]);
  const [pendingDot, setPendingDot] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [activeDot, setActiveDot] = useState(null);

  const [flippedCard, setFlippedCard] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);
  const [blurredCard, setBlurredCard] = useState(null);
  const [favourites, setFavourites] = useState([]);

  const [boxDragPosition, setBoxDragPosition] = useState({ top: 0, left: 0 });
  const draggingRef = useRef(false);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const diagramRef = useRef(null);

  // Load saved dots
  useEffect(() => {
    const saved = localStorage.getItem("fmtAssignments");
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved).map((dot) => ({
        ...dot,
        boxTop: dot.boxTop ?? null,
        boxLeft: dot.boxLeft ?? null,
      }));
      setDots(parsed);
      if (parsed.length === allDiagnoses.length) setConfirmed(true);
    } catch (e) {
      console.error("Failed to load saved Find My Teeth data", e);
    }
  }, [allDiagnoses.length]);

  const assignedDiagnosisIds = useMemo(() => dots.map((d) => d.diagnosisId), [dots]);
  const availableDiagnoses = useMemo(
    () => allDiagnoses.filter((d) => !assignedDiagnosisIds.includes(d.id.toString())),
    [allDiagnoses, assignedDiagnosisIds]
  );

  const handleDiagramClick = (e) => {
    if (confirmed || pendingDot) return;
    const rect = diagramRef.current.getBoundingClientRect();
    setPendingDot({ top: e.clientY - rect.top, left: e.clientX - rect.left });
  };

  const assignDiagnosisToDot = (diagnosisId) => {
    if (!pendingDot) return;
    const newDot = {
      number: dots.length + 1,
      top: pendingDot.top,
      left: pendingDot.left,
      diagnosisId: diagnosisId.toString(),
      boxTop: null,
      boxLeft: null,
    };
    const updatedDots = [...dots, newDot];
    setDots(updatedDots);
    setPendingDot(null);
    localStorage.setItem("fmtAssignments", JSON.stringify(updatedDots));
  };

  const undoLastDot = () => {
    const updatedDots = dots.slice(0, -1);
    setDots(updatedDots);
    setPendingDot(null);
    setConfirmed(false);
    localStorage.setItem("fmtAssignments", JSON.stringify(updatedDots));
  };

  const handleConfirm = () => {
    if (dots.length === allDiagnoses.length) {
      setConfirmed(true);
      setPendingDot(null);
      localStorage.setItem("fmtAssignments", JSON.stringify(dots));
    } else {
      alert("Please assign all diagnoses before confirming.");
    }
  };

  const startDrag = (e) => {
    if (!activeDot || e.target.closest(".close-btn")) return;
    draggingRef.current = true;
    dragOffsetRef.current = {
      x: e.clientX - boxDragPosition.left,
      y: e.clientY - boxDragPosition.top,
    };
  };

  const onDrag = (e) => {
    if (!draggingRef.current || !activeDot) return;
    setBoxDragPosition({
      left: e.clientX - dragOffsetRef.current.x,
      top: e.clientY - dragOffsetRef.current.y,
    });
  };

  const stopDrag = () => {
    if (!activeDot) return;
    draggingRef.current = false;
    const updatedDots = dots.map((dot) =>
      dot.number === activeDot.number
        ? { ...dot, boxTop: boxDragPosition.top, boxLeft: boxDragPosition.left }
        : dot
    );
    setDots(updatedDots);
    localStorage.setItem("fmtAssignments", JSON.stringify(updatedDots));
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

  const [flippedSymptom, setFlippedSymptom] = useState(null);

  return (
    <div className="fmt-container">
      <h1 className="fmt-title">Find My Teeth</h1>

      {/* MOUTH DIAGRAM */}
      <div className="mouth-diagram" ref={diagramRef} onClick={handleDiagramClick}>
        <img src={mouthDiagram} alt="Mouth diagram" />

        {dots.map((dot) => (
          <div
            key={dot.number}
            className="mouth-dot"
            style={{ top: dot.top, left: dot.left }}
            onClick={(e) => {
              e.stopPropagation();
              setActiveDot(dot);
              setBoxDragPosition({
                top: dot.boxTop ?? dot.top + 50,
                left: dot.boxLeft ?? dot.left,
              });
            }}
            title={allDiagnoses.find((d) => d.id.toString() === dot.diagnosisId.toString())?.colloquialName}
          />
        ))}

        {pendingDot && (
          <div
            className="dot-selector"
            style={{ top: pendingDot.top, left: pendingDot.left, transform: "translate(-50%, -120%)" }}
          >
            <select autoFocus onChange={(e) => assignDiagnosisToDot(e.target.value)} defaultValue="">
              <option value="" disabled>Assign diagnosis</option>
              {availableDiagnoses.map((d) => (
                <option key={d.id} value={d.id}>{d.colloquialName}</option>
              ))}
            </select>
          </div>
        )}

        {!confirmed && (
          <>
            <button className="undo-btn" onClick={undoLastDot}>Undo</button>
            <button className="confirm-btn" onClick={handleConfirm} disabled={dots.length !== allDiagnoses.length}>Confirm</button>
          </>
        )}
      </div>

      {/* Dot info box */}
      {activeDot && (
        <div className="dot-info-box" style={{ top: boxDragPosition.top, left: boxDragPosition.left }}>
          <div className="dot-info-header" onMouseDown={startDrag}>
            <span>Diagnosis</span>
            <button className="close-btn" onClick={() => setActiveDot(null)}>×</button>
          </div>

          <div className="info-card-container">
            <div className="diagnosis-info">
              {activeDiagnosis.map((diag) => (
                <div key={diag.id}>
                  <h3>{diag.colloquialName}</h3>
                  <p>{diag.description}</p>
                  <p><strong>Treatment:</strong> {diag.treatment}</p>
                </div>
              ))}
            </div>

            <div className="dot-card-wrapper">
              {activeDiagnosis.map((diag) => (
                <div
                  key={diag.id}
                  className={`fmt-card
                    ${blurredCard === diag.id ? "front-unblurred" : ""}
                    ${flippedCard === diag.id ? "flipped" : ""}
                    ${expandedCard === diag.id ? "expanded" : ""}
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
                      <h2>{diag.scientificName} <span>({diag.colloquialName})</span></h2>
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
                        >❓</button>
                        {/* Heart button only for mouth cards */}
                        <button
                          className={`fmt-icon-btn ${favourites.includes(diag.id) ? "favourited" : ""}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setFavourites(prev =>
                              prev.includes(diag.id) ? prev.filter(f => f !== diag.id) : [...prev, diag.id]
                            );
                          }}
                        >❤️</button>
                      </div>

                      {expandedCard === diag.id && (
                        <div className="fmt-treatment">
                          <h3>Treatment</h3>
                          <p>{diag.treatment}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SYMPTOM CARDS ROW */}
      <div className="symptom-cards-row">
        {symptomCards.map((card) => (
          <div
            key={card.title}
            className={`symptom-card ${flippedSymptom === card.title ? "flipped" : ""}`}
            onClick={() =>
              setFlippedSymptom(flippedSymptom === card.title ? null : card.title)
            }
          >
            <div className="symptom-card-inner">
              <div className="symptom-card-front">
                <img src={card.img} alt={card.title} />
                <h3>{card.title}</h3>
              </div>
              <div className="symptom-card-back">
                <p>{card.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* App Banner */}
      <AppBanner />
    </div>
  );
};

export default FindMyTeeth;

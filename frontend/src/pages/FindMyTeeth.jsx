// src/pages/FindMyTeeth.jsx
import React, { useState, useEffect, useRef } from "react";
import diagnosesData from "../data/diagnosesData";
import "./FindMyTeeth.css";

const FindMyTeeth = () => {
  const [flippedCard, setFlippedCard] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);
  const [blurredCard, setBlurredCard] = useState(null);

  const containerRef = useRef(null);
  const cardRefs = useRef({});

  /* ----------------------------------------
        GLOBAL CLICK LISTENER (FULL RESET)
  ---------------------------------------- */
  useEffect(() => {
    const handleOutsideClick = (e) => {
      const clickedCard = e.target.closest(".fmt-card");
      const clickedNav = e.target.closest("nav");

      if (clickedCard || clickedNav) return; // ignore

      // FULL RESET
      setExpandedCard(null);
      setFlippedCard(null);
      setBlurredCard(null);
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  /* ----------------------------------------
        HANDLE CARD CLICK (UNBLUR + FLIP)
  ---------------------------------------- */
  const handleCardClick = (id) => {
    // First click → unblur ONLY this card
    if (blurredCard !== id) {
      setBlurredCard(id);
      setFlippedCard(null);
      setExpandedCard(null);
      return;
    }

    // Don't flip if expanded
    if (expandedCard === id) return;

    // Second click → flip
    setFlippedCard(flippedCard === id ? null : id);
  };

  /* ----------------------------------------
        EXPAND BEHAVIOR
  ---------------------------------------- */
  const handleExpand = (id, e) => {
    e.stopPropagation();

    if (expandedCard === id) {
      setExpandedCard(null);
      return;
    }

    setExpandedCard(id);
    setFlippedCard(id);
    setBlurredCard(id);
  };

  /* ----------------------------------------
        MOVE EXPANDED CARD TO TOP
  ---------------------------------------- */
  const sortedDiagnoses = expandedCard
    ? [
        diagnosesData.find((d) => d.id === expandedCard),
        ...diagnosesData.filter((d) => d.id !== expandedCard),
      ]
    : diagnosesData;

  /* ----------------------------------------
        ⭐ CENTER ACTIVE CARD ON SCREEN
  ---------------------------------------- */
  useEffect(() => {
    const activeId = expandedCard || blurredCard;

    if (activeId && cardRefs.current[activeId]) {
      cardRefs.current[activeId].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [expandedCard, blurredCard]);

  /* ----------------------------------------
        RENDER
  ---------------------------------------- */
  return (
    <div className="fmt-container" ref={containerRef}>
      <h1 className="fmt-title">Find My Teeth</h1>

      <div className="fmt-grid">
        {sortedDiagnoses.map((diag) => {
          const isExpanded = expandedCard === diag.id;

          return (
            <div
              key={diag.id}
              ref={(el) => (cardRefs.current[diag.id] = el)}
              className={`fmt-card
                ${blurredCard === diag.id ? "front-unblurred" : ""}
                ${flippedCard === diag.id ? "flipped" : ""}
                ${isExpanded ? "expanded" : ""}
              `}
              onClick={() => handleCardClick(diag.id)}
            >
              <div className="fmt-card-inner">
                {/* FRONT */}
                <div className="fmt-card-front">
                  <img
                    src={diag.image}
                    alt={diag.colloquialName}
                    style={{
                      objectPosition: diag.objectPosition || "center center",
                      width: diag.width || "100%",
                      height: diag.height || "100%",
                      objectFit: diag.objectFit || "cover",
                    }}
                  />
                </div>

                {/* BACK */}
                <div className="fmt-card-back">
                  <h2>
                    {diag.scientificName} <span>({diag.colloquialName})</span>
                  </h2>

                  <p>{diag.description}</p>

                  <button
                    className="fmt-readmore"
                    onClick={(e) => handleExpand(diag.id, e)}
                  >
                    {isExpanded ? "Hide" : "Read More"}
                  </button>

                  {isExpanded && (
                    <div className="fmt-treatment">
                      <h3>Treatment</h3>
                      <p>{diag.treatment}</p>

                      <h3>Symptoms</h3>
                      <p>{diag.symptoms || "No symptoms listed yet."}</p>

                      <h3>Common Misconceptions</h3>
                      <p>{diag.misconceptions || "None listed yet."}</p>

                      <h3>Related Articles</h3>
                      <p>{diag.links || "No related links available."}</p>
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

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

      if (clickedCard || clickedNav) return;

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
    if (blurredCard !== id) {
      setBlurredCard(id);
      setFlippedCard(null);
      setExpandedCard(null);
      return;
    }

    if (expandedCard === id) return;

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
        CENTER ACTIVE CARD (NO OVERSHOOT)
  ---------------------------------------- */
  useEffect(() => {
    const activeId = expandedCard || blurredCard;
    if (!activeId || !cardRefs.current[activeId]) return;

    const el = cardRefs.current[activeId];
    const rect = el.getBoundingClientRect();

    // 🔒 If the card is already fully visible, do NOT scroll
    const isFullyVisible =
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= window.innerHeight &&
      rect.right <= window.innerWidth;

    if (isFullyVisible) return;

    const desiredCenterY = window.scrollY + rect.top + rect.height / 2;
    const desiredCenterX = window.scrollX + rect.left + rect.width / 2;

    let targetTop = Math.round(desiredCenterY - window.innerHeight / 2);
    let targetLeft = Math.round(desiredCenterX - window.innerWidth / 2);

    const docHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    const docWidth = Math.max(
      document.documentElement.scrollWidth,
      document.body.scrollWidth
    );

    const maxTop = Math.max(0, docHeight - window.innerHeight);
    const maxLeft = Math.max(0, docWidth - window.innerWidth);

    targetTop = Math.max(0, Math.min(targetTop, maxTop));
    targetLeft = Math.max(0, Math.min(targetLeft, maxLeft));

    window.scrollTo({
      top: targetTop,
      left: targetLeft,
      behavior: "smooth",
    });
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
                    {diag.scientificName}{" "}
                    <span>({diag.colloquialName})</span>
                  </h2>

                  <p>{diag.description}</p>

                  <button
                    className="fmt-readmore"
                    style={{ width: "185px", height: "50px" }}
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

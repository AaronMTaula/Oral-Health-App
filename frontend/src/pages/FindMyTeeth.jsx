// src/pages/FindMyTeeth.jsx
import React, { useState } from "react";
import diagnosesData from "../data/diagnosesData";
import "./FindMyTeeth.css";

const FindMyTeeth = () => {
  const [flippedCard, setFlippedCard] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);

  const handleFlip = (id) => {
    setFlippedCard(flippedCard === id ? null : id);
    setExpandedCard(null); // reset expanded when flipping
  };

  const handleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="fmt-container">
      <h1 className="fmt-title">Find My Teeth</h1>
      <div className="fmt-grid">
        {diagnosesData.map((diag) => (
          <div
            key={diag.id}
            className={`fmt-card ${flippedCard === diag.id ? "flipped" : ""}`}
            onClick={() => handleFlip(diag.id)}
          >
            <div className="fmt-card-inner">
              {/* Front Side */}
              <div className="fmt-card-front">
                <img src={diag.image} alt={diag.colloquialName} />
              </div>

              {/* Back Side */}
              <div className="fmt-card-back">
                <h2>
                  {diag.scientificName}{" "}
                  <span>({diag.colloquialName})</span>
                </h2>
                <p>{diag.description}</p>
                <button
                  className="fmt-readmore"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleExpand(diag.id);
                  }}
                >
                  {expandedCard === diag.id ? "Hide" : "Read More"}
                </button>
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
  );
};

export default FindMyTeeth;

// src/pages/FindMyTeeth.jsx
import React, { useState } from "react";
import diagnosesData from "../data/diagnosesData";
import "./FindMyTeeth.css";

const FindMyTeeth = () => {
  const [flippedCard, setFlippedCard] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);
  const [blurredCard, setBlurredCard] = useState(null);

  const handleCardClick = (id) => {
    if (blurredCard !== id) {
      // First click: remove blur
      setBlurredCard(id);
    } else {
      // Second click: flip card
      setFlippedCard(flippedCard === id ? null : id);
      setExpandedCard(null); 
    }
  };

  const handleExpand = (id, e) => {
    e.stopPropagation();
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="fmt-container">
      <h1 className="fmt-title">Find My Teeth</h1>
      <div className="fmt-grid">
        {diagnosesData.map((diag) => (
          <div
            key={diag.id}
            className={`fmt-card ${
              blurredCard === diag.id ? "front-unblurred" : ""
            } ${flippedCard === diag.id ? "flipped" : ""}`}
            onClick={() => handleCardClick(diag.id)}
          >
            <div className="fmt-card-inner">
              {/* Front Side */}
              <div className="fmt-card-front">
                <img src={diag.image} alt={diag.colloquialName} 
                style={{
                  objectPosition: diag.objectPosition || "center center",
                  width: diag.width || "100%",
                  height: diag.height || "100%",
                  objectFit: diag.objectFit || "cover",}}/>
                
              </div>

              {/* Back Side */}
              <div className="fmt-card-back">
                <h2>
                  {diag.scientificName} <span>({diag.colloquialName})</span>
                </h2>
                <p>{diag.description}</p>
                <button
                  className="fmt-readmore"
                  onClick={(e) => handleExpand(diag.id, e)}
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

// src/pages/Health.jsx
import React, { useState } from "react";
import "./Health.css";

const Health = () => {
  const [activeSide, setActiveSide] = useState(null); // "sun" | "moon" | null

  const toggleSide = (side) => {
    setActiveSide(activeSide === side ? null : side);
  };

  return (
    <div className="health-page">
      {/* Intro */}
      <section className="health-intro">
        <h1>What's the big secret to a healthy smile?</h1>
        <p>
          It's simple – brush and floss every day. Oral health is easy, oral
          disease is hard. Let’s keep you on the right track.
        </p>
      </section>

      {/* Venn Diagram */}
      <section className="health-ven">
        {/* SUN */}
        <div
          className={`ven-side sun ${
            activeSide === "sun"
              ? "selected"
              : activeSide === "moon"
              ? "collapsed"
              : ""
          }`}
          onClick={() => toggleSide("sun")}
        >
          <div className="icon-wrapper">
            <span className="icon-inner">☀️</span>
          </div>

          {activeSide === "sun" && (
            <div className={`message-wrapper sun-message ${activeSide === "sun" ? "show" : ""}`}>
              <p>
                Teeth need to be cleaned every morning! No one wants to get a whiff
                of that morning breath. Brush for two minutes and you'll be good to go!
                Mouthwash as well if you like.
              </p>
            </div>

          )}
        </div>

        {/* MOON */}
        <div
          className={`ven-side moon ${
            activeSide === "moon"
              ? "selected"
              : activeSide === "sun"
              ? "collapsed"
              : ""
          }`}
          onClick={() => toggleSide("moon")}
        >
          <div className="icon-wrapper">
            <span className="icon-inner">🌙</span>
          </div>

          {activeSide === "moon" && (
            <div className={`message-wrapper moon-message ${activeSide === "moon" ? "show" : ""}`}>
              <p>
                Teeth have had a long day and need a good scrub so that left over food
                doesn't hang around overnight. Get the floss moving at night before
                or after brushing, finish off with some mouthwash if you like.
              </p>
            </div>

          )}
        </div>
      </section>
    </div>
  );
};

export default Health;

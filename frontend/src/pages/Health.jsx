// src/pages/Health.jsx
import React, { useState, useEffect } from "react";
import "./Health.css";

const Health = () => {
  const [activeSide, setActiveSide] = useState(null); // "sun" | "moon" | null
  const [sunX, setSunX] = useState(400); // Sun initial non-selected
  const [moonX, setMoonX] = useState(0);  // Moon initial non-selected

  const toggleSide = (side) => {
    setActiveSide(activeSide === side ? null : side);
  };

  // Update positions whenever activeSide changes
  useEffect(() => {
    if (activeSide === "sun") {
      setSunX(450);   // Sun selected
      setMoonX(0);  // Moon collapsed
    } else if (activeSide === "moon") {
      setSunX(0);   // Sun collapsed
      setMoonX(-410); // Moon selected
    } else {
      setSunX(200);   // Sun non-selected
      setMoonX(-220);    // Moon non-selected
    }
  }, [activeSide]);

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
            <span
              className="icon-inner"
              style={{ transform: `translateX(${sunX}px)` }}
            >
              ☀️
            </span>
          </div>

          <div
            className={`message-wrapper sun-message ${
              activeSide === "sun" ? "show" : ""
            }`}
          >
            <p>
              Teeth need to be cleaned every morning! Brush for two minutes and
              you’ll be good to go. Mouthwash if you like.
            </p>
          </div>
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
            <span
              className="icon-inner"
              style={{ transform: `translateX(${moonX}px)` }}
            >
              🌙
            </span>
          </div>

          <div
            className={`message-wrapper moon-message ${
              activeSide === "moon" ? "show" : ""
            }`}
          >
            <p>
              Teeth have had a long day. Brush and floss at night so food doesn’t
              stay around overnight. Finish with mouthwash if you like.
            </p>
          </div>
        </div>
      </section>

      {/* Video Grid */}
      <section className="health-videos">
        <h2>Learn More</h2>
        <div className="video-grid">
          <div className="video-card">
            <video src="video1.mp4" autoPlay loop muted></video>
            <p>Morning Routine</p>
          </div>
          <div className="video-card">
            <video src="video2.mp4" autoPlay loop muted></video>
            <p>Night Routine</p>
          </div>
          <div className="video-card">
            <video src="video3.mp4" autoPlay loop muted></video>
            <p>Floss Tips</p>
          </div>
        </div>
      </section>

      {/* Bottom Banner */}
      <section className="announcement-banner">
        <div className="announcement-content">
          <h2>Small habits. Big smiles.</h2>
          <p>
            Consistency is the key to lifelong oral health. Let’s build great
            routines together.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Health;

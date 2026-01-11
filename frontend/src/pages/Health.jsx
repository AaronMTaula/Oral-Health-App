// src/pages/Health.jsx
import React, { useState, useEffect, useRef } from "react";
import "./Health.css";

const Health = () => {
  const [activeSide, setActiveSide] = useState(null); // 'sun' or 'moon'
  const sunRef = useRef(null);
  const moonRef = useRef(null);

  const handleClick = (side) => {
    setActiveSide(side === activeSide ? null : side);
  };

  // Dynamically set --icon-radius to match icon circle
  useEffect(() => {
    if (sunRef.current) {
      sunRef.current.style.setProperty(
        "--icon-radius",
        `${sunRef.current.offsetWidth / 2}px`
      );
    }
    if (moonRef.current) {
      moonRef.current.style.setProperty(
        "--icon-radius",
        `${moonRef.current.offsetWidth / 2}px`
      );
    }
  }, [activeSide]);

  return (
    <div className="health-page">
      {/* Intro */}
      <section className="health-intro">
        <h1>What's the big secret to a healthy smile?</h1>
        <p>
          It's simple - brush and floss everyday. Simple right! Oral health is easy! Oral disease is hard, so let's keep you on the right track.
          Explore this page to learn how to keep up with those pearly whites.
        </p>
      </section>

      {/* Venn Diagram */}
      <section className="health-ven">
        {/* Sun */}
        <div
          ref={sunRef}
          className={`ven-side sun ${activeSide === "sun" ? "selected" : activeSide === "moon" ? "collapsed" : ""}`}
          onClick={() => handleClick("sun")}
        >
          <div className="icon-wrapper">
            <div className="icon-inner">☀️</div>
          </div>
          {activeSide === "sun" && (
            <div className="message-wrapper sun-message">
              Teeth need to be cleaned every morning! No one wants to get a whiff of that morning breath. Brush for two minutes and you'll be good to go! Mouthwash as well if you like.
            </div>
          )}
        </div>

        {/* Moon */}
        <div
          ref={moonRef}
          className={`ven-side moon ${activeSide === "moon" ? "selected" : activeSide === "sun" ? "collapsed" : ""}`}
          onClick={() => handleClick("moon")}
        >
          <div className="icon-wrapper">
            <div className="icon-inner">🌙</div>
          </div>
          {activeSide === "moon" && (
            <div className="message-wrapper moon-message">
              Teeth have had a long day and need a good scrub so that left over food doesn't hang around overnight. Get the floss moving at night before or after brushing, finish off with some mouthwash if you like.
            </div>
          )}
        </div>
      </section>

      {/* Video Grid */}
      <section className="health-videos">
        <h2>Learn to Use Your Dental Tools</h2>
        <div className="video-grid">
          <div className="video-card">
            <video src="/src/images/toothbrush.mp4" controls />
            <p>Toothbrush</p>
          </div>
          <div className="video-card">
            <video src="/src/images/floss.mp4" controls />
            <p>Floss</p>
          </div>
          <div className="video-card">
            <video src="/src/images/toothpaste.mp4" controls />
            <p>Toothpaste</p>
          </div>
          <div className="video-card">
            <video src="/src/images/mouthwash.mp4" controls />
            <p>Mouthwash</p>
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="announcement-banner">
        <div className="announcement-content">
          <h2>Keep Your Smile Bright!</h2>
          <p>Remember to brush, floss, and visit your dentist regularly.</p>
        </div>
      </section>
    </div>
  );
};

export default Health;

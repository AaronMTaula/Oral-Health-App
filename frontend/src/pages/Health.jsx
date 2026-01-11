// src/pages/Health.jsx
import React, { useState, useEffect } from "react";
import "./Health.css";

const Health = () => {
  const [activeSide, setActiveSide] = useState(null); // 'sun' or 'moon'
  const [venHeight, setVenHeight] = useState(500);

  useEffect(() => {
    const broche = document.querySelector(".broche-container");
    if (broche) setVenHeight(broche.offsetHeight);

    const handleResize = () => {
      if (broche) setVenHeight(broche.offsetHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = (side) => {
    setActiveSide(side === activeSide ? null : side);
  };

  return (
    <div className="health-page">
      {/* Intro Section */}
      <section className="health-intro">
        <h1>What's the big secret to a healthy smile?</h1>
        <p>
          It's simple - brush and floss everyday. Simple right! Oral health is easy! Oral disease is hard, so let's keep you on the right track.
          Explore this page to learn how to keep up with those pearly whites.
        </p>
      </section>

      {/* Venn Diagram Section */}
      <section className="health-ven" style={{ height: `${venHeight}px` }}>
        {/* Sun (left) */}
        <div
          className={`ven-side sun ${activeSide === "sun" ? "selected" : activeSide === "moon" ? "collapsed" : ""}`}
          onClick={() => handleClick("sun")}
          style={{ height: `${venHeight}px` }}
        >
          <div className="icon-wrapper">
            <span className="icon-inner">☀️</span>
          </div>
          {activeSide === "sun" && (
            <div className="message-wrapper sun-message">
              <p>
                Teeth need to be cleaned every morning! No one wants to get a whiff of that morning breath. Brush for two minutes and you'll be good to go! Mouthwash as well if you like.
              </p>
            </div>
          )}
        </div>

        {/* Moon (right) */}
        <div
          className={`ven-side moon ${activeSide === "moon" ? "selected" : activeSide === "sun" ? "collapsed" : ""}`}
          onClick={() => handleClick("moon")}
          style={{ height: `${venHeight}px` }}
        >
          {activeSide === "moon" && (
            <div className="message-wrapper moon-message">
              <p>
                Teeth have had a long day and need a good scrub so that left over food doesn't hang around overnight. Get the floss moving at night before or after brushing, finish off with some mouthwash if you like.
              </p>
            </div>
          )}
          <div className="icon-wrapper">
            <span className="icon-inner">🌙</span>
          </div>
        </div>
      </section>

      {/* Video Instruction Grid */}
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

      {/* Home Page Banner */}
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

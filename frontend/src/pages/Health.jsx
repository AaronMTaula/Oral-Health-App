// src/pages/Health.jsx
import React, { useState } from "react";
import AppBanner from "../components/Banner.jsx";
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
            <span className="icon-inner">🌙</span>
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
          <h2>Instructional Videos</h2>
                
          <div className="video-grid">
            <div className="video-card">
              <video src="toothbrush.mp4" autoPlay loop muted playsInline />
              <p>Toothbrush</p>
            </div>
                
            <div className="video-card">
              <video src="floss.mp4" autoPlay loop muted playsInline />
              <p>Floss</p>
            </div>
                
            <div className="video-card">
              <video src="toothpaste.mp4" autoPlay loop muted playsInline />
              <p>Toothpaste</p>
            </div>
                
            <div className="video-card">
              <video src="mouthwash.mp4" autoPlay loop muted playsInline />
              <p>Mouthwash</p>
            </div>
          </div>
        </section>
            {/* App Banner */}
      <AppBanner />

    </div>
  );
};

export default Health;

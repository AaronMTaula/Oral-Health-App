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
          <div className="icon-wrapper sun-icon-wrapper">
            <span
              className="icon-inner"
              style={{
                "--icon-x":
                  activeSide === "sun"
                    ? "160px" // selected position
                    : activeSide === "moon"
                    ? "150px" // collapsed position
                    : "400px", // center non-selected
              }}
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
          <div className="icon-wrapper moon-icon-wrapper">
            <span
              className="icon-inner"
              style={{
                "--icon-x":
                  activeSide === "moon"
                    ? "-180px" // selected position
                    : activeSide === "sun"
                    ? "130px" // collapsed position
                    : "0px", // center non-selected
              }}
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

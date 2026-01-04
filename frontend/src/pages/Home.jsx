import React, { useState } from "react";
import "./Home.css";

/* =========================
   Social posts
========================= */
const socialPosts = [
  { title: "Healthy Smiles Tip", description: "Remember to brush twice a day!", img: "/images/post1.png" },
  { title: "Dental Fun", description: "Check out our latest fun dental activity.", img: "/images/post2.png" },
  { title: "Community Event", description: "We participated in a local health fair.", img: "/images/post3.png" }
];

const scrollPosts = (direction) => {
  const container = document.getElementById("rolodexContainer");
  if (!container) return;
  container.scrollBy({
    left: direction === "left" ? -300 : 300,
    behavior: "smooth"
  });
};

/* =========================
   Home Page
========================= */
const Home = () => {
  // toggle angles for click behavior
  const [leftFlipped, setLeftFlipped] = useState(false);
  const [rightFlipped, setRightFlipped] = useState(false);

  // angles: LEFT card rotates negative to flip left, RIGHT rotates positive to flip right
  const leftAngle = leftFlipped ? -180 : 0;
  const rightAngle = rightFlipped ? 180 : 0;

  return (
    <main>
      {/* Announcement */}
      <section className="announcement-banner">
        <div className="announcement-content">
          <img src="/images/announcement-left.png" className="announcement-image" />
          <div className="announcement-text">
            <h2 className="announcement-title">Welcome</h2>
            <p>Welcome to the Ata'ata oral health programme.</p>
          </div>
          <img src="/images/announcement-right.png" className="announcement-image" />
        </div>
      </section>

      {/* Broche Flip */}
      <section className="broche-section">
        <div className="broche-container">

          {/* ===== PARENTS CARD ===== */}
          <div className="broche-wrapper">
            {/* BACK CARD */}
            <div className="broche-back">
              <h3>For Parents</h3>
              <p>Hello parents!</p>
              <p>
                It’s a team effort keeping your kiddies’ teeth happy and healthy —
                and you are the captain of the ship. Use our website and app to
                explore oral health topics, common tooth situations, and treatment options.
              </p>
              <p>
                Create a family group, track progress, earn points together, and set
                the example for lifelong healthy habits.
              </p>
              <p>
                Find your local provider or message one of our dentists anytime.
              </p>
            </div>

            {/* FRONT CARD */}
            <div
              className="broche-panel left"
              style={{
                transform: `rotateY(${leftAngle}deg) translateZ(12px)`,
                "--curl": `${leftFlipped ? 1 : 0}`,
                opacity: leftFlipped ? 0 : 1
              }}
              onClick={() => setLeftFlipped(!leftFlipped)}
            >
              <div className="broche-cover">
                For Parents
                <div className="drag-hint">
                  {leftFlipped ? (
                    <span className="arrow">↪ Flip</span>
                  ) : (
                    <span className="arrow">↩ Flip</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ===== KIDDIES CARD ===== */}
          <div className="broche-wrapper">
            {/* BACK CARD */}
            <div className="broche-back">
              <h3>For Kiddies</h3>
              <p>Hello kiddies!</p>
              <p>
                Ata'ata makes keeping your teeth healthy and happy EASY. On our
                website and app you can find almost everything you need to know about teeth.
              </p>
              <p>
                Wonder if your teeth are normal? Find your teeth, add them to your profile, and learn how to keep them clean.
              </p>
              <p>
                Get to know your dentist so it’s not awkward when you meet them, and flick questions through anytime.
              </p>
              <p>
                Sign up and log in to get your teeth on the right track!
              </p>
            </div>

            {/* FRONT CARD */}
            <div
              className="broche-panel right"
              style={{
                transform: `rotateY(${rightAngle}deg) translateZ(12px)`,
                "--curl": `${rightFlipped ? 1 : 0}`,
                opacity: rightFlipped ? 0 : 1
              }}
              onClick={() => setRightFlipped(!rightFlipped)}
            >
              <div className="broche-cover">
                For Kiddies
                <div className="drag-hint">
                  {rightFlipped ? (
                    <span className="arrow">↩ Flip</span>
                  ) : (
                    <span className="arrow">↪ Flip</span>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Social */}
      <section className="social-section">
        <div className="social-grid">
          <div className="social-text">
            <h2>Social Media Updates</h2>
          </div>

          <div className="social-rolodex">
            <button className="rolodex-arrow left" onClick={() => scrollPosts("left")}>←</button>

            <div className="rolodex-container" id="rolodexContainer">
              {socialPosts.map((p, i) => (
                <div key={i} className="rolodex-post">
                  <img src={p.img} />
                  <h4>{p.title}</h4>
                  <p>{p.description}</p>
                </div>
              ))}
            </div>

            <button className="rolodex-arrow right" onClick={() => scrollPosts("right")}>→</button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;

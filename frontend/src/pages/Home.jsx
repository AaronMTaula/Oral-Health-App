import React, { useState, useRef } from "react";
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
  const [leftAngle, setLeftAngle] = useState(0);
  const [rightAngle, setRightAngle] = useState(0);

  const dragging = useRef(null);
  const startX = useRef(0);

  const startDrag = (side, e) => {
    dragging.current = side;
    startX.current = e.clientX;
    window.addEventListener("mousemove", onDrag);
    window.addEventListener("mouseup", endDrag);
  };

  const onDrag = (e) => {
    if (!dragging.current) return;

    const delta = e.clientX - startX.current;

    if (dragging.current === "left") {
      const angle = Math.max(-180, Math.min(0, delta * -0.7));
      setLeftAngle(angle);
    }

    if (dragging.current === "right") {
      const angle = Math.min(180, Math.max(0, delta * 0.7));
      setRightAngle(angle);
    }
  };

  const endDrag = () => {
    if (dragging.current === "left") {
      setLeftAngle((a) => (Math.abs(a) > 90 ? -180 : 0));
    }
    if (dragging.current === "right") {
      setRightAngle((a) => (Math.abs(a) > 90 ? 180 : 0));
    }

    dragging.current = null;
    window.removeEventListener("mousemove", onDrag);
    window.removeEventListener("mouseup", endDrag);
  };

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
          {/* Left Panel */}
          <div
            className="broche-panel left"
            style={{
              transform: `rotateY(${leftAngle}deg) translateZ(12px)`,
              "--curl": `${Math.abs(leftAngle) / 180}`
            }}
            onMouseDown={(e) => startDrag("left", e)}
          >
            <div className="broche-cover">For Parents</div>
            <div className="broche-content">
              Parents guide and support healthy smiles.
            </div>
          </div>

          {/* Right Panel */}
          <div
            className="broche-panel right"
            style={{
              transform: `rotateY(${rightAngle}deg) translateZ(12px)`,
              "--curl": `${Math.abs(rightAngle) / 180}`
            }}
            onMouseDown={(e) => startDrag("right", e)}
          >
            <div className="broche-cover">For Kiddies</div>
            <div className="broche-content">
              Learn how EASY it is to keep your teeth clean.
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

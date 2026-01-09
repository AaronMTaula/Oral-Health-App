import React, { useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { TiArrowForward } from "react-icons/ti";
import "./Home.css";

/* Social posts */
const socialPosts = [
  { title: "Healthy Smiles Tip", description: "Remember to brush twice a day!", img: "/images/post1.png" },
  { title: "Dental Fun", description: "Check out our latest fun dental activity.", img: "/images/post2.png" },
  { title: "Community Event", description: "We participated in a local health fair.", img: "/images/post3.png" }
];

const Home = () => {
  const parentsBook = useRef(null);
  const kiddiesBook = useRef(null);

  /* Carousel state */
  const [index, setIndex] = useState(0);
  const startX = useRef(0);
  const startTime = useRef(0);

  /* Flipbooks */
  const flipParentsNext = () => parentsBook.current?.pageFlip()?.flipNext();
  const flipParentsPrev = () => parentsBook.current?.pageFlip()?.flipPrev();
  const flipKiddiesNext = () => kiddiesBook.current?.pageFlip()?.flipNext();
  const flipKiddiesPrev = () => kiddiesBook.current?.pageFlip()?.flipPrev();

  /* Carousel helpers */
  const rotate = (step) => {
    setIndex((prev) => (prev + step + socialPosts.length) % socialPosts.length);
  };

  const offsetFromCenter = (i) => {
    let diff = i - index;
    const total = socialPosts.length;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  /* Drag + momentum */
  const onStart = (x) => {
    startX.current = x;
    startTime.current = Date.now();
  };

  const onEnd = (x) => {
    const dx = x - startX.current;
    const dt = Date.now() - startTime.current;
    const velocity = Math.abs(dx / dt);

    if (Math.abs(dx) < 40) return;

    let steps = 1;
    if (velocity > 1.2) steps = 3;
    else if (velocity > 0.8) steps = 2;

    rotate(dx > 0 ? -steps : steps);
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

      {/* Flipbooks */}
      <section className="broche-section">
        <div className="broche-container">
          {/* Parents Flipbook */}
          <div className="broche-wrapper">
            <HTMLFlipBook
              width={300}
              height={400}
              className="broche-flipbook parents-flip"
              ref={parentsBook}
              flipOnClick
            >
              <div className="broche-cover modern-card">For Parents</div>
              <div className="broche-back modern-card">
                <h3>Hello Parents!</h3>
                <p>It’s a team effort keeping your kiddies’ teeth happy and healthy — you are the captain of the ship!</p>
                <p>Explore oral health topics, common tooth situations, and treatment options.</p>
                <p>Create a family group, track progress, and earn points together.</p>
              </div>
            </HTMLFlipBook>

            <button className="flipbook-page-button parents-page-prev" onClick={flipParentsNext}><TiArrowForward /></button>
            <button className="flipbook-page-button parents-page-next" onClick={flipParentsPrev}><TiArrowForward /></button>
          </div>

          {/* Kiddies Flipbook */}
          <div className="broche-wrapper mirrored-book">
            <HTMLFlipBook
              width={300}
              height={400}
              className="broche-flipbook kiddies-flip"
              ref={kiddiesBook}
              flipOnClick={false}
              drawShadow={false}
              startPage={0}
            >
              <div className="broche-cover kiddies-cover modern-card">For Children</div>

              <div className="broche-back mirrored-page modern-card">
                <h3>Hello Kiddies!</h3>
                <p>Ata'ata makes keeping your teeth healthy and happy EASY.</p>
                <p>Find your teeth, add them to your profile, and learn how to keep them clean.</p>
              </div>

              <div className="broche-back mirrored-page modern-card">
                <p>Get to know your dentist so it’s not awkward when you meet them.</p>
                <p>Ask questions anytime and track your smile journey!</p>
              </div>
            </HTMLFlipBook>

            <button className="flipbook-page-button kiddies-page-next" onClick={flipKiddiesNext}><TiArrowForward /></button>
            <button className="flipbook-page-button kiddies-page-prev" onClick={flipKiddiesPrev}><TiArrowForward /></button>
          </div>
        </div>
      </section>

      {/* Social Section */}
      <section className="social-section">
        <div className="social-description">
          <h2>{socialPosts[index].title}</h2>
          <p>{socialPosts[index].description}</p>
        </div>

        <div
          className="social-rolodex"
          onMouseDown={(e) => onStart(e.clientX)}
          onMouseUp={(e) => onEnd(e.clientX)}
          onTouchStart={(e) => onStart(e.touches[0].clientX)}
          onTouchEnd={(e) => onEnd(e.changedTouches[0].clientX)}
        >
          <button className="rolodex-arrow left" onClick={() => rotate(-1)}>‹</button>

          <div className="rolodex-stage">
            {socialPosts.map((p, i) => {
              const offset = offsetFromCenter(i);
              return (
                <div
                  key={i}
                  className={`rolodex-card ${offset === 0 ? "active" : ""}`}
                  onClick={() => offset !== 0 && rotate(offset)}
                  style={{
                    transform: `
                      translateX(${offset * 140}px)
                      translateZ(${-Math.abs(offset) * 110}px)
                      rotateY(${offset * -30}deg)
                      scale(${offset === 0 ? 1 : 0.9})
                    `,
                    zIndex: 10 - Math.abs(offset)
                  }}
                >
                  <img src={p.img} alt={p.title} />
                </div>
              );
            })}
          </div>

          <button className="rolodex-arrow right" onClick={() => rotate(1)}>›</button>

          <div className="rolodex-dots">
            {socialPosts.map((_, i) => (
              <span key={i} className={i === index ? "active" : ""} />
            ))}
          </div>
        </div>
      </section>
            {/* App Banner */}
      <section className="app-banner">
        <div className="app-banner-inner">

          {/* Square Word Logo */}
          <div className="app-wordmark">
            <span>A T A</span>
            <span>A T A</span>
            <span>O H P</span>
          </div>

          {/* App Links */}
          <div className="app-links">
            <ul>
              <li>FIND MY TEETH</li>
              <li>MY PROVIDERS</li>
            </ul>
            <ul>
              <li>LET’S TALK</li>
              <li>HEALTH</li>
            </ul>
          </div>

          {/* QR Code */}
          <div className="app-qr">
            <img src="/images/app-qr.png" alt="Download Ata'ata App" />
            <p>Download the App</p>
          </div>

          {/* App Logo */}
          <div className="app-logo">
            <img src="/images/app-logo.png" alt="Ata'ata Logo" />
          </div>

          {/* Contact */}
          <div className="app-contact">
            <h4>CONTACT US</h4>
            <a href="mailto:hello@ataata.nz">EMAIL</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">INSTA</a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer">TIKTOK</a>
          </div>

        </div>
      </section>

    </main>
  );
};

export default Home;

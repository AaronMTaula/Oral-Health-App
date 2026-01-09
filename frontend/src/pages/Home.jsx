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

/** Scroll carousel (rotates cards in place) */
const scrollPosts = (direction, setIndex, length, currentIndex) => {
  if (direction === "left") {
    setIndex(currentIndex === 0 ? length - 1 : currentIndex - 1);
  } else {
    setIndex(currentIndex === length - 1 ? 0 : currentIndex + 1);
  }
};

const Home = () => {
  const parentsBook = useRef(null);
  const kiddiesBook = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  /** Kiddies flip functions */
  const flipKiddiesNext = () => {
    const book = kiddiesBook.current;
    if (!book) return;
    book.pageFlip()?.flipNext();
  };

  const flipKiddiesPrev = () => {
    const book = kiddiesBook.current;
    if (!book) return;
    book.pageFlip()?.flipPrev();
  };

  /** Parents flip functions */
  const flipParentsNext = () => {
    const book = parentsBook.current;
    if (!book) return;
    book.pageFlip()?.flipNext();
  };

  const flipParentsPrev = () => {
    const book = parentsBook.current;
    if (!book) return;
    book.pageFlip()?.flipPrev();
  };

  /** Social rotation helpers */
  const getRotation = (i) => {
    const total = socialPosts.length;
    const angle = 360 / total;
    let diff = i - currentIndex;
    if (diff < 0) diff += total; // wrap around
    return diff * angle;
  };

  const getTranslate = (i) => {
    const radius = 250; // distance from center
    const angle = (getRotation(i) * Math.PI) / 180;
    const x = radius * Math.sin(angle);
    const z = radius * (1 - Math.cos(angle)); // front card closer
    return `translateX(${x}px) translateZ(${-z}px) rotateY(${getRotation(i)}deg)`;
  };

  const getZIndex = (i) => (i === currentIndex ? 10 : 1);

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
              <div className="broche-cover">For Parents</div>
              <div className="broche-back">
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
              <div className="broche-cover kiddies-cover">For Children</div>
              <div className="broche-back mirrored-page">
                <h3>Hello Kiddies!</h3>
                <p>Ata'ata makes keeping your teeth healthy and happy EASY.</p>
                <p>Find your teeth, add them to your profile, and learn how to keep them clean.</p>
              </div>
              <div className="broche-back mirrored-page">
                <p>Get to know your dentist so it’s not awkward when you meet them.</p>
                <p>Ask questions anytime and track your smile journey!</p>
              </div>
            </HTMLFlipBook>
            <button className="flipbook-page-button kiddies-page-next" onClick={flipKiddiesNext}><TiArrowForward /></button>
            <button className="flipbook-page-button kiddies-page-prev" onClick={flipKiddiesPrev}><TiArrowForward /></button>
          </div>

        </div>
      </section>

      {/* Social */}
      <section className="social-section">
        <div className="social-description">
          <h2>{socialPosts[currentIndex].title}</h2>
          <p>{socialPosts[currentIndex].description}</p>
        </div>

        <div className="social-rolodex">
          <button className="rolodex-arrow left" onClick={() => scrollPosts("left", setCurrentIndex, socialPosts.length, currentIndex)}>←</button>

          <div className="rolodex-container">
            {socialPosts.map((p, i) => (
              <div
                key={i}
                className="rolodex-post"
                style={{
                  transform: getTranslate(i),
                  zIndex: getZIndex(i)
                }}
              >
                <img src={p.img} alt={p.title} />
                <h4>{p.title}</h4>
                <p>{p.description}</p>
              </div>
            ))}
          </div>

          <button className="rolodex-arrow right" onClick={() => scrollPosts("right", setCurrentIndex, socialPosts.length, currentIndex)}>→</button>

          <div className="rolodex-dots">
            {socialPosts.map((_, i) => <span key={i} className={i===currentIndex ? "active" : ""}></span>)}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;

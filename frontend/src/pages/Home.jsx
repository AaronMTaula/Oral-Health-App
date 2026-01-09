import React, { useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { TiArrowForward } from "react-icons/ti";
import "./Home.css";

/* Social posts */
const socialPosts = [
  {
    title: "Healthy Smiles Tip",
    description: "Remember to brush twice a day!",
    img: "/images/post1.png",
  },
  {
    title: "Dental Fun",
    description: "Check out our latest fun dental activity.",
    img: "/images/post2.png",
  },
  {
    title: "Community Event",
    description: "We participated in a local health fair.",
    img: "/images/post3.png",
  },
];

const Home = () => {
  const parentsBook = useRef(null);
  const kiddiesBook = useRef(null);
  const dragStartX = useRef(0);
  const dragging = useRef(false);

  const [currentIndex, setCurrentIndex] = useState(0);

  /* ---------- Flipbooks ---------- */
  const flipKiddiesNext = () => kiddiesBook.current?.pageFlip()?.flipNext();
  const flipKiddiesPrev = () => kiddiesBook.current?.pageFlip()?.flipPrev();
  const flipParentsNext = () => parentsBook.current?.pageFlip()?.flipNext();
  const flipParentsPrev = () => parentsBook.current?.pageFlip()?.flipPrev();

  /* ---------- Carousel rotation ---------- */
  const rotate = (dir) => {
    setCurrentIndex((prev) =>
      dir === "left"
        ? (prev - 1 + socialPosts.length) % socialPosts.length
        : (prev + 1) % socialPosts.length
    );
  };

  const getOffset = (i) => {
    const total = socialPosts.length;
    let diff = i - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  /* ---------- Drag / Swipe ---------- */
  const onDragStart = (e) => {
    dragging.current = true;
    dragStartX.current = e.touches ? e.touches[0].clientX : e.clientX;
  };

  const onDragEnd = (e) => {
    if (!dragging.current) return;
    dragging.current = false;

    const endX = e.changedTouches
      ? e.changedTouches[0].clientX
      : e.clientX;

    const delta = endX - dragStartX.current;

    if (Math.abs(delta) > 50) {
      rotate(delta > 0 ? "left" : "right");
    }
  };

  return (
    <main>
      {/* Announcement */}
      <section className="announcement-banner">
        <div className="announcement-content">
          <img src="/images/announcement-left.png" className="announcement-image" />
          <div className="announcement-text">
            <h2>Welcome</h2>
            <p>Welcome to the Ata'ata oral health programme.</p>
          </div>
          <img src="/images/announcement-right.png" className="announcement-image" />
        </div>
      </section>

      {/* Flipbooks */}
      <section className="broche-section">
        <div className="broche-container">
          <div className="broche-wrapper">
            <HTMLFlipBook width={300} height={400} ref={parentsBook}>
              <div className="broche-cover">For Parents</div>
              <div className="broche-back">
                <h3>Hello Parents!</h3>
                <p>You’re the captain of the oral-health ship 🚢</p>
              </div>
            </HTMLFlipBook>
            <button className="flipbook-page-button parents-page-prev" onClick={flipParentsPrev}><TiArrowForward /></button>
            <button className="flipbook-page-button parents-page-next" onClick={flipParentsNext}><TiArrowForward /></button>
          </div>

          <div className="broche-wrapper mirrored-book">
            <HTMLFlipBook width={300} height={400} ref={kiddiesBook}>
              <div className="broche-cover kiddies-cover">For Children</div>
              <div className="broche-back mirrored-page">
                <h3>Hello Kiddies!</h3>
                <p>Let’s keep your teeth shiny ✨</p>
              </div>
            </HTMLFlipBook>
            <button className="flipbook-page-button kiddies-page-prev" onClick={flipKiddiesPrev}><TiArrowForward /></button>
            <button className="flipbook-page-button kiddies-page-next" onClick={flipKiddiesNext}><TiArrowForward /></button>
          </div>
        </div>
      </section>

      {/* Social Section */}
      <section className="social-section">
        <div className="social-description">
          <h2>{socialPosts[currentIndex].title}</h2>
          <p>{socialPosts[currentIndex].description}</p>
        </div>

        <div
          className="social-rolodex"
          onMouseDown={onDragStart}
          onMouseUp={onDragEnd}
          onTouchStart={onDragStart}
          onTouchEnd={onDragEnd}
        >
          <button className="rolodex-arrow left" onClick={() => rotate("left")}>‹</button>

          <div className="rolodex-stage">
            {socialPosts.map((post, i) => {
              const offset = getOffset(i);
              return (
                <div
                  key={i}
                  className={`rolodex-card ${offset === 0 ? "active" : ""}`}
                  style={{
                    transform: `
                      translateX(${offset * 140}px)
                      rotateY(${offset * -30}deg)
                      scale(${offset === 0 ? 1 : 0.9})
                    `,
                    zIndex: offset === 0 ? 5 : 1,
                  }}
                >
                  <img src={post.img} alt={post.title} />
                </div>
              );
            })}
          </div>

          <button className="rolodex-arrow right" onClick={() => rotate("right")}>›</button>

          <div className="rolodex-dots">
            {socialPosts.map((_, i) => (
              <span key={i} className={i === currentIndex ? "active" : ""} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;

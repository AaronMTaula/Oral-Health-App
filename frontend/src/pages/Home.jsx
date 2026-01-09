import React, { useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { TiArrowForward } from "react-icons/ti";
import "./Home.css";

/* Social posts */
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

const Home = () => {
  const parentsBook = useRef(null);
  const kiddiesBook = useRef(null);

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

            {/* ✅ Parents buttons — FUNCTIONS SWAPPED */}
            {/* LEFT button → NEXT */}
            <button
              className="flipbook-page-button parents-page-prev"
              onClick={flipParentsNext}
              aria-label="Next page"
            >
              <TiArrowForward />
            </button>

            {/* RIGHT button → PREVIOUS */}
            <button
              className="flipbook-page-button parents-page-next"
              onClick={flipParentsPrev}
              aria-label="Previous page"
            >
              <TiArrowForward />
            </button>
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

            {/* Kiddies Page Buttons (unchanged) */}
            <button
              className="flipbook-page-button kiddies-page-next"
              onClick={flipKiddiesNext}
              aria-label="Next page"
            >
              <TiArrowForward />
            </button>

            <button
              className="flipbook-page-button kiddies-page-prev"
              onClick={flipKiddiesPrev}
              aria-label="Previous page"
            >
              <TiArrowForward />
            </button>
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

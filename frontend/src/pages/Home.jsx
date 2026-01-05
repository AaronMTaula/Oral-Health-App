import React, { useRef } from "react";
import HTMLFlipBook from "react-pageflip";
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
  const parentsBook = useRef();
  const kiddiesBook = useRef();

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

      {/* =========================
         Two Side-by-Side Flipbooks
      ========================== */}
      <section className="broche-section">
        <div className="broche-container">

          {/* ===== PARENTS CARD ===== */}
          <div className="broche-wrapper">
            <HTMLFlipBook
              width={300}
              height={400}
              minWidth={250}
              minHeight={350}
              maxWidth={400}
              maxHeight={500}
              className="broche-flipbook parents-flip"
              ref={parentsBook}
              flipOnClick={true}
            >
              <div className="broche-cover">For Parents</div>
              <div className="broche-back">
                <h3>Hello Parents!</h3>
                <p>It’s a team effort keeping your kiddies’ teeth happy and healthy — you are the captain of the ship!</p>
                <p>Use our website and app to explore oral health topics, common tooth situations, and treatment options.</p>
                <p>Create a family group, track progress, earn points together, and set the example for lifelong healthy habits.</p>
                <p>Find your local provider or message one of our dentists anytime.</p>
              </div>
            </HTMLFlipBook>
          </div>

          {/* ===== KIDDIES CARD ===== */}
          <div className="broche-wrapper">
            <HTMLFlipBook
              width={300}
              height={400}
              minWidth={250}
              minHeight={350}
              maxWidth={400}
              maxHeight={500}
              className="broche-flipbook kiddies-flip"
              ref={kiddiesBook}
              flipOnClick={true}
              flipDirection="horizontal" /* change direction */
            >
              <div className="broche-cover">For Kiddies</div>
              <div className="broche-back">
                <h3>Hello Kiddies!</h3>
                <p>Ata'ata makes keeping your teeth healthy and happy EASY. On our website and app you can find almost everything you need to know about teeth.</p>
                <p>Wonder if your teeth are normal? Find your teeth, add them to your profile, and learn how to keep them clean.</p>
                <p>Get to know your dentist so it’s not awkward when you meet them, and flick questions through anytime.</p>
                <p>Sign up and log in to get your teeth on the right track!</p>
              </div>
            </HTMLFlipBook>
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

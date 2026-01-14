import React, { useState } from "react";
import "./MyProviders.css";

/* =========================
   IMAGE IMPORTS
========================= */
import bleed from "../images/bleed.jpg";
import sensitive from "../images/sensitive.jpg";
import ToothFracture from "../images/ToothFracture.png";
import wisdomTeeth from "../images/wisdom-teeth.svg";
import xRays from "../images/x-rays.svg";
import fillings from "../images/fillings.svg";
import gingivitis from "../images/Gingivitis.jpg";
import emergency from "../images/emergency-icon.svg";

/* =========================
   IMAGE ARRAYS
========================= */
const whenImages = [
  sensitive,
  gingivitis,
  xRays,
  wisdomTeeth,
  ToothFracture,
  fillings,
  emergency,
];

const whatImages = [
  xRays,
  gingivitis,
  fillings,
  sensitive,
];

/* =========================
   CONTENT
========================= */
const whenToGo = [
  "Routine bi-annual check-up (every 6 to 12 months)",
  "Professional cleaning and scaling to remove tartar",
  "Annual dental X-rays to check for hidden decay",
  "Final free adolescent appointment (before you turn 18)",
  "Wisdom teeth assessment and monitoring",
  "Orthodontic consultations or retainer adjustments",
  "Custom sports mouthguard fitting (for rugby, hockey, etc.)",
  "Persistent toothache or localized pain",
  "Bleeding gums during brushing or flossing",
  "Chipped, cracked, or fractured teeth",
  "Lost or loose fillings, crowns, or brackets",
  "Chronic bad breath (halitosis)",
  "Unusual mouth sores, lumps, or lesions",
  "Post-trauma evaluation after a facial injury",
  "Emergency treatment for a knocked-out permanent tooth",
];

const whatHappens = [
  "Digital Dental X-rays to identify decay between teeth and monitor jaw development",
  "Comprehensive Oral Examination to assess the health of your teeth, gums, and mouth",
  "Intraoral Photography to provide high-resolution visual records of your dental state",
  "Professional Cleaning and Scaling to remove plaque, tartar, and surface staining",
  "Restorative Fillings to seal cavities and prevent further tooth decay",
  "Preventative Fluoride Treatment to strengthen enamel and reduce the risk of future holes",
  "Fissure Sealants Assessment to check if protective coatings are needed on your molars",
];

const MyProviders = () => {
  const [activeWhenIndex, setActiveWhenIndex] = useState(0);
  const [activeWhatIndex, setActiveWhatIndex] = useState(0);

  return (
    <section className="providers-page">
      <header className="providers-header">
        <h1>Get to know your local dentists!</h1>
        <p>
          Whether its on the school dental bus or at your local clinic it is
          important that you see a dentist at least every year. The best thing
          is that for all under 18s it's free!
        </p>
      </header>

      <div className="providers-grid">
        {/* BOX 1 */}
        <div className="providers-box text-box">
          <h2>When do you need to go to the dentist?</h2>
          <ul>
            {whenToGo.map((item, index) => (
              <li
                key={index}
                onMouseEnter={() =>
                  setActiveWhenIndex(index % whenImages.length)
                }
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* BOX 2 */}
        <div className="providers-box image-box">
          {whenImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt=""
              className={`fade-image ${
                index === activeWhenIndex ? "active" : ""
              }`}
            />
          ))}
        </div>

        {/* BOX 3 */}
        <div className="providers-box image-box">
          {whatImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt=""
              className={`fade-image ${
                index === activeWhatIndex ? "active" : ""
              }`}
            />
          ))}
        </div>

        {/* BOX 4 */}
        <div className="providers-box text-box">
          <h2>What will happen at the dentist</h2>
          <ul>
            {whatHappens.map((item, index) => (
              <li
                key={index}
                onMouseEnter={() =>
                  setActiveWhatIndex(index % whatImages.length)
                }
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default MyProviders;

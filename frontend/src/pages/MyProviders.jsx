import React, { useState, useRef, useEffect } from "react";
import "./MyProviders.css";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

/* =========================
   IMAGE IMPORTS
========================= */
import sensitive from "../images/sensitive.jpg";
import gingivitis from "../images/Gingivitis.jpg";
import xRays from "../images/x-rays.svg";
import wisdomTeeth from "../images/wisdom-teeth.svg";
import ToothFracture from "../images/ToothFracture.png";
import fillings from "../images/fillings.svg";
import emergency from "../images/emergency-icon.svg";

/* =========================
   IMAGE ARRAYS
========================= */
const whenImages = [sensitive, gingivitis, xRays, wisdomTeeth, ToothFracture, fillings, emergency];
const whatImages = [xRays, gingivitis, fillings, sensitive];

/* =========================
   CONTENT
========================= */
const whenToGo = [
  { title: "Routine bi-annual check-up (every 6 to 12 months)", detail: "Regular dental check-ups help catch early signs of decay, gum disease, and alignment issues before they become painful or expensive." },
  { title: "Professional cleaning and scaling to remove tartar", detail: "Tartar is hardened plaque that cannot be removed with brushing alone. Professional cleaning prevents gum disease, reduces bad breath, and keeps your teeth and gums healthy." },
  { title: "Annual dental X-rays to check for hidden decay", detail: "X-rays allow dentists to see between teeth and below the gum line, identifying decay, infections, or jaw issues that are not visible during a standard exam." },
  { title: "Final free adolescent appointment (before you turn 18)", detail: "This visit ensures your adult teeth are healthy before transitioning out of free dental care. Dentists can also advise on long-term oral health habits." },
];

const whatHappens = [
  { title: "Digital Dental X-rays", detail: "Digital X-rays use low radiation to detect cavities, bone loss, and developmental issues early." },
  { title: "Comprehensive Oral Examination", detail: "Your dentist checks teeth, gums, bite alignment, and soft tissues to assess overall oral health." },
  { title: "Professional Cleaning and Scaling", detail: "Plaque and tartar are removed to protect gums and reduce the risk of decay and gum disease." },
  { title: "Restorative Fillings", detail: "Fillings repair cavities and restore the tooth’s strength and function." },
];

/* =========================
   MAP CONFIG
========================= */
const mapContainerStyle = { width: "100%", height: "400px" };
const center = { lat: -36.8485, lng: 174.7633 }; // Auckland
const options = { disableDefaultUI: true, zoomControl: true };

/* =========================
   COMPONENT
========================= */
const MyProviders = () => {
  const [activeWhenIndex, setActiveWhenIndex] = useState(0);
  const [activeWhatIndex, setActiveWhatIndex] = useState(0);
  const [expandedWhen, setExpandedWhen] = useState(null);
  const [expandedWhat, setExpandedWhat] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const mapRef = useRef(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    if (!mapRef.current || !window.google) return;

    // Add a single AdvancedMarkerElement for demo
    new window.google.maps.marker.AdvancedMarkerElement({
      map: mapRef.current,
      position: center,
      title: "Local Dentist",
    });
  }, [isLoaded]);

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <section className="providers-page">
      {/* HEADER */}
      <header className="providers-header">
        <h1>Get to know your local dentists!</h1>
        <p>
          Whether it's on the school dental bus or at your local clinic, it's
          important that you see a dentist at least every year. For all under 18s, it's free!
        </p>
      </header>

      {/* 2x2 BULLET GRID */}
      <div className="providers-grid">
        {/* BOX 1: WHEN */}
        <div className="providers-box text-box">
          <h2>When do you need to go to the dentist?</h2>
          <div className="bullet-container">
            {expandedWhen !== null ? (
              <div className="expanded-bullet">
                <span className="bullet-title">{whenToGo[expandedWhen].title}</span>
                <p className="bullet-detail">{whenToGo[expandedWhen].detail}</p>
                <button className="close-btn" onClick={() => setExpandedWhen(null)}>✕ Close</button>
              </div>
            ) : (
              <ul>
                {whenToGo.map((item, index) => (
                  <li
                    key={index}
                    onMouseEnter={() => setActiveWhenIndex(index % whenImages.length)}
                    onClick={() => setExpandedWhen(index)}
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* BOX 2: WHEN IMAGE */}
        <div className="providers-box image-box">
          {whenImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt=""
              className={index === activeWhenIndex ? "active" : ""}
            />
          ))}
        </div>

        {/* BOX 3: WHAT IMAGE */}
        <div className="providers-box image-box">
          {whatImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt=""
              className={index === activeWhatIndex ? "active" : ""}
            />
          ))}
        </div>

        {/* BOX 4: WHAT */}
        <div className="providers-box text-box">
          <h2>What will happen at the dentist</h2>
          <div className="bullet-container">
            {expandedWhat !== null ? (
              <div className="expanded-bullet">
                <span className="bullet-title">{whatHappens[expandedWhat].title}</span>
                <p className="bullet-detail">{whatHappens[expandedWhat].detail}</p>
                <button className="close-btn" onClick={() => setExpandedWhat(null)}>✕ Close</button>
              </div>
            ) : (
              <ul>
                {whatHappens.map((item, index) => (
                  <li
                    key={index}
                    onMouseEnter={() => setActiveWhatIndex(index % whatImages.length)}
                    onClick={() => setExpandedWhat(index)}
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* GOOGLE MAPS BELOW GRID */}
      <div className="map-full-width">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={12}
          options={options}
          onLoad={(map) => (mapRef.current = map)}
        />
      </div>

      {/* SEARCH BOX BELOW MAP */}
      <div className="search-box-container">
        <div className="providers-box search-box">
          <h2>Find your oral health team</h2>
          <p>Type your suburb or school below to find the best dental team for you:</p>
          <input
            type="text"
            placeholder="Enter suburb or school..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && <div className="search-results">Results for "{searchQuery}" (demo placeholder)</div>}
        </div>
      </div>
    </section>
  );
};

export default MyProviders;

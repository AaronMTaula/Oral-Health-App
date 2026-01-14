import React, { useState, useRef, useEffect } from "react";
import "./MyProviders.css";
import AppBanner from "../components/Banner.jsx";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

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
const whenImages = [sensitive, gingivitis, xRays, wisdomTeeth, ToothFracture, fillings, emergency];
const whatImages = [xRays, gingivitis, fillings, sensitive];

/* =========================
   CONTENT
========================= */
const whenToGo = [
  { title: "Routine bi-annual check-up (every 6 to 12 months)", detail: "Regular dental check-ups help catch early signs of decay, gum disease, and alignment issues before they become painful or expensive. Even when your teeth feel fine, problems can still be developing beneath the surface." },
  { title: "Professional cleaning and scaling to remove tartar", detail: "Tartar is hardened plaque that cannot be removed with brushing alone. Professional cleaning prevents gum disease, reduces bad breath, and keeps your teeth and gums healthy." },
  { title: "Annual dental X-rays to check for hidden decay", detail: "X-rays allow dentists to see between teeth and below the gum line, identifying decay, infections, or jaw issues that are not visible during a standard exam." },
  { title: "Final free adolescent appointment (before you turn 18)", detail: "This visit ensures your adult teeth are healthy before transitioning out of free dental care. Dentists can also advise on long-term oral health habits." },
  { title: "Wisdom teeth assessment and monitoring", detail: "Wisdom teeth can cause pain, infection, or crowding. Monitoring their development helps decide if removal is needed before complications arise." },
  { title: "Orthodontic consultations or retainer adjustments", detail: "Orthodontic visits ensure teeth remain aligned after braces and that retainers fit correctly as your mouth changes over time." },
  { title: "Custom sports mouthguard fitting (for rugby, hockey, etc.)", detail: "Custom-fitted mouthguards protect your teeth from fractures, displacement, and jaw injuries during contact sports." },
  { title: "Persistent toothache or localized pain", detail: "Ongoing pain may indicate decay, infection, or nerve damage. Early treatment can prevent tooth loss or the spread of infection." },
  { title: "Bleeding gums during brushing or flossing", detail: "Bleeding gums are often an early sign of gum disease. Addressing this early can prevent more serious periodontal problems." },
  { title: "Chipped, cracked, or fractured teeth", detail: "Even small cracks can worsen over time. Prompt treatment protects the tooth structure and prevents further damage." },
  { title: "Lost or loose fillings, crowns, or brackets", detail: "Loose dental work exposes teeth to decay and sensitivity. Repairs restore protection and function." },
  { title: "Chronic bad breath (halitosis)", detail: "Persistent bad breath can signal gum disease, decay, or infection that requires professional treatment." },
  { title: "Unusual mouth sores, lumps, or lesions", detail: "Any sore that doesn’t heal within two weeks should be checked to rule out infections or more serious conditions." },
  { title: "Post-trauma evaluation after a facial injury", detail: "Even if teeth look intact, trauma can damage roots or jaw bones. A dental check ensures nothing is missed." },
  { title: "Emergency treatment for a knocked-out permanent tooth", detail: "Quick dental treatment can sometimes save a knocked-out tooth if addressed immediately." },
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
const mapContainerStyle = { width: "100%", height: "100%" };
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
  const [places, setPlaces] = useState([]);

  const box1Ref = useRef(null);
  const [gridHeight, setGridHeight] = useState("auto");

  const mapRef = useRef(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  /* =========================
     GRID HEIGHT FOR EXPANDABLE BULLETS
  ========================== */
  useEffect(() => {
    if (box1Ref.current) {
      setGridHeight(box1Ref.current.scrollHeight + "px");
    }
  }, [expandedWhen, whenToGo.length]);

  if (!isLoaded) return <p>Loading map...</p>;

  /* =========================
     HANDLE SEARCH
  ========================== */
  const handleSearch = () => {
    if (!mapRef.current || !searchQuery) return;

    const service = new window.google.maps.places.PlacesService(mapRef.current);

    service.textSearch(
      { query: `${searchQuery} dentist`, fields: ["name", "geometry", "formatted_address"] },
      (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setPlaces(results);

          // Clear old markers
          mapRef.current.markers?.forEach((m) => m.setMap(null));
          mapRef.current.markers = [];

          // Add new markers
          results.forEach((place) => {
            const marker = new window.google.maps.Marker({
              map: mapRef.current,
              position: place.geometry.location,
              title: place.name,
            });
            mapRef.current.markers.push(marker);
          });

          // Center map on first result
          if (results[0]) mapRef.current.panTo(results[0].geometry.location);
        }
      }
    );
  };

  return (
    <section className="providers-page">
      {/* HEADER */}
      <header className="providers-header">
        <h1>Get to know your local dentists!</h1>
        <p>
          Whether it’s on the school dental bus or at your local clinic, it’s
          important that you see a dentist at least every year. For all under 18s, it’s free!
        </p>
      </header>

      {/* 2x2 GRID */}
      <div className="providers-grid" style={{ gridTemplateRows: `${gridHeight} ${gridHeight}` }}>
        {/* BOX 1: WHEN */}
        <div ref={box1Ref} className="providers-box text-box">
          <h2>When do you need to go to the dentist?</h2>
          <div className="bullet-container">
            {expandedWhen !== null ? (
              <div className="expanded-bullet fade-slide">
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
              className={`fade-image ${index === activeWhenIndex ? "active" : ""}`}
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
              className={`fade-image ${index === activeWhatIndex ? "active" : ""}`}
            />
          ))}
        </div>

        {/* BOX 4: WHAT */}
        <div className="providers-box text-box">
          <h2>What will happen at the dentist</h2>
          <div className="bullet-container">
            {expandedWhat !== null ? (
              <div className="expanded-bullet fade-slide">
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

      {/* MAP & SEARCH SECTION */}
      <section className="map-search-section">
        {/* LEFT: SEARCH PANEL */}
        <div className="search-panel">
          <h2>Find your local dentist</h2>
          <p>Type your suburb or school below to find the nearest dental practices:</p>
          <input
            type="text"
            placeholder="Enter suburb or school..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />

          {/* SEARCH RESULTS */}
          {places.length > 0 && (
            <div className="search-results-panel">
              {places.map((place, index) => (
                <div
                  key={index}
                  className="search-result-item"
                  onClick={() => mapRef.current.panTo(place.geometry.location)}
                >
                  <span className="practice-name">{place.name}</span>
                  <span className="practice-address">{place.formatted_address}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: GOOGLE MAP */}
        <div className="map-panel">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={12}
            options={options}
            onLoad={(map) => (mapRef.current = map)}
          />
        </div>
      </section>

      {/* APP BANNER */}
      <AppBanner />
    </section>
  );
};

export default MyProviders;

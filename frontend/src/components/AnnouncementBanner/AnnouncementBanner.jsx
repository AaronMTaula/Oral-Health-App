import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './AnnouncementBanner.css';

const bannerMessages = {
  '/': "Welcome to the Ata'ata oral health programme. We are a team of dentists that want to make oral health easy peasy. We have three simple goals: 1) Improve oral health habits, 2) Make finding and seeing your provider easier, 3) To provide health information. Use our website alongside our app improve your smile today!",
  '/find-my-teeth': "Cheese! Have a look around the different parts of the mouth below to find a match to your smile. Add these features to your account to keep track of your smile.",
  '/my-providers': "Get to know your local dentists! Whether its on the school dental bus or at your local clinic it is important that you see a dentist at least every year. The best thing is that for all under 18s it's free!",
  '/lets-talk': "Have any questions? Comments? Queries or concerns? Let us know."
};

const AnnouncementBanner = () => {
  const location = useLocation();
  const message = bannerMessages[location.pathname];
  const [dismissed, setDismissed] = useState(false);

  // Reset dismissal state when page changes so each page shows its own announcement
  useEffect(() => {
    setDismissed(false);
  }, [location.pathname]);

  if (!message || dismissed) {
    return null;
  }

  return (
    <div className="announcement-banner">
      <div className="announcement-banner-content">
        <span className="announcement-icon">📢</span>
        <p className="announcement-text">{message}</p>
        <button
          className="announcement-close-btn"
          onClick={() => setDismissed(true)}
          aria-label="Close announcement"
          title="Close announcement"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
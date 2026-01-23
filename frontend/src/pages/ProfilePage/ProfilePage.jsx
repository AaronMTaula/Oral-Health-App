import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/useAuth";
import LeftSection from "./sections/LeftSection.jsx";
import MiddleSection from "./sections/MiddleSection.jsx";
import RightSection from "./sections/RightSection.jsx";
import "./ProfilePage.css";

const ProfilePage = () => {
  const { currentUser, loading: authLoading, token } = useAuth();
  const [userData, setUserData] = useState(null);
  const [apiLoading, setApiLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authLoading || !currentUser) return;

    const fetchUserProfile = async () => {
      try {
        const response = await fetch("/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Could not load profile");
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setApiLoading(false);
      }
    };

    fetchUserProfile();
  }, [currentUser, authLoading, token]);

  if (authLoading || apiLoading)
    return <div className="profile-loading">Loading your profile…</div>;
  if (!currentUser)
    return <div className="profile-loading">Please log in to view your profile.</div>;
  if (error) return <div className="profile-loading">Error: {error}</div>;

  return (
    <div className="profile-dashboard">
      {/* LEFT SECTION / SIDEBAR */}
      <LeftSection />

      {/* MIDDLE SECTION / MAIN CONTENT */}
      <MiddleSection userData={userData} />

      {/* RIGHT SECTION / PROGRESS */}
      <RightSection />
    </div>
  );
};

export default ProfilePage;

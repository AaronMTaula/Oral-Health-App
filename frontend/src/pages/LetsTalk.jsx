import React, { useState } from "react";
import { useAuth } from "../context/useAuth";
import { apiUrl } from "../config/api";
import AppBanner from "../components/Banner.jsx";
import "./LetsTalk.css";

const LetsTalk = () => {
  const { currentUser, token } = useAuth();

  const [provider, setProvider] = useState("Ata'ata Dental Team");
  const [familyCc, setFamilyCc] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [statusMsg, setStatusMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isCcValid = emailRegex.test(familyCc.trim());

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMsg(null);
    setErrorMsg(null);

    if (!currentUser || !token) {
      setErrorMsg("You must be logged in to send an inquiry.");
      return;
    }

    if (!isCcValid) {
      setErrorMsg("Please enter a valid family member email address to CC.");
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch(apiUrl("/api/users/inquiry"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          provider,
          subject,
          message,
          familyCc: familyCc.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send inquiry.");
      }

      setStatusMsg(data.message);
      setSubject("");
      setMessage("");
    } catch (err) {
      setErrorMsg(err.message || "Something went wrong.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="lets-talk-page">
      {/* MEDICAL DISCLAIMER HEADER */}
      <section className="disclaimer-banner">
        <div className="disclaimer-content">
          <div className="disclaimer-title">
            <span>⚠️</span> Important Medical Disclaimer
          </div>
          <p>
            The information provided on this website is for general educational
            purposes only and is not a substitute for professional dental advice,
            diagnosis, or treatment. Questions and answers here are meant to
            help you learn, not to diagnose dental problems or recommend specific
            treatments.
          </p>
          <p>
            Every mouth is different. If you have dental pain, swelling, bleeding,
            injury, or any other concern, always see a qualified dentist or dental
            professional. Never ignore, delay, or replace professional dental
            care because of something you read on this website. If you think you
            may have a dental emergency, contact a dentist or emergency service
            right away.
          </p>
        </div>
      </section>

      {/* EMAIL-STYLE INQUIRY SECTION */}
      <main className="inquiry-container">
        <div className="inquiry-card">
          <h2>📩 Send an Inquiry to Your Dental Team</h2>
          <p className="inquiry-subtitle">
            Communicate directly with your provider. A family member must be CC'd on all messages for record transparency.
          </p>

          {!currentUser ? (
            <div className="login-required-notice">
              <p>🔒 You must be logged in to send a dental inquiry.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="inquiry-form">
              {/* RECIPIENT PROVIDER */}
              <div className="form-group">
                <label htmlFor="provider-select">Select Recipient / Provider:</label>
                <select
                  id="provider-select"
                  value={provider}
                  onChange={(e) => setProvider(e.target.value)}
                  className="form-input"
                >
                  <option value="Ata'ata Dental Team">Ata'ata Dental Team</option>
                  <option value="School Dental Clinic">School Dental Clinic</option>
                  <option value="Community Dental Center">Community Dental Center</option>
                </select>
              </div>

              {/* SENDER EMAIL (READ-ONLY) */}
              <div className="form-group">
                <label>From (Your Account):</label>
                <input
                  type="email"
                  value={currentUser.email || ""}
                  disabled
                  className="form-input read-only-input"
                />
              </div>

              {/* REQUIRED FAMILY CC */}
              <div className="form-group">
                <label htmlFor="family-cc">
                  Family Member Email (Required CC) <span className="required-star">*</span>:
                </label>
                <input
                  id="family-cc"
                  type="email"
                  placeholder="parent-or-guardian@example.com"
                  required
                  value={familyCc}
                  onChange={(e) => setFamilyCc(e.target.value)}
                  className={`form-input ${
                    familyCc && !isCcValid ? "invalid-input" : ""
                  }`}
                />
                {familyCc && !isCcValid && (
                  <span className="field-hint error-hint">
                    Please enter a valid email address.
                  </span>
                )}
              </div>

              {/* SUBJECT */}
              <div className="form-group">
                <label htmlFor="inquiry-subject">Subject:</label>
                <input
                  id="inquiry-subject"
                  type="text"
                  placeholder="e.g. Question about brushing sensitivity"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="form-input"
                />
              </div>

              {/* MESSAGE */}
              <div className="form-group">
                <label htmlFor="inquiry-message">Message:</label>
                <textarea
                  id="inquiry-message"
                  rows={6}
                  placeholder="Type your question or query here..."
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="form-input textarea-input"
                />
              </div>

              {/* MESSAGES */}
              {statusMsg && <div className="status-banner success-banner">{statusMsg}</div>}
              {errorMsg && <div className="status-banner error-banner">{errorMsg}</div>}

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={isSending || !isCcValid || !subject || !message}
                className="submit-inquiry-btn"
              >
                {isSending ? "Sending Inquiry..." : "✉️ Send Inquiry"}
              </button>
            </form>
          )}
        </div>
      </main>

      <AppBanner />
    </div>
  );
};

export default LetsTalk;

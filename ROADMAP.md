# UI & Feature Development Roadmap

Status Legend:
- 🔴 **Backlog / Proposed** — Feature planned or queued
- 🟡 **In Progress** — Currently actively developing or refining
- 🟢 **Completed** — Built, verified, and merged
- ⚪ **On Hold / Deferred** — Paused or scheduled for future release

---

## 1. Master Feature Tracker

| ID | Feature / Component | Page Scope | Priority | Status | Target / Notes |
|---|---|---|---|---|---|
| F-01 | Announcement Banner | Global / Layout | High | 🔴 Proposed | Sticky banner under curve mask with page-specific messaging |
| F-02 | Logo Size Alignment | Auth & Navbar | Medium | 🔴 Proposed | Match form logo dimensions to logged-in navbar logo |
| F-03 | Navbar Curve Mask Adjustments | Global Navbar | High | 🔴 Proposed | Reduce gap below, slim top curve border, fix link alignment & button stickiness |
| F-04 | Language Selector with Flags | Global Navbar | Medium | 🔴 Proposed | Add country flags next to/within language options |
| F-05 | Vector Sticker Assets | Home Page | Low | 🔴 Proposed | Slots for custom Adobe Illustrator SVG/vector stickers |
| F-06 | Real-World Science/News Feed | Home Page | Medium | 🔴 Proposed | Social section linking to dental studies & news articles |
| F-07 | Permanent Museum Diagram & Admin Controls | Find My Teeth | High | 🔴 Proposed | Fixed labels (no undo/confirm), Admin-only editing |
| F-08 | FMT Conditions & Symptom Card Data | Find My Teeth | High | 🔴 Proposed | Interactive flip cards with custom condition/feeling copy |
| F-09 | Sun/Moon Centering Fix | Health Page | Medium | 🔴 Proposed | CSS responsive centering for day/night icons |
| F-10 | Video Content Integration | Health Page | Low | 🔴 Proposed | Embed video player slots for educational guides |
| F-11 | Provider Grid Layout Fix | My Providers | Medium | 🔴 Proposed | Fixed 2x2 grid dimensions to prevent content layout shifts |
| F-12 | Google Maps Provider Locator | My Providers | High | 🔴 Proposed | Interactive map & nearby dental clinic locator |
| F-13 | Custom Provider Highlight Cards | My Providers | Low | 🔴 Proposed | Card components for user-designed dental graphics |
| F-14 | Email-Style Inquiry Chat | Let's Talk | High | 🔴 Proposed | Simplified email chat UI requiring login & Family CC |
| F-15 | Medical Disclaimer Header | Let's Talk | High | 🔴 Proposed | Prominent educational/medical advice disclaimer |

---

## 2. Page-by-Page Feature & Task Breakdown

### 🌐 Global / Layout (`frontend/src/components/`)
- [ ] **Announcement Banner Component**:
  - Sits below navbar when unscrolled (under the curve mask in empty space), pushing content downward without overlap.
  - Sticky positioning when scrolled so it follows below the navbar.
- [ ] **Navbar Refinements**:
  - Image logo SVG sized to fit container perfectly without changing visual aspect ratio.
  - Reduce empty space below `CurveMask` so it does not block content below or behind it.
  - Slim top border of `CurveMask` above navbar for increased Tabloid Hero visibility while preserving a thin separation border.
  - Fix NavLinks responsive path following to prevent links overlapping each other or being clipped by the logo.
  - Position Language & Login/Logout buttons flush on top of the navbar curve ("sit on the curve") dynamically on window resize.
  - Language selector displaying associated country flags (e.g. 🇬🇧 English, 🇳🇿 Te Reo Māori, etc.).

---

### 🏠 1. Landing Page (`frontend/src/pages/Home.jsx`)
- [ ] **Announcement Banner Content**:
  > *"Welcome to the Ata'ata oral health programme. We are a team of dentists that want to make oral health easy peasy. We have three simple goals: 1) Improve oral health habits, 2) Make finding and seeing your provider easier, 3) To provide health information. Use our website alongside our app improve your smile today!"*
- [ ] **Vector Sticker Integration**: Asset slots for custom Adobe Illustrator vector stickers.
- [ ] **Social & Science Section**: Layout plan for connecting to real-world dental studies and news feeds.

---

### 🔑 2. Signup / Login Pages (`AuthPage.jsx`, `SignupPage.jsx`)
- [ ] **Logo Scaling**: Adjust logo dimensions in login/signup forms to visually match the logged-in navbar logo scale.

---

### 👤 3. Patient Profile Page (`frontend/src/pages/ProfilePage/`)
- [x] **Profile Layout Shell**: Left, Middle, and Right section layout.
- [ ] **Data Binding**: Bind Mongo user profile fields (`name`, `email`, `firebaseUid`) dynamically.

---

### 🦷 4. Find My Teeth (`frontend/src/pages/FindMyTeeth.jsx`)
- [ ] **Announcement Banner Content**:
  > *"Cheese! Have a look around the different parts of the mouth below to find a match to your smile. Add these features to your account to keep track of your smile."*
- [ ] **Permanent Diagram Mode**:
  - Remove "Undo" and "Confirm" temporary placement controls.
  - Lock label positions permanently like a museum diagram.
  - Restrict condition editing/placement configuration to logged-in Admin accounts only.
- [ ] **Condition Content & Descriptions**:
  - **Decay**: Appearance (black/brown/grey spots, cavities, dark gum areas), sensitivity, filled with fillings. Urgency to see dentist/OHT.
  - **Chipped tooth**: Causes (hard foods, sports/fall, grinding). Examination for filling & prevention.
  - **Gum disease**: Symptoms (swollen, red, bleeding, sore gums, bad breath), plaque build-up, cleaning & prevention.
  - **Yellow tooth**: Natural color, food/drink staining, smoking/vaping. Discussion with dental team.
  - **Recession**: Gum pulling back, sensitivity, toothbrushing intensity (soft/electric brush advice).
  - **Gaps between teeth**: Natural spacing, missing/unerupted teeth, orthodontic evaluation.
  - **Crowding**: Overlapped/cramped teeth, hygiene difficulty, orthodontic & cavity prevention.
  - **Ulcer**: Causes, self-resolution, salt water rinse guidance, 1-week resolution threshold before seeing professional.
- [ ] **Flipped Symptom Cards ("Is it more of a feeling?")**:
  - **Cold**: Short sharp sensitivity, sensitive toothpaste, link to Recession tooth, decay warning.
  - **Hot**: Short sharp sensitivity, sensitive toothpaste, link to Recession tooth, decay/pain warning.
  - **Bleeding**: Gum disease sign, plaque build-up, brushing/flossing advice, professional examination.
  - **Wiggly teeth**: Baby vs adult tooth differences, trauma/knock, gum disease, urgent evaluation for adult teeth.
  - **Pain**: Soreness, infection warning, eating/night pain, urgent dental appointment recommendation.

---

### 🩺 5. Oral Health Page (`frontend/src/pages/Health.jsx`)
- [ ] **Sun/Moon Icon Alignment**: Fix CSS absolute/hardcoded positioning to keep icons perfectly centered in their respective day/night circles across all viewport resolutions.
- [ ] **Video Embed Slots**: Link educational video players to corresponding sections once video assets are ready.

---

### 🏥 6. My Providers Page (`frontend/src/pages/MyProviders.jsx`)
- [ ] **Announcement Banner Content**:
  > *"Get to know your local dentists! Whether its on the school dental bus or at your local clinic it is important that you see a dentist at least every year. The best thing is that for all under 18s it's free!"*
- [ ] **Fixed 2x2 Grid Dimensions**: Prevent layout collapse/expansion when selecting symptoms or switching card states.
- [ ] **Google Maps API Integration**: Ensure map loads correctly and enables user interaction to find nearby providers.
- [ ] **Custom Highlight Cards**: Slots for custom dental graphics on hover/highlight.

---

### 💬 7. Let's Talk Page (`frontend/src/pages/LetsTalk.jsx`)
- [ ] **Announcement Banner Content**:
  > *"Have any questions? Comments? Queries or concerns? Let us know."*
- [ ] **Prominent Disclaimer Header**:
  > *"The information provided on this website is for general educational purposes only and is not a substitute for professional dental advice, diagnosis, or treatment. Questions and answers here are meant to help you learn, not to diagnose dental problems or recommend specific treatments. Every mouth is different. If you have dental pain, swelling, bleeding, injury, or any other concern, always see a qualified dentist or dental professional. Never ignore, delay, or replace professional dental care because of something you read on this website. If you think you may have a dental emergency, contact a dentist or emergency service right away."*
- [ ] **Email-Style Communication Section**:
  - Simplified email UI interface for user inquiries.
  - Login required to access and submit queries.
  - **Family CC Field**: Require user to CC a family member's email address to ensure transparent communication records for minors/patients.

---

### 🛡️ 8. Security Settings Page (`frontend/src/pages/SecuritySettings.jsx`)
- [ ] **Password & Session Controls**: Firebase password reset & JWT session logout.

---

## 3. Change & Development Log

| Date | Scope | Description | Status |
|---|---|---|---|
| 2026-09-12 | Roadmap | Added complete UI specification, page breakdown, and content text | 🟢 Completed |



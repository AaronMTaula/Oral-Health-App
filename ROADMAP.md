# UI & Feature Development Roadmap

Status Legend:
- 🔴 **Backlog / Proposed** — Feature planned or queued
- 🟡 **In Progress** — Currently actively developing or refining
- 🟢 **Completed** — Built, verified, and merged
- ⚪ **On Hold / Deferred** — Paused or scheduled for future release

---

## 1. Master Feature Tracker

| ID | Feature / Component | Page Scope | Priority | Status | Description / Target |
|---|---|---|---|---|---|
| F-01 | Responsive Shell & Layout | Global | High | 🟢 Completed | Dynamic Navbar, Sidebar, and background masks |
| F-02 | Auth Flow UI | Auth / Signup | High | 🟢 Completed | Firebase Login, Signup, Forgot Password forms |
| F-03 | Patient Profile Dashboard | Profile Page | High | 🟡 In Progress | Left/Middle/Right profile sections & data binding |
| F-04 | Find My Teeth Feature | Find My Teeth | Medium | 🔴 Proposed | Tooth locator / chart visualization |
| F-05 | Oral Health Diagnoses & Reminders | Health | Medium | 🔴 Proposed | Diagnoses list, treatment tracking, reminders |
| F-06 | Dental Provider Finder | My Providers | Medium | 🔴 Proposed | Search & filter dentists / dental clinics |
| F-07 | Community / Discussion | Let's Talk | Low | 🔴 Proposed | Forum / Q&A / advice board |
| F-08 | Account Security Settings | Security Settings | Medium | 🔴 Proposed | Password update, MFA, session management |

---

## 2. Page-by-Page Feature & Task Breakdown

### 🌐 Global / Layout Components (`frontend/src/components/`)
- [x] **Navbar & Sidebar**: Navigation controls, active page highlighting, user actions dropdown.
- [x] **Banner & Curve Mask**: Header banners and sticker/peel aesthetics.
- [ ] **Global Theme & Typography**: Uniform font scales and responsive CSS variables.

---

### 🏠 1. Home Page (`frontend/src/pages/Home.jsx`)
- [x] **Hero Section**: TabloidHero component with call-to-action buttons.
- [ ] **Quick Action Cards**: Shortcuts to Health, Find My Teeth, and My Providers.
- [ ] **Educational Preview**: Dynamic oral health tips / daily reminders snippet.

---

### 🔑 2. Authentication Pages (`AuthPage.jsx`, `SignupPage.jsx`)
- [x] **Firebase Login Form**: Email/password login with error state notifications.
- [x] **Firebase Signup Form**: Full name, email, password matching, and profile init.
- [x] **Forgot Password**: Password reset email trigger.
- [ ] **Social Auth (Optional)**: Google Sign-In button integration.

---

### 👤 3. Patient Profile Page (`frontend/src/pages/ProfilePage/`)
- [x] **Profile Shell**: Left, Middle, and Right section layout.
- [ ] **Left Section**: Patient avatar, name, account status, and quick stats.
- [ ] **Middle Section**: Dental history, active treatment plans, and uploaded scans.
- [ ] **Right Section**: Next appointment reminder, saved providers list, and health goals.

---

### 🦷 4. Find My Teeth Page (`frontend/src/pages/FindMyTeeth.jsx`)
- [ ] **Interactive Dental Chart**: Visual tooth selector / arch diagram.
- [ ] **Symptom Tracker**: Select tooth number and log pain/sensitivity/bleeding.
- [ ] **Export / Share**: Save tooth log or export report for dental visit.

---

### 🩺 5. Oral Health Page (`frontend/src/pages/Health.jsx`)
- [ ] **Diagnoses Overview**: Render diagnoses data from `diagnosesData.js`.
- [ ] **Treatment Timelines**: Case study & treatment data integration from `treatments.js`.
- [ ] **Reminders & Hygiene Schedule**: Flossing/brushing/rinse tracking from `remindersData.js`.

---

### 🏥 6. My Providers Page (`frontend/src/pages/MyProviders.jsx`)
- [ ] **Provider Search Bar**: Filter dentists by location, rating, or specialty.
- [ ] **Google Maps Integration**: Render nearby dental clinics via `VITE_GOOGLE_MAPS_API_KEY`.
- [ ] **Saved Providers**: Bookmark primary dentist and preferred clinics.

---

### 💬 7. Let's Talk Page (`frontend/src/pages/LetsTalk.jsx`)
- [ ] **Discussion Board / Q&A**: Oral hygiene discussion topics and user tips.
- [ ] **FAQ Section**: Common dental questions and expert advice.

---

### 🛡️ 8. Security Settings Page (`frontend/src/pages/SecuritySettings.jsx`)
- [ ] **Password Management**: Update account password via Firebase Auth.
- [ ] **Active Sessions**: View and revoke active JWT sessions (`POST /api/auth/logout`).
- [ ] **Account Deletion**: Safe user data deletion with confirmation modal.

---

## 3. Change & Development Log

| Date | Page / Feature | Update Details | Status |
|---|---|---|---|
| 2026-09-12 | Global | Initialized page-filtered roadmap structure | 🟢 Completed |
| 2026-09-12 | AuthPage | Verified Firebase Auth + backend JWT sync in live deployment | 🟢 Completed |


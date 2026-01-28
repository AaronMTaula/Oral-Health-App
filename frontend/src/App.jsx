import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx";
import MyProviders from "./pages/MyProviders";
import FindMyTeeth from "./pages/FindMyTeeth";
import LetsTalk from "./pages/LetsTalk";
import SecuritySettings from "./pages/SecuritySettings";
import Home from "./pages/Home";
import Health from "./pages/Health";
import Test from "./pages/Test";

import { AuthProvider, useAuth } from "./context/useAuth";

/* =========================
   Protected Route
========================= */
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        Loading...
      </div>
    );
  }

  return currentUser ? children : <Navigate to="/auth" />;
};

/* =========================
   App
========================= */
function App() {
  const location = useLocation();

  // Navbar shows on all pages except /auth
  const showNavbar = location.pathname !== "/auth";

  return (
    <div className="App">
      {/* Navbar */}
      {showNavbar && <Navbar />}

      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/" element={<Home />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-providers"
            element={
              <ProtectedRoute>
                <MyProviders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/find-my-teeth"
            element={
              <ProtectedRoute>
                <FindMyTeeth />
              </ProtectedRoute>
            }
          />

          <Route
            path="/lets-talk"
            element={
              <ProtectedRoute>
                <LetsTalk />
              </ProtectedRoute>
            }
          />

          <Route
            path="/security"
            element={
              <ProtectedRoute>
                <SecuritySettings />
              </ProtectedRoute>
            }
          />

          <Route
            path="/health"
            element={
              <ProtectedRoute>
                <Health />
              </ProtectedRoute>
            }
          />

          {/* 🔬 Sandbox / Playground — DEV ONLY */}
          {import.meta.env.DEV && <Route path="/test" element={<Test />} />}
        </Routes>
      </div>
    </div>
  );
}

/* =========================
   App Wrapper
========================= */
const AppWrapper = () => (
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);

export default AppWrapper;

import React from "react";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import "./App.css";

import Thera from "./components/Thera";
import Breathe from "./components/Breathe";
import Learn from "./components/Learn";
import Start from "./components/Start";
import MoodBoard from "./components/MoodBoard";
import JournalPage from "./components/JournalPage";
import ScrapbookPage from "./components/ScrapbookPage";
import AuthPage from "./components/AuthPage";
import TherapyChat from "./components/TherapyChat";
import Navbar from "./components/Navbar";

// ✅ Layout with navbar
const Layout = () => (
  <div>
    <Navbar />
    <div className="container">
      <Outlet />
    </div>
  </div>
);

// ✅ PrivateRoute for internal pages only
const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("token");
  return isLoggedIn ? children : <Navigate to="/auth" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ Public Auth Route */}
        <Route path="/auth" element={<AuthPage />} />

        {/* ✅ Public Landing Page */}
        <Route path="/thera" element={<Thera />} />

        {/* ✅ Protected Feature Routes */}
        <Route
          path="/thera/breathe"
          element={
            <PrivateRoute>
              <Breathe />
            </PrivateRoute>
          }
        />
        <Route
          path="/thera/breathe/learn"
          element={
            <PrivateRoute>
              <Learn />
            </PrivateRoute>
          }
        />
        <Route
          path="/thera/breathe/start"
          element={
            <PrivateRoute>
              <Start />
            </PrivateRoute>
          }
        />
        <Route
          path="/thera/moodboard"
          element={
            <PrivateRoute>
              <MoodBoard />
            </PrivateRoute>
          }
        />
        <Route
          path="/thera/journal"
          element={
            <PrivateRoute>
              <JournalPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/thera/journal/ScrapbookPage"
          element={
            <PrivateRoute>
              <ScrapbookPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/thera/therapychat"
          element={
            <PrivateRoute>
              <TherapyChat />
            </PrivateRoute>
          }
        />

        {/* Optional: Fallback route to /thera */}
        <Route path="*" element={<Navigate to="/thera" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

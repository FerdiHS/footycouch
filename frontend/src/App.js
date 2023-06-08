import "./styles.css";
import * as React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Default from "./pages/Default.js";
import LoginPage from "./pages/LoginPage.js";
import SignUpPage from "./pages/SignUpPage.js";
import HomePage from "./pages/HomePage.js";
import TeamManagementPage from "./pages/TeamManagementPage";
import ProfilePage from "./pages/ProfilePage";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Default />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/team_management" element={<TeamManagementPage />} />
        <Route path="/profile" element={<ProfilePage/>} />
      </Routes>
    </Router>
  );
}


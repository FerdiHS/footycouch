import "./styles.css";
import * as React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Default from "./pages/Default.js";
import LoginPage from "./pages/LoginPage.js";
import SignUpPage from "./pages/SignUpPage.js";
import HomePage from "./pages/HomePage.js";
import TeamManagementPage from "./pages/TeamManagementPage";
import ProfilePage from "./pages/ProfilePage";
import useToken from "./components/Token";
export default function App() {
  const {token, setToken} = useToken();
  if(!token) {
    return (
    <Router>
      <Routes>
        <Route path="/" element={<Default />} />
        <Route path="/login" element={<LoginPage setToken={setToken}/>} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/*" element={<Navigate to="/login"/>}/>
      </Routes>
    </Router>);
  } else {
    return (
      <Router>
        <Routes>
          <Route path="/home" element={<HomePage setToken={setToken}/>} />
          <Route path="/team_management" element={<TeamManagementPage setToken={setToken}/>} />
          <Route path="/profile" element={<ProfilePage setToken={setToken}/>} />
          <Route path="/*" element={<Navigate to="/home"/>}/>
        </Routes>
      </Router>
    );
  }
}

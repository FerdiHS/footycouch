import "./styles.css";
import * as React from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Default from "./pages/Default.js";
import LoginPage from "./pages/LoginPage.js";
import SignUpPage from "./pages/SignUpPage.js";
import HomePage from "./pages/HomePage.js";
import TeamManagementPage from "./pages/TeamManagementPage";
import ProfilePage from "./pages/ProfilePage";
import TransferPage from "./pages/TransferPage";
import useToken from "./components/Token";
import UsersPage from "./pages/UsersPage";
import PastHistoryPage from "./pages/PastHistoryPage";
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
          <Route path="/transfer" element={<TransferPage setToken={setToken}/>} />
          <Route path="/pastHistory" element={<PastHistoryPage setToken={setToken}/>}/>
          <Route path="/user/*" element ={<UsersPage setToken={setToken}/>} />
          <Route path="/*" element={<Navigate to="/home"/>}/>
        </Routes>
      </Router>
    );
  }
}

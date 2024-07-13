import "./App.css";
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import { getUserId } from "./redux/user/userAction";
import LoginPage from "./pages/LoginPage.js";
import SignupPage from "./pages/SignupPage.js";
import { addPlayers, getLastUpdated, getPlayers } from "./redux/players/playerAction.js";
import { API_URI } from "./constants.js";
import axios from "axios";
import { useEffect } from "react";
import PostPage from "./pages/PostPage.js";
export default function App() {
  const dispatch = useDispatch();
  const userId = useSelector(getUserId);
  const players = useSelector(getPlayers);
  if (players.players.length === 0) {
    axios.get(API_URI + "/players").then(res => dispatch(addPlayers(res.data)));
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      axios.get(API_URI + "/players").then(res => dispatch(addPlayers(res.data)));
    }, 1800000 + ((new Date()) - players.last_updated));
    return () => clearTimeout(timer);
  }, [players]);

  if(userId == null) {
    return (
    <Router>
      <Routes>
        <Route path="/page/:page" element={<WelcomePage isPublic={true}/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/*" element={<Navigate to="/page/1"/>}/>
      </Routes>
    </Router>);
  } else {
    return (
      <Router>
        <Routes>
          <Route path="/page/:page" element={<WelcomePage isPublic={true}/>} />
          <Route path="/page/:page/follow" element={<WelcomePage isPublic={false}/>} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/*" element={<Navigate to="/page/1"/>}/>
        </Routes>
      </Router>
    );
  }
}

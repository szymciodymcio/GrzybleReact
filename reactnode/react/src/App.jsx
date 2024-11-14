import React from "react";
import {useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Gra } from "./Components/Gra";
import { Register } from "./Components/Register";
import { Login } from "./Components/Login";
import { Logged } from "./Components/Logged";
import { GameEnd } from "./Components/GameEnd";
import { LeaderBoard } from "./Components/LeaderBoard";
import Cookies from 'js-cookie';


function App() {
  const [username, setUsername] = useState('');
  const [score, setScore] = useState(0);




  const handleUsernameChange = (newUsername, newScore) => {
      setUsername(newUsername);
      setScore(newScore);
      Cookies.set('username', newUsername, {expires: 1/24});
      Cookies.set('score', newScore, {expires: 1/24});
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login onUsernameChange={handleUsernameChange} />}></Route>
          <Route path="/register" element={<Register onUsernameChange={handleUsernameChange} />}></Route>
          <Route path="/logged" element={<Logged username={Cookies.get("username")} score={Cookies.get("score")}/>}></Route>
          <Route path="/easy" element={<Gra username={Cookies.get("username")} punkty={Cookies.get("score")} gamemode="easy" />}></Route>
          <Route path="/medium" element={<Gra username={Cookies.get("username")} punkty={Cookies.get("score")} gamemode="medium"/>}></Route>
          <Route path="/hard" element={<Gra username={Cookies.get("username")} punkty={Cookies.get("score")} gamemode="hard"/>}></Route>
          <Route path="/gameEnd" element={<GameEnd />}></Route>
          <Route path="/leaderboard" element={<LeaderBoard />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App

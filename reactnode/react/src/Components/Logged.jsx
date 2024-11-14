import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import '../logged.css';

export function Logged( { username } ){
    const navigate = useNavigate();
    useEffect(() => {
        fetch('http://localhost:5000/logged')
            .then(response => response.text())
            .then(data => {
                console.log('Odpowiedź:', data);
            })
            .catch(error => console.error('Błąd sieci:', error));
    }, []);

    return(
        <>
            <div id="header">
                <div id="title"><h1><a href="/leaderboard" style={{cursor: "pointer"}}>Grzyble</a></h1></div>
                <div id="userScore"><h1 style={{color: "#1ce89a"}}>Witaj {Cookies.get("username")} ({Cookies.get("score")}pkt.)</h1></div>
                <div id="logout"><h1><a href='/'>Wyloguj!</a></h1></div>
            </div>
            <div className="container">
                <div className="easy children" href="/easy"><h2><a href="/easy">Easy</a></h2></div>
                <div className="medium children" href="/medium"><h2><a href="/medium">Medium</a></h2></div>
                <div className="hard children" href="/hard"><h2><a href="/hard">Hard</a></h2></div>
            </div>
        </>
    )
}
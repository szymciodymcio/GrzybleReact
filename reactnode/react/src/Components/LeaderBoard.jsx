import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import '../main.css';

export function LeaderBoard(){
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/leaderboard')
            .then(response => response.json())
            .then(data => {
                setUsers(data);
            })
            .catch(error => console.error('Błąd', error));
    }, []);

    return(
        <>
            <div id="leaderboardPanel">  
            <h1>Leaderboard</h1>
            <h2 style={{textAlign: "center"}}><a href="/logged" style={{cursor: "pointer", textAlign: "center"}}>Wróć!</a></h2>
                <ol>
                    {users.map((user, index) => (
                        <li key={index}> 
                            <h2 style={{color: "white", display: "inline-block"}}>{user.username}</h2>
                            <h2 style={{color: "#b0b309", display: "inline-block", position:"absolute", right: "15px"}}>{user.score}</h2>
                            <hr/>
                        </li>
                    ))}
                </ol>
            </div>
        </>
    )

}
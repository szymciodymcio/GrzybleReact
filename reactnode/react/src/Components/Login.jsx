import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../main.css';

export function Login( { onUsernameChange } ){
    Cookies.remove("username");
    Cookies.remove("score");
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [hidden, setHidden] = useState('hidden');
    const navigate = useNavigate();
    async function logowanie(){
        //console.log(login, password);
        const response = await fetch("http://localhost:5000/logged", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ login, password }),
          });
        if(response.ok) {
            setHidden("hidden");
            Cookies.remove("username");
            Cookies.remove("score");
            const data = await response.json();
            const username = data.username;
            const score = data.score;
            onUsernameChange(username, score)
            navigate("/logged")
        }
        else{
            setHidden("visible");
        }

    }

    return(
        <>
            <div id="loginPanel"><h1>Zaloguj się!</h1>
                    <p>Login:</p> <input type="text" name="login" id="login"   value={login} 
                    onChange={(e) => setLogin(e.target.value)} /><br/>
                    <p>Password:</p> <input type="password" name="password" id="password" value={password} 
                    onChange={(e) => setPassword(e.target.value)} /><br/>
                    <input type="submit" value="Zaloguj!"  onClick={logowanie}/>
                    <h4>Nie masz konta? <a href="/register">Zarejestruj się!</a></h4>
                    <a style={{visibility: hidden, color: "red"}}>Zły login lub hasło!</a>
            </div>
        </>
    )
}
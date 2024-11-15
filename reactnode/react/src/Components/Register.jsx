import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../main.css';

export function Register( { onUsernameChange } )
{
    Cookies.remove("username");
    Cookies.remove("score");
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [nameuser, setNameuser] = useState('');
    const [hidden, setHidden] = useState('hidden');
    const navigate = useNavigate();
    
    async function rejestracja(){
        const response = await fetch("http://localhost:5000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nameuser , login, password }),
          });
        if(response.ok) {
            setHidden("hidden");
            Cookies.remove("username");
            Cookies.remove("score");
            const data = await response.json();
            const username = data.nameuser;
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
            <div id="registerPanel" className="register"><h1>Zarejestruj się!</h1>
                <p>Username:</p> <input type="text" name="nameuser" id="nameuser" value={nameuser} 
                onChange={(e) => setNameuser(e.target.value)} /><br/>
                <p>Login:</p> <input type="text" name="login" id="login"  value={login} 
                onChange={(e) => setLogin(e.target.value)} /><br/>
                <p>Password:</p> <input type="password" name="password" id="password" value={password} 
                onChange={(e) => setPassword(e.target.value)} /><br/>
                <input type="submit" value="Zarejestruj!" onClick={rejestracja} />
                <h4>Masz konto?<a href="/"> Zaloguj się!</a></h4>
                <a style={{visibility: hidden, color: "red"}}>Istnieje już użytkownik z takim loginem lub nazwą użytkownika!</a>
        </div>
        </>
    )
}
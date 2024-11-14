import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../game.css'


export function Gra({username, punkty ,gamemode}){
    const [nazwaGrzyba, setNazwaGrzyba] = useState('');
    const [blur, setBlur] = useState(1);
    const [answerColor, setAnswerColor] = useState("#1ce89a");
    const [answer, setAnswer] = useState('');
    const [previousAnswer, setPreviousAnswer] = useState('');
    const [points, setPoints] = useState(punkty);
    const [image, setImage] = useState('');
    const [gameModeColor, setGameModeColor] = useState('');
    const [napis, setNapis] = useState('');
    const [hidden, setHidden] = useState("hidden");


    const navigate = useNavigate();
    useEffect(() => {
        if(gamemode == "easy" && answer == '')
            {
                setImage("borowik.jpg")
                setGameModeColor("#3dd440")
                setAnswer("borowik")
                setPreviousAnswer("borowik")
            }
            if(gamemode == "medium" && answer == '')
            {
                setImage("czubajka.jpg")
                setGameModeColor("#FFD23F")
                setAnswer("czubajka")
                setPreviousAnswer("czubajka")
            }
            if(gamemode == "hard" && answer == '')
            {
                setImage("szyszkowiec.jpg")
                setGameModeColor("#EE4266")
                setAnswer("szyszkowiec")
                setPreviousAnswer("szyszkowiec");
            }
    }, []);



    async function gra(e){
        e.preventDefault();
        setNapis("odpowiedź:")
        setPreviousAnswer(answer);
        const dataToSend = {
            nazwaGrzyba: nazwaGrzyba,
            username: username, 
        };
        setBlur(blur+1);
        const response = await fetch("http://localhost:5000/"+gamemode, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataToSend),
          });
        if(response.ok) {
            const data = await response.json();
            setHidden("visible");
            setAnswerColor(data.kolor);
            //setPoints(data.points);
            Cookies.set("score", data.points);
            setPoints(Cookies.get("score"));
            setAnswer(data.answer);
            setImage(data.link);
            if(blur > 10)
            {
                navigate("/gameEnd");
            }
        }
        else{
            //setHidden("visible");
        }
    }

    return(
        <>
        <div id="header">
                <div id="title"><h1 style={{color: gameModeColor}}>&lt;{gamemode}&gt;</h1></div>
                <div id="userScore"><h1 style={{color: answerColor}}>{username}({points} pkt.) {napis} <a style={{visibility: hidden}}>{previousAnswer}</a></h1></div>
                <div id="logout"><h1><a href='/logged'>Skończ grę!</a></h1></div>
        </div>
        <div id="container">
            <img src={`/zdjecia_grzybow/${image}`} style={{filter: "blur(" + blur + "px)"}}/>
                <input  type="text" name="nazwaGrzyba" id="nazwaGrzyba" value={nazwaGrzyba} 
                    onChange={(e) => setNazwaGrzyba(e.target.value)}/>
                <input type="submit" value="->" id='submitAnswer'  onClick={gra}/>
        </div>
        </>
    )
}
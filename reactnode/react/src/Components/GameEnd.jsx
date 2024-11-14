import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import '../main.css';

export function GameEnd(){
    return(
        <>
            <div id="loginPanel">  
                <h1>Gratulacje! Skończyłeś grę z {Cookies.get("score")} punktami!</h1>
                <h1><a href='/logged'>Zagraj jeszcze raz!</a></h1>
            </div>
        </>
    )

}
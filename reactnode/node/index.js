const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = 5000;

const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true               
}));



app.use(cookieParser());
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


let db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mushrooms",
  });
 
db.connect(function (err) {
    if (err) {
      console.log(err);
    }
});
  


app.post("/logged", (req,res) =>{
    const {login, password} = req.body;
    let sql ="SELECT * FROM users WHERE login='" + login + "' and password ='" + password + "'";
    db.query(sql, (err,result) =>{
    if (err) return res.status(500).json({ error: err });
      if (result.length === 0) {
        return res
          .status(401)
          .json({ message: 0 });
      }

      const name = result[0].username;
      res.cookie("username", name, { httpOnly: true, maxAge: 60 * 60 * 1000 });
      const userData = {
        username: result[0].username,
        score: result[0].score
      };
      res.status(200).json(userData);
    });
});

app.post("/register", (req,res) =>{
  const {nameuser, login, password} = req.body;
  let sql = "SELECT * FROM users WHERE login = ? OR username = ?";
  db.query(sql, [login, nameuser], (err,result) =>{
    if (err) return res.status(500).json({ error: err });
      if(result.length > 0)
      {
        return res
        .status(401)
        .json({ message: 0 });
      }
      const userData = {
        username: result[0].username,
        score: result[0].score
      };
      let sqlInsert = "INSERT INTO `users`(`id_user`, `username`, `login`, `password`, `score`) VALUES ('',?,?,?,'0')";
      db.query(sqlInsert, [nameuser,login,password], (err,result) =>{
        if (err) return res.status(500).json({ error: "Błąd serwera" });
        res.status(201).json(userData);
      });

  });


});


function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); 
}


var nazwaPoprzedniegoEasy = "borowik";
var nazwaPoprzedniegoMedium = "czubajka";
var nazwaPoprzedniegoHard = "szyszkowiec";

app.get("/logged", (req,res) =>{
  nazwaPoprzedniegoEasy = "borowik";
  nazwaPoprzedniegoMedium = "czubajka";
  nazwaPoprzedniegoHard = "szyszkowiec";
  res.send("Zresetowano");
})


app.post("/easy", (req,res) =>{
  const {nazwaGrzyba, username} = req.body;
  let sql = "SELECT * FROM users WHERE username=?";
  var punkty = 0;

  let number = getRandomInt(1,16);
  db.query(sql,[username],(err,result) =>{
      punkty = result[0].score;
      let selectGrzyb = "SELECT * FROM grzyby WHERE poziom_trudnosci=25 and id_grzyba =?";
      db.query(selectGrzyb, [number], (err,result2) =>{
        if (err) return res.status(500).json({ error: err });
        console.log("Aktualny grzyb:", (result2[0].nazwa).toString());
        if(nazwaPoprzedniegoEasy == nazwaGrzyba)
        {
          punkty = punkty+25;
          const answerData = {
            answer: (result2[0].nazwa).toString(),
            points: punkty,
            kolor: "#07eb0b",
            link: (result2[0].img).toString()
          }

          let updatescore = "UPDATE users SET score=score+25 WHERE username='" + username + "'";
          db.query(updatescore, (err,result) =>{
            if (err) return res.status(500).json({ error: "Błąd serwera" });
            res.status(201).json(answerData);
          });
        }
        else{
          const answerData = {
            answer: (result2[0].nazwa).toString(),
            points: punkty,
            kolor: "red",
            link: result2[0].img
          }
          res.status(201).json( answerData );

        }
        nazwaPoprzedniegoEasy = result2[0].nazwa;
      });
  })
});

app.post("/medium", (req,res) =>{
  const {nazwaGrzyba, username} = req.body;
  let sql = "SELECT * FROM users WHERE username=?";
  var punkty = 0;

  let number = getRandomInt(16,31);
  db.query(sql,[username],(err,result) =>{
      punkty = result[0].score;
      let selectGrzyb = "SELECT * FROM grzyby WHERE poziom_trudnosci=50 and id_grzyba =?";
      db.query(selectGrzyb, [number], (err,result2) =>{
        if (err) return res.status(500).json({ error: err });
        console.log("Aktualny grzyb:", (result2[0].nazwa).toString());
        if(nazwaPoprzedniegoMedium == nazwaGrzyba)
        {
          punkty = punkty+50;
          const answerData = {
            answer: (result2[0].nazwa).toString(),
            points: punkty,
            kolor: "#07eb0b",
            link: (result2[0].img).toString()
          }

          let updatescore = "UPDATE users SET score=score+50 WHERE username='" + username + "'";
          db.query(updatescore, (err,result) =>{
            if (err) return res.status(500).json({ error: "Błąd serwera" });
            res.status(201).json(answerData);
          });
        }
        else{
          const answerData = {
            answer: (result2[0].nazwa).toString(),
            points: punkty,
            kolor: "red",
            link: result2[0].img
          }
          res.status(201).json( answerData );

        }
        nazwaPoprzedniegoMedium = result2[0].nazwa;
      });
  })



})

app.post("/hard", (req,res) =>{
  const {nazwaGrzyba, username} = req.body;
  let sql = "SELECT * FROM users WHERE username=?";
  var punkty = 0;

  let number = getRandomInt(31,43);
  db.query(sql,[username],(err,result) =>{
      punkty = result[0].score;
      let selectGrzyb = "SELECT * FROM grzyby WHERE poziom_trudnosci=100 and id_grzyba =?";
      db.query(selectGrzyb, [number], (err,result2) =>{
        if (err) return res.status(500).json({ error: err });
        console.log("Aktualny grzyb:", (result2[0].nazwa).toString());
        if(nazwaPoprzedniegoHard == nazwaGrzyba)
        {
          punkty = punkty+100;
          const answerData = {
            answer: (result2[0].nazwa).toString(),
            points: punkty,
            kolor: "#07eb0b",
            link: (result2[0].img).toString()
          }

          let updatescore = "UPDATE users SET score=score+100 WHERE username='" + username + "'";
          db.query(updatescore, (err,result) =>{
            if (err) return res.status(500).json({ error: "Błąd serwera" });
            res.status(201).json(answerData);
          });
        }
        else{
          const answerData = {
            answer: (result2[0].nazwa).toString(),
            points: punkty,
            kolor: "red",
            link: result2[0].img
          }
          res.status(201).json( answerData );

        }
        nazwaPoprzedniegoHard = result2[0].nazwa;
      });
  })

})

app.get("/leaderboard", (req,res) =>{
    let sql = "SELECT * FROM users ORDER BY score DESC LIMIT 5";

    db.query(sql, (err,result) =>{
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.json(result);
    });

});



app.listen(PORT, (err) => {
    console.log(`Serwer działa na porcie ${PORT}`);
  });
  
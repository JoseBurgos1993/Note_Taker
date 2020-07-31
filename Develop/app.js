//const http = require("http");
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 8000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const characters = [
    {
        name: "Person_Man",
        age: "50",
        occupation: "Orange Juice Salesman"
    },
    {
        name: "Potato_Henry",
        age: "7",
        occupation: "Horizontal Dolphin"
    },
    {
        name: "Them",
        age: "Hello",
        occupation: "Friends"
    }
];

app.get("/", function(req,res){
    res.sendFile(path.join(__dirname + "/public/", "index.html"));
});
app.get("/notes", function(req,res){
    res.sendFile(path.join(__dirname + "/public/", "notes.html"));
});
app.get("/api/characters", function(req,res){
    return res.json(characters);
});
app.get("/api/characters/:character",function(req,res){
    const chosen = req.params.character;
    for(let i = 0; i < characters.length; i++){
        if(chosen === characters[i].name) return res.json(characters[i]);
    }
    return res.send("Not real dude bro");
});

app.listen(port,function(){
    console.log("Server listening on: http://localhost:" + port);
});
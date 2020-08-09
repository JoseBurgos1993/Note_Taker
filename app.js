//const http = require("http");
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.get("/", function(req,res){
    res.sendFile(path.join(__dirname + "/public/", "index.html"));
});

app.get("/notes", function(req,res){
    res.sendFile(path.join(__dirname + "/public/", "notes.html"));
});

app.get("/api/notes", function(req,res){
    const data = fs.readFileSync(__dirname+"/db/db.json", "utf8");
    res.send(JSON.parse(data));
});

app.delete("/api/notes/:index", function(req,res){
    const data = JSON.parse(fs.readFileSync(__dirname+"/db/db.json", "utf8"));
    for(let i = 0; i < data.length; i++){
        if(data[i].id == req.params.index){
            data.splice(i,1);
        }
    }
    fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(data) + "\n", function(err){
        if(err) throw err;
        console.log("Data Deleted!");
    });
    res.end();

});

app.post("/api/notes", function(req,res){
    const newData = req.body;
    console.log(req.body);
    const data = JSON.parse(fs.readFileSync(__dirname+"/db/db.json", "utf8"));
    if(data.length == 0){
        newData.id = 1;
    } else{
        const newID = data[data.length - 1].id + 1;
        newData.id = newID;
    }

    data.push(newData);
    fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(data) + "\n", function(err){
        if(err) throw err;
        console.log("Data saved!");
    });
    res.end();
});

app.listen(PORT,function(){
    console.log("Server listening on PORT:" + PORT);
});
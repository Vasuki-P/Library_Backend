const express = require("express");
const app=express();
const mysql=require('mysql');
const cors= require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user:'root',
    host :'localhost',
    password:'root123',
    database:'Library',
});

app.post("/create",(req,res)=>{
    const title=req.body.title;
    const author =req.body.author ;
    const isbn=req.body.isbn;
    const genre=req.body.genre;
    const publisher=req.body.publisher;
    const publication_year=req.body.publication_year;
    const no_of_copies=req.body.no_of_copies;

    db.query(
    "INSERT INTO book (title, author,isbn, genre, publisher, publication_year, no_of_copies ) VALUES(? ,? ,? ,? ,?,?,?)",
     [title, author,isbn, genre, publisher, publication_year, no_of_copies], 
     (err, result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("value inserrted");
        }
     }
     );
});

app.get('/books',(req,res)=>{
    db.query("select * from book",(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
});

app.listen(3001, () => {
    console.log("server started");
})
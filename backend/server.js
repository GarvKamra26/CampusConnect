const express = require('express');
const mysql = require('mysql');


const app = express();

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"campusConnect"
}
)

app.get('/', (req,res)=>{
    res.send("Welcome to campusConnect")
})

app.listen(5000, ()=> {
    console.log("connected to server")
})
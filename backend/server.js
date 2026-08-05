require("dotenv").config()

const express = require('express');
const cors = require('cors');
const db = require("./config/db.js")

const app = express();

app.use(cors());
app.use(express.json());


app.get('/', (req,res)=>{
    res.send("Welcome to campusConnect")
})

app.listen(3000, ()=> {
    console.log("Server running...")
})
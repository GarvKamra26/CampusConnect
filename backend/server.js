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

async function testDatabase() {
    try {
        const connection = await db.getConnection();
        console.log("✅ Connected to MySQL!");
        connection.release();
    } catch (err) {
        console.error("❌ Database connection failed:", err);
    }
}

testDatabase();

app.listen(3000, ()=> {
    console.log("Server running...")
})
require("dotenv").config()

const express = require('express');
const cors = require('cors');
const db = require("./config/db.js");

const app = express();

const authRoutes = require("./routes/auth.js");
const authMiddleware = require("./middleware/authMiddleware.js");
const getProfile = require("./controllers/profileController.js");

//Setup
app.use(cors());
app.use(express.json());

app.get('/', (req,res)=>{
    res.send("Welcome to campusConnect")
});

//Auth
app.use('/api/auth', authRoutes);

//Get Profile
app.get('/users/profile', authMiddleware, getProfile);

app.listen(3000, ()=> {
    console.log("Server running...")
});
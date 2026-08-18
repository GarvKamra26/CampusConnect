require("dotenv").config()

const express = require('express');
const cors = require('cors');
const db = require("./config/db.js");

const app = express();

//Setup
app.use(cors());
app.use(express.json());

app.get('/', (req,res)=>{
    res.send("Welcome to campusConnect")
});

//Auth
const authRoutes = require("./routes/auth.js");
const authMiddleware = require("./middleware/authMiddleware.js");
app.use('/api/auth', authRoutes);

//Get Profile
const getProfile = require("./controllers/profileController.js");
app.get('/users/profile', authMiddleware, getProfile);

//Events
const eventRoutes = require("./routes/events.js")
app.use('/events', eventRoutes);

//Clubs
const clubRoutes = require("./routes/clubs.js")
app.use('/clubs', clubRoutes);

//Chatrooms
const chatroomRoutes = require("./routes/chatrooms.js")
app.use('/clubs', chatroomRoutes);


app.listen(3000, ()=> {
    console.log("Server running...")
});
require("dotenv").config()

const express = require('express');
const cors = require('cors');

const http = require("http");
const { Server } = require("socket.io");

const db = require("./config/db.js");

const app = express();

//Setup
app.use(cors());
app.use(express.json());

app.get('/', (req,res)=>{
    res.send("Welcome to campusConnect")
});

//Creating server
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173"
    }
});

server.listen(3000, ()=> {
    console.log("Server running...")
});

//Socket.io
app.use((req,res,next) => {
    req.io = io;

    next();
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
app.use('/chatrooms', chatroomRoutes);

//Messages
const messageRoutes = require("./routes/messages.js")
app.use('/chatrooms', messageRoutes);




io.on('connection', socket => {
    console.log("User connected", socket.id);

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    });

    socket.on("joinRoom", (roomId)=> {
        socket.join("room"+roomId);

        console.log(socket.id + " joined room " + roomId);
    });

    socket.on("leaveRoom", (roomId)=> {
        socket.leave("room"+roomId);

        console.log(socket.id + " left room " + roomId);
    });


});


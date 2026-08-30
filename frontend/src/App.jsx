import { useState } from 'react'
// import './App.css'
import socket from './socket.js'
import { useEffect } from 'react'
import axios from 'axios'


function App() {

    const [count, setCount] = useState(0)
    const [message, setMessage] = useState("");

    function joinRoom() {
        socket.emit("joinRoom",1);
    }

    async function sendmsg() {
        await axios.post('http://localhost:3000/chatrooms/1/messages', {message: message}, {headers: {Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTc4NzY2NjY3OCwiZXhwIjoxNzg4MjcxNDc4fQ.6XdtSpTALUQOqt1csN7650LLBsZKRefOmzqhHaasQsA'}})
    }

    useEffect(() => {

        socket.on("sendMessage", (Message) => {
            console.log(Message.username + ": " + Message.message);
        });

        return () => {
            socket.off("sendMessage");
        };

    }, []);


    return (
    <div>
    <h1>CampusConnect</h1>
    <input type="text" value={message} onChange={(e) => setMessage(e.target.value)}/>
    <button onClick = {joinRoom}>Join room 1</button>
    <button onClick = {sendmsg}>send message</button>
    </div>
    );

}

export default App

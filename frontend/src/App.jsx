import { useState } from 'react'
// import './App.css'
import socket from './socket.js'
import { useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Signup from "./pages/signup.jsx"
import Login from "./pages/login.jsx"


function App() {
    return (
    <BrowserRouter>
        <Routes>
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
        </Routes>
    </BrowserRouter>
    );

}

export default App

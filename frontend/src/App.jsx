import { BrowserRouter, Routes, Route } from "react-router-dom"

import Signup from "./pages/signup.jsx"
import Login from "./pages/login.jsx"
import Chatrooms from "./pages/chatrooms.jsx"
import Clubs from "./pages/clubs.jsx"
import Events from "./pages/events.jsx"


function App() {
    return (
    <BrowserRouter>
        <Routes>
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/chatrooms' element={<Chatrooms />} />
            <Route path='/clubs' element={<Clubs />} />
            <Route path='/events' element={<Events />} />
        </Routes>
    </BrowserRouter>
    );

}

export default App

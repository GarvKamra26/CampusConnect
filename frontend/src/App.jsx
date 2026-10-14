import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"

import Signup from "./pages/signup.jsx"
import Login from "./pages/login.jsx"
import Chatrooms from "./pages/chatrooms.jsx"
import Clubs from "./pages/clubs.jsx"
import Events from "./pages/events.jsx"
import Home from "./pages/home.jsx"
import Navbar from "./components/Navbar.jsx"
import Footer from "./components/Footer.jsx"

function ProtectedChatrooms() {
    const isLoggedIn = Boolean(localStorage.getItem("authToken"))
    const navigate = useNavigate()

    if (isLoggedIn) {
        return <Chatrooms />
    }

    return (
        <main className="login-required-overlay">
            <section
                className="login-required-dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby="login-required-title"
                aria-describedby="login-required-description"
            >
                <span className="login-required-icon" aria-hidden="true">!</span>
                <h1 id="login-required-title">Login required</h1>
                <p id="login-required-description">
                    You need to be logged in to access campus chatrooms.
                </p>
                <div className="login-required-actions">
                    <button
                        className="btn btn-primary"
                        type="button"
                        onClick={() => navigate("/login")}
                    >
                        Go to login page
                    </button>
                    <button
                        className="btn btn-ghost"
                        type="button"
                        onClick={() => navigate("/")}
                    >
                        Close
                    </button>
                </div>
            </section>
        </main>
    )
}

function App() {
    return (
    <BrowserRouter>
        <div className="app-shell">
            <Navbar />
            <div className="app-route-content">
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/chatrooms' element={<ProtectedChatrooms />} />
                    <Route path='/clubs' element={<Clubs />} />
                    <Route path='/events' element={<Events />} />
                </Routes>
            </div>
            <Footer />
        </div>
    </BrowserRouter>
    );

}

export default App

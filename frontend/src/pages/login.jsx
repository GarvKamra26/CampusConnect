import axios from "axios";
import { useState } from "react";

function Login() {

    const [email, setMail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                "http://localhost:3000/api/auth/login",
                {
                    email,
                    password
                }
            )

            console.log("Login successful", response.data);

        } catch (error) {
            console.error("Login unsuccesful: ", error);
        }
    }

    return(
        <div>
            <h1>Login</h1>

            <form onSubmit={handleLogin}>
                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e)=>{setMail(e.target.value)}}
                />

                <input 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}} 
                />

                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;
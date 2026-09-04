import { useState } from "react";
import axios from "axios";

function Signup() {

    const [name, setName] = useState("");
    const [email, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [branch, setBranch] = useState("");
    const [year, setYear] = useState("");

    const handleSignup = async () => {
        try {
            const response = await axios.post(
                "http://localhost:3000/api/auth/signup",
                {
                    name,
                    email,
                    password,
                    branch,
                    year
                }
            )

            console.log("Signup successful: ", response.data);
        } catch (error) {
            console.log("Signup failed: ", error);

        }
    }

    return (
        <div className="signup-container">
            <h1>Create your campus connect account</h1>

            <input 
                type="text"
                placeholder="Name" 
                value={name}
                onChange={(e)=>{setName(e.target.value)}}
            />

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
            <input 
                type="text"
                placeholder="Branch" 
                value={branch}
                onChange={(e)=>{setBranch(e.target.value)}}
            />
            <input 
                type="text"
                placeholder="Year" 
                value={year}
                onChange={(e)=>{setYear(e.target.value)}}
            />

            <button onClick={handleSignup}>Sign up</button>
        </div>
    );
}

export default Signup;
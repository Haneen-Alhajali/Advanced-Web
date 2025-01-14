import React, { useState } from "react";

import styles from "../assets/css/login-signup.module.css";
import { Link } from "react-router-dom";

const Signup = () => {
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ fullName, username, password }),
            });

            if (!response.ok) {
                const { message } = await response.json();
                alert(message);
                return;
            }

            const data = await response.json();
            alert("Signup successful! You can now log in.");
            localStorage.setItem("token", data.token); 
            window.location.href = "/login"; 
        } catch (error) {
            console.error("Error during signup:", error);
            alert("An error occurred. Please try again later.");
        }
    };

    return (
        <div className={styles.LoginSignBody}>
            <div className={styles.formContainer}>
                <h2>Sign Up</h2>
                <form onSubmit={handleSignup}>
                    <label>Full Name</label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Sign Up</button>
                    <p>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;

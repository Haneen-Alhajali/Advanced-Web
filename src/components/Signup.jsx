import React, { useState } from "react";
import styles from'../assets/css/login-signup.module.css';
import { Link } from "react-router-dom";

const Signup = () => {
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = (event) => {
        event.preventDefault();
        const users = JSON.parse(localStorage.getItem("users")) || [];

        if (users.some(user => user.username === username)) {
            alert("Username already exists!");
        } else {
            const newUser = { fullName, username, password, role: "user" };
            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));
            alert("Signup successful! You can now log in.");
            window.location.href = "/login";
        }
    };

    return (
        <div className={styles.LoginSignBody}>
        <div className={styles.formContainer}>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup}>
                <label>Full Name</label>
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                <label>Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Sign Up</button>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </form>
        </div>
        </div>
    );
};

export default Signup;

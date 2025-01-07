import React, { useState } from "react";
import styles from'../assets/css/login-signup.module.css';
import { Link } from "react-router-dom";
import users from "../data/userAccounts";
console.log("Initial users from localStorage:", users);


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (event) => {
        event.preventDefault();
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(u => u.username === username && u.password === password);

        if (!user) {
            alert("Invalid username or password!");
        } else {
            localStorage.setItem("currentUser", JSON.stringify(user));
            sessionStorage.setItem("currentUser", JSON.stringify(user));
            alert(`Welcome, ${user.fullName}`);
            window.location.href = "/dashboard";
        }
    };

    return (
        <div className={styles.LoginSignBody}>
            <div className={styles.formContainer}>
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <label>Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit">Login</button>
                    <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Login;



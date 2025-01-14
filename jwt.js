const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());
require("dotenv").config();
const SECRET_KEY =  "your-secret-key554ljh*&k)";


let users = [
    { username: "admin1", password: "admin123", fullName: "Admin One", role: "admin" },
    { username: "admin2", password: "admin456", fullName: "Admin Two", role: "admin" },
    { username: "admin3", password: "admin789", fullName: "Admin Three", role: "admin" },
];


app.post("/signup", (req, res) => {
    const { fullName, username, password } = req.body;


    if (!fullName || !username || !password) {
        return res.status(400).json({ message: "All fields are required!" });
    }


    const userExists = users.some(user => user.username === username);
    if (userExists) {
        return res.status(409).json({ message: "Username already exists!" });
    }


    const newUser = { fullName, username, password, role: "user" };
    users.push(newUser);


    const token = jwt.sign({ username: newUser.username, role: newUser.role }, SECRET_KEY, { expiresIn: "1h" });

    res.status(201).json({
        message: "Signup successful!",
        token,
        user: { username: newUser.username, fullName: newUser.fullName, role: newUser.role },
    });
});


app.post("/login", (req, res) => {
    const { username, password } = req.body;


    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ message: "Invalid username or password!" });
    }


    const token = jwt.sign({ username: user.username, role: user.role }, SECRET_KEY, { expiresIn: "1h" });

    res.json({
        message: "Login successful!",
        token,
        user: { username: user.username, fullName: user.fullName, role: user.role },
    });
});


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

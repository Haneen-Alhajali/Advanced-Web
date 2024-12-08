import users from "./data/userAccounts.js";
console.log("Initial users from localStorage:", users);

function handleSignup(event) {
    event.preventDefault();
    console.log("Signup triggered");

    const fullName = document.getElementById("signup-fullname").value.trim();
    const username = document.getElementById("signup-username").value.trim();
    const password = document.getElementById("signup-password").value.trim();

    if (!fullName || !username || !password) {
        alert("All fields are required!");
        return;
    }

    if (users.some(user => user.username === username)) {
        alert("Username already exists!");
        return;
    }

    // Add the new user to the array
    users.push({ username, password, fullName, role: "user" });

    // Save updated users list to localStorage
    localStorage.setItem("users", JSON.stringify(users));

    // Debugging log to check if localStorage is updated
    console.log("Updated users array after signup:", users);
    console.log("Users saved to localStorage:", localStorage.getItem("users"));

    alert("Signup successful! You can now login.");
    window.location.href = "login.html";
}

function handleLogin(event) {
    event.preventDefault();
    console.log("Login triggered");

    const username = document.getElementById("signin-username").value.trim();
    const password = document.getElementById("signin-password").value.trim();

    // Reload users from localStorage in case they were updated
    let users = JSON.parse(localStorage.getItem("users")) || [];  // Change const to let here

    // Debugging log to check the users array loaded from localStorage
    console.log("Users array loaded for login:", users);

    let user = users.find(u => u.username === username && u.password === password);  // Change const to let here

    if (!user) {
        alert("Invalid username or password!");
        return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user)); // user is the logged-in user object
    alert(`Welcome : ${user.fullName}`);
    window.location.href = "dashboard.html";

}


document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("form#signup-form")?.addEventListener("submit", handleSignup);
    document.querySelector("form#login-form")?.addEventListener("submit", handleLogin);
});
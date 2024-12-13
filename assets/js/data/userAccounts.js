// Load users from localStorage or use the default array if none exist
let users = JSON.parse(localStorage.getItem("users")) || [
    { username: "admin1", password: "admin123", fullName: "Admin One", role: "admin" },
    { username: "admin2", password: "admin456", fullName: "Admin Two", role: "admin" },
    { username: "admin3", password: "admin789", fullName: "Admin Three", role: "admin" },
];

// Export the array to make it accessible in other files
export default users;

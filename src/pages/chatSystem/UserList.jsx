import React, { useState } from "react";
import styles from "../../assets/css/sections/chat.module.css";

const UserList = ({ users, currentUser, setCurrentChat }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter users to show only admins
  const filteredUsers = users
    .filter((user) => user.role === "admin") // Only include admins
    .filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    ); // Apply search filter

  return (
    <>
      <input
        className={styles.searchBar}
        type="text"
        placeholder="Search for an admin..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className={`${styles.availableAdminsBox} ${styles.box}`}>
        <h2>Available Admins</h2>
        <div className={styles.adminList}>
          {filteredUsers.map((user) => (
            <div
              key={user.username}
              className={styles.admin}
              onClick={() => setCurrentChat(user.username)} // Select admin to chat with
            >
              <img
                src={"https://via.placeholder.com/40"}
                alt={user.username}
                className={styles.avatar}
              />
              <span>{user.username}</span>
            </div>
          ))}
          {filteredUsers.length === 0 && (
            <p className={styles.noResults}>No admins found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default UserList;

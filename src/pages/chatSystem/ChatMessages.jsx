import React from "react";
import styles from "../../assets/css/sections/chat.module.css";
import ChatInput from "./ChatInput";

const ChatMessages = ({ messages, currentUser, currentChat, onSendMessage}) => {
  return (
    <div
      className={`${styles.chatBox} ${styles.box}`}
      style={{ display: currentChat || currentUser.role === "admin" ? "block" : "none" }} // Toggle visibility
    >
      {currentChat && <h2 className={styles.chatHeader}>Chat with: {currentChat}</h2>}
      <div className={styles.chatMessages}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${styles.message} ${
              msg.sender === currentUser.username ? styles.yourMessage : styles.otherMessage
            }`}
          >
            <span className={styles.sender}>
              {msg.sender === currentUser.username ? "You" : msg.sender}: </span>
            <span className={styles.text}>{msg.text}</span>
          </div>
        ))}
      </div>
      <ChatInput onSendMessage={onSendMessage} />
    </div>
  );
};

export default ChatMessages;

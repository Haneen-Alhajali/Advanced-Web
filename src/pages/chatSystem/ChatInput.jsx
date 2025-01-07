import React, { useState } from "react";
import styles from "../../assets/css/sections/chat.module.css";

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    onSendMessage(message);
    setMessage("");
  };

  return (
    <div className={styles.messageInput}>
      <textarea
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className={styles.sendBut} onClick={handleSend}>Send</button>
    </div>
  );
};

export default ChatInput;

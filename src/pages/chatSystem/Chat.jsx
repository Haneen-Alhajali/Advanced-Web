import React, { useState, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import UserList from "./UserList";
import { connectToWebSocket } from "../../utils/websocket";
import styles from "../../assets/css/sections/chat.module.css";
import userAccounts from "../../data/userAccounts";

const Chat = () => {
  const [users, setUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState({});
  const [webSocket, setWebSocket] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    console.log("Initializing WebSocket...");
    const ws = connectToWebSocket(setMessages, currentUser);
    setWebSocket(ws);

    const fetchMessages = async () => {
      try {
        const response = await fetch("http://localhost:3001/messages");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const transformedUsers = userAccounts.map((user) => ({
          username: user.username,
          fullName: user.fullName,
          role: user.role,
        }));
        setUsers(transformedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchMessages();
    fetchUsers();

    return () => {
      console.log("Closing WebSocket...");
      ws.close();
    };
  }, []);

  const handleSendMessage = (message) => {
    if (!message.trim() || (!currentChat && currentUser.role !== "admin")) return;

    const msgPayload = {
      chatWith: currentUser.role === "admin" ? currentUser.username : currentChat,
      sender: currentUser.username,
      text: message,
    };

    webSocket.send(JSON.stringify(msgPayload));

    const updatedMessages = {
      ...messages,
      [msgPayload.chatWith]: [...(messages[msgPayload.chatWith] || []), msgPayload],
    };

    setMessages(updatedMessages);
    localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
  };

  return (
    <div className={styles.chatContainer}>
    {currentUser.role !== "admin" && (
      <> 
        <ChatHeader />
        <UserList users={users} currentUser={currentUser} setCurrentChat={setCurrentChat} />
      </>
    )}
      <ChatMessages
        messages={messages[currentUser.role === "admin" ? currentUser.username : currentChat] || []}
        currentUser={currentUser}
        currentChat={currentChat}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default Chat;

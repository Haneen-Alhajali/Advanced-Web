export const connectToWebSocket = (setMessages, currentUser) => {
  const ws = new WebSocket("ws://localhost:8080");

  ws.onopen = () => {
    console.log("WebSocket connection established.");
  };

  ws.onmessage = (event) => {
    try {
      const message = JSON.parse(event.data);
      console.log("Message received:", message);

        // Avoid adding the message twice if it was sent by the current user
        if (message.sender === currentUser.username) {
          return; // Ignore messages from the current user
        }
      setMessages((prevMessages) => {
        const updatedMessages = {
          ...prevMessages,
          [message.chatWith]: [
            ...(prevMessages[message.chatWith] || []),
            message,
          ],
        };
        localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
        return updatedMessages;
      });
    } catch (err) {
      console.error("Error parsing WebSocket message:", err);
    }
  };

  ws.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  ws.onclose = () => {
    console.warn("WebSocket connection closed.");
  };

  return ws;
};

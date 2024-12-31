import React, { useEffect } from 'react';

const Chat = () => {
  useEffect(() => {
    console.log('Chat loaded');
  }, []);

  return <div>Chat Content</div>;
};

export default Chat;

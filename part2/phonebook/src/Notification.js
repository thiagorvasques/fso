import React, { useEffect } from "react";

function Notification({ message, deleteMessage }) {
  console.log(message);

  useEffect(() => {
    const timer = setTimeout(() => deleteMessage(), 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [deleteMessage, message]);

  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
}

export default Notification;

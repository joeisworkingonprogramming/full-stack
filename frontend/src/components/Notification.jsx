import React from "react";
import "./notification.css";

const Notification = ({ message }) => {
  if (!message.content) {
    return null;
  }
  return <div className={message.type}>{message.content}</div>;
};

export default Notification;
